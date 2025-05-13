from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.tg_api_helper import TelegramAPIHelper
from app.wayforpay.schemas import PaymentRequest, WayForPayCallback
from app.wayforpay.client import generate_payment_link, create_signature


app = FastAPI()
tg_api = TelegramAPIHelper()


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

    # Перевірка підпису
    expected_signature = create_signature(
        [
            data["orderReference"],
            data["amount"],
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
        tg_api.send_message("Payment confirmed")

        return {"status": "success", "message": "Payment confirmed"}

    return {"status": "pending", "message": "Waiting for payment"}
