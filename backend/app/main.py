import json
import base64
from uuid import uuid4

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.config import config
from app.utils.schemas import PaymentRequest
from app.utils.tg_api_helper import TelegramAPIHelper
from app.utils.liqpay_module import create_liqpay_payment, verify_liqpay_signature


app = FastAPI()
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
async def pay_liqpay(request: PaymentRequest):
    if request.order_reference and request.order_reference in pending_orders:
        pending_orders.pop(request.order_reference)

    order_id = str(uuid4())
    request.order_reference = order_id
    pending_orders[order_id] = request.model_dump()

    try:
        liqpay_data = create_liqpay_payment(request.model_dump(), order_id)
        return JSONResponse(content=liqpay_data)
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to create LiqPay payment")


@app.post("/callback")
async def liqpay_callback(request: Request):
    form_data = await request.form()
    data = form_data.get("data")
    signature = form_data.get("signature")

    if not data or not signature:
        raise HTTPException(status_code=400, detail="Missing data or signature")

    if not verify_liqpay_signature(data, signature, base_config.LIQPAY_PRIVATE_KEY):
        raise HTTPException(status_code=403, detail="Invalid LiqPay signature")

    try:
        decoded_data_json = base64.b64decode(data).decode("utf-8")
        decoded_data = json.loads(decoded_data_json)
        order_ref = decoded_data.get("order_id")

        if decoded_data.get("status") != "success":
            return JSONResponse(
                content={"status": "ignored", "detail": "Payment not successful"}
            )

        if not order_ref or order_ref not in pending_orders:
            raise HTTPException(status_code=404, detail="Order not found")

        order = pending_orders.pop(order_ref)
        order["payment_method"] = "card"

        message = tg_api.build_telegram_message(order_ref, order)
        tg_api.send_message(message)

        return {"status": "success", "detail": "Payment processed"}

    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON data in callback")
    except Exception:
        raise HTTPException(status_code=500, detail="Error processing callback")
