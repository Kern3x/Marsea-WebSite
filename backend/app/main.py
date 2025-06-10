import uuid
from datetime import datetime

from fastapi.responses import JSONResponse
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

from app.config import config
from app.utils.tg_api_helper import TelegramAPIHelper
from app.utils.schemas import PaymentRequest, WayForPayCallback
from app.utils.storage import save_order, get_order, delete_order
from app.utils.wayforpay_module import create_signature, format_decimal


app = FastAPI(root_path="/api", docs_url="/docs", openapi_url="/openapi.json")
tg_api = TelegramAPIHelper()

base_config = config.get("base")

origins = [
    "http://localhost:3000",
    "https://marsea-shop.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/pay")
async def create_payment(data: PaymentRequest, background_tasks: BackgroundTasks):
    if data.payment_method == "cod":
        order_reference = data.order_reference or str(uuid.uuid4())
        msg = tg_api.build_telegram_message(order_reference, data)
        background_tasks.add_task(tg_api.send_message, msg)
        return {"status": "cod", "order_reference": order_reference}

    order_reference = data.order_reference or str(uuid.uuid4())
    order_date = int(datetime.now().timestamp())

    product_names = [item.name for item in data.cart]
    product_prices = [item.price for item in data.cart]
    product_counts = [item.quantity for item in data.cart]

    # Форматуємо всі числа до str із .00
    amount_str = format_decimal(data.amount)
    product_prices_str = [format_decimal(p) for p in product_prices]

    # Генерація сигнатури
    sign_data = [
        base_config.MERCHANT_ACCOUNT,
        base_config.WEBSITE_DOMAIN,
        order_reference,
        order_date,
        amount_str,
        data.currency,
        *product_names,
        *product_counts,
        *product_prices_str,
    ]
    joined, signature = create_signature(sign_data)

    save_order(order_reference, data.dict())

    return JSONResponse(
        {
            "url": "https://secure.wayforpay.com/pay",
            "method": "POST",
            "params": {
                "merchantAccount": base_config.MERCHANT_ACCOUNT,
                "merchantDomainName": base_config.WEBSITE_DOMAIN,
                "orderReference": order_reference,
                "orderDate": order_date,
                "amount": amount_str,
                "currency": data.currency,
                "productName": product_names,
                "productPrice": product_prices_str,
                "productCount": product_counts,
                "clientName": data.client_name,
                "clientEmail": data.client_email,
                "clientPhone": data.client_phone,
                "returnUrl": base_config.RETURN_URL,
                "serviceUrl": base_config.CALLBACK_URL,
                "merchantSignature": signature,
            },
            "joined": joined,
        }
    )


import logging
logger = logging.getLogger(__name__)

@app.post("/pay-callback")
async def payment_callback(callback: WayForPayCallback, background_tasks: BackgroundTasks):
    logger.info(f"📥 Callback received: {callback.orderReference} status={callback.transactionStatus}")

    if callback.transactionStatus == "Approved":
        order_data = get_order(callback.orderReference)

        if order_data:
            logger.info("✅ Found order data.")
            delete_order(callback.orderReference)
            payment_request = PaymentRequest(**order_data)
            msg = tg_api.build_telegram_message(callback.orderReference, payment_request)
        else:
            logger.warning("⚠️ Order data not found, fallback to raw message.")
            msg = (
                f"✅ Оплата без збережених деталей.\n"
                f"Сума: {callback.amount} {callback.currency}\n"
                f"Замовлення: {callback.orderReference}"
            )

        logger.info(f"📤 Sending message to Telegram: {msg}")
        await tg_api.send_message(msg)

        return {"orderReference": callback.orderReference, "status": "accept"}

    logger.info("❌ Payment not approved.")
    return {"orderReference": callback.orderReference, "status": "reject"}

 