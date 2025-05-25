from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.tg_api_helper import TelegramAPIHelper
from app.wayforpay.schemas import PaymentRequest, WayForPayCallback
from app.wayforpay.client import generate_payment_link, create_signature
import os

app = FastAPI(root_path="/api", docs_url="/docs", openapi_url="/openapi.json")
tg_api = TelegramAPIHelper()

origins = [
    "http://localhost:3000",  # якщо фронт запущений локально
    "https://marsea-shop.com",  # якщо фронт розгорнутий на цьому домені
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # або ["*"] для дозволу всім (небажано в проді)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/pay")
def create_payment(payload: PaymentRequest):
    """
    Генерація платіжного посилання
    """
    link_data = generate_payment_link(payload.dict())
    return link_data


@app.post("/callback")
async def wayforpay_callback(request: Request):
    """
    Обробка callback від Wayforpay
    """
    data = await request.json()
    callback = WayForPayCallback(**data)

    expected_signature = create_signature(
        [
            data["orderReference"],
            data["currency"],
            data["transactionStatus"],
            data["reason"] or "",
        ]
    )

    if callback.merchantSignature != expected_signature:
        return JSONResponse(
            content={"status": "error", "message": "Invalid signature"}, status_code=400
        )

    if callback.transactionStatus == "Approved":
        order_reference = callback.orderReference

        tg_api.send_message(f"Payment confirmed\n\nID: {order_reference}")

        return {"status": "success", "message": "Payment confirmed"}

    return {"status": "pending", "message": "Waiting for payment"}


@app.get("/cash_order")
async def cash_order(request: Request):
    return {"status": "ok", "env": dict(os.environ)}  
