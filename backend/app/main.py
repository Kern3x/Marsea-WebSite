import uuid
from datetime import datetime

from fastapi.responses import JSONResponse
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

from app.config import config
from app.utils.tg_api_helper import TelegramAPIHelper
from app.utils.wayforpay_module import create_signature
from app.utils.schemas import PaymentRequest, WayForPayCallback


app = FastAPI(root_path="/api", docs_url="/docs", openapi_url="/openapi.json")
tg_api = TelegramAPIHelper()

base_config = config.get("base")
pending_orders: dict[str, dict] = {}

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

    sign_data = [
        base_config.MERCHANT_ACCOUNT,
        "auto",
        order_reference,
        order_date,
        data.amount,
        data.currency,
        *sum(
            [
                [n, q, p]
                for n, q, p in zip(product_names, product_counts, product_prices)
            ],
            [],
        ),
    ]
    signature = create_signature(sign_data)

    return JSONResponse(
        {
            "url": "https://secure.wayforpay.com/pay",
            "method": "POST",
            "params": {
                "merchantAccount": base_config.MERCHANT_ACCOUNT,
                "merchantDomainName": base_config.WEBSITE_DOMAIN,
                "orderReference": order_reference,
                "orderDate": order_date,
                "amount": data.amount,
                "currency": data.currency,
                "productName": product_names,
                "productPrice": product_prices,
                "productCount": product_counts,
                "clientName": data.client_name,
                "clientEmail": data.client_email,
                "clientPhone": data.client_phone,
                "returnUrl": base_config.RETURN_URL,
                "serviceUrl": base_config.SERVICE_URL,
                "merchantSignature": signature,
            },
        }
    )


@app.post("/pay-callback")
async def payment_callback(
    callback: WayForPayCallback, background_tasks: BackgroundTasks
):
    if callback.transactionStatus == "Approved":
        background_tasks.add_task(
            tg_api.send_message,
            f"✅ Нова оплата!\nСума: {callback.amount} {callback.currency}\nЗамовлення: {callback.orderReference}",
        )
        return {"orderReference": callback.orderReference, "status": "accept"}

    return {"orderReference": callback.orderReference, "status": "reject"}
