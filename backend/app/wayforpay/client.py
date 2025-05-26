import hmac
import uuid
import time
import hashlib
from typing import Dict, Any, List

from ..config import config


base_config = config.get("base")


def create_signature(data: List[str | float | int]) -> str:
    joined = ";".join(map(str, data))
    return hmac.new(
        bytes.fromhex(base_config.MERCHANT_SECRET),  # ⬅️ критична правка
        joined.encode("utf-8"),
        hashlib.md5,
    ).hexdigest()


def generate_order_reference() -> str:
    return str(uuid.uuid4())


def generate_payment_link(data: Dict[str, Any]) -> Dict[str, Any]:
    order_reference = data.get("order_reference") or generate_order_reference()
    order_date = int(time.time())

    amount = float(data["amount"])  # обов'язково float
    currency = str(data["currency"])
    client_phone = data.get("client_phone", "")
    client_email = data.get("client_email", "")

    payment_data = {
        "merchantAccount": base_config.MERCHANT_ACCOUNT,
        "merchantDomainName": base_config.WEBSITE_DOMAIN,
        "orderReference": order_reference,
        "orderDate": order_date,
        "amount": amount,
        "currency": currency,
        "productName": ["Оплата товарів MARSEA"],
        "productPrice": [float(amount)],
        "productCount": [1],
        "clientPhone": client_phone,
        "clientEmail": client_email,
        "returnUrl": base_config.RETURN_URL,
        "serviceUrl": base_config.CALLBACK_URL,
    }

    signature_data = [
        payment_data["merchantAccount"],
        payment_data["merchantDomainName"],
        payment_data["orderReference"],
        payment_data["orderDate"],
        payment_data["amount"],
        payment_data["currency"],
        payment_data["productName"][0],
        payment_data["productCount"][0],
        payment_data["productPrice"][0],
    ]

    payment_data["merchantSignature"] = create_signature(signature_data)

    print("🧾 SIGNATURE DATA:", signature_data)
    print("🧾 JOINED:", ";".join(map(str, signature_data)))
    print("🧾 GENERATED SIGNATURE:", payment_data["merchantSignature"])

    return {
        "url": base_config.PAYMENT_URL,
        "method": "POST",
        "params": payment_data,
        "other": [
            signature_data,
            ";".join(map(str, signature_data)),
            payment_data["merchantSignature"],
        ],
    }
