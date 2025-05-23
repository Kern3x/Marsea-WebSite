import hmac
import uuid
import time
import hashlib
from typing import Dict, Any

from backend.app.config import config


base_config = config.get("base")


def generate_order_reference():
    return str(uuid.uuid4())


def create_signature(data: list) -> str:
    """
    Створення підпису для Wayforpay
    """
    joined = ";".join(str(i) for i in data)
    sign = hmac.new(
        base_config.MERCHANT_SECRET.encode("utf-8"), joined.encode("utf-8"), hashlib.md5
    ).hexdigest()
    return sign


def generate_payment_link(data: Dict[str, Any]) -> Dict:
    """
    Генерує форму оплати Wayforpay
    """
    order_reference = generate_order_reference()

    payment_data = {
        "merchantAccount": base_config.MERCHANT_ACCOUNT,
        "merchantDomainName": base_config.WEBSITE_DOMAIN,
        "orderReference": order_reference,
        "orderDate": int(time.time()),
        "amount": data["amount"],
        "currency": data["currency"],
        "productName": [data["product_name"]],
        "productPrice": [data["amount"]],
        "productCount": [1],
        "clientPhone": data["client_phone"],
        "clientEmail": data.get("client_email", ""),
        "returnUrl": base_config.RETURN_URL,
        "serviceUrl": base_config.CALLBACK_URL,
    }

    signature_data = [
        payment_data["merchantAccount"],
        payment_data["merchantDomainName"],
        payment_data["orderReference"],
        str(payment_data["orderDate"]),
        str(payment_data["amount"]),
        payment_data["currency"],
        payment_data["productName"][0],
        str(payment_data["productPrice"][0]),
        str(payment_data["productCount"][0]),
    ]

    payment_data["merchantSignature"] = create_signature(signature_data)
    return {"url": base_config.PAYMENT_URL, "method": "POST", "params": payment_data}
