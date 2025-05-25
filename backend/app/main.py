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
    if payload.order_reference and payload.order_reference in pending_orders:
        pending_orders.pop(payload.order_reference)

    order_ref = generate_order_reference()

    payload.order_reference = order_ref
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
            return JSONResponse(
                status_code=404,
                content={"status": "error", "message": "Order not found"},
            )

        order.setdefault("payment_method", "card")

        msg = tg_api.build_telegram_message(order_ref, order)
        tg_api.send_message(msg)

        pending_orders.pop(order_ref, None)

        return {"status": "success", "message": "Payment confirmed"}

    return {"status": "pending", "message": "Waiting for payment"}
