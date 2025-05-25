from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.tg_api_helper import TelegramAPIHelper
from app.wayforpay.client import (
    generate_payment_link,
    create_signature,
    generate_order_reference,
)
from app.wayforpay.schemas import PaymentRequest, WayForPayCallback


app = FastAPI(root_path="/api", docs_url="/docs", openapi_url="/openapi.json")

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

tg_api = TelegramAPIHelper()
pending_orders: dict[str, dict] = {}


@app.post("/pay")
async def create_payment(payload: PaymentRequest):
    order_ref = generate_order_reference()

    pending_orders[order_ref] = payload.model_dump()

    payment_data = generate_payment_link(
        {
            **payload.model_dump(),
            "order_reference": order_ref,
        }
    )

    return payment_data


@app.post("/callback")
async def wayforpay_callback(request: Request):
    data = await request.json()
    callback = WayForPayCallback(**data)

    expected_signature = create_signature(
        [
            callback.orderReference,
            callback.currency,
            callback.transactionStatus,
            callback.reason or "",
        ]
    )

    if callback.merchantSignature != expected_signature:
        return JSONResponse(
            status_code=400, content={"status": "error", "message": "Invalid signature"}
        )

    if callback.transactionStatus == "Approved":
        order_ref = callback.orderReference
        order = pending_orders.get(order_ref)

        if not order:
            return {"status": "error", "message": "Order not found"}

        # Формування повідомлення
        cart_lines = "\n".join(
            f"- {item['name']} x {item['quantity']} = {item['price'] * item['quantity']} грн"
            for item in order["cart"]
        )

        delivery = order["delivery"]
        delivery_info = (
            f"НП (відділення): {delivery['region']}, {delivery['city']}, {delivery['warehouse']}"
            if delivery["method"] == "np_branch"
            else f"НП (курʼєр): {delivery['region']}, {delivery['city']}, {delivery['address']}"
        )

        msg = (
            f"✅ НОВЕ ЗАМОВЛЕННЯ\n\n"
            f"🔹 Номер замовлення: {order_ref}\n"
            f"👤 Імʼя: {order['client_name']}\n"
            f"📞 Телефон: {order['client_phone']}\n"
            f"📧 Email: {order.get('client_email', '—')}\n"
            f"💬 Коментар: {order.get('comment', '—')}\n\n"
            f"🛒 Товари:\n{cart_lines}\n\n"
            f"🚚 Доставка: {delivery_info}\n"
            f"💰 Сума: {callback.amount} {callback.currency}"
        )

        tg_api.send_message(msg)
        pending_orders.pop(order_ref, None)

        return {"status": "success", "message": "Payment confirmed"}

    return {"status": "pending", "message": "Waiting for payment"}
