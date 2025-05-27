import json
import base64
import hashlib

from app.config import config


base_config = config.get("base")


def generate_liqpay_signature(data_b64: str, private_key: str) -> str:
    """
    LiqPay: base64( sha1( private + data_b64 + private ) )
    """
    sign_str = f"{private_key}{data_b64}{private_key}"
    sha1 = hashlib.sha1(sign_str.encode("utf-8")).digest()
    return base64.b64encode(sha1).decode()


def generate_liqpay_signature(data_b64: str, private_key: str) -> str:
    raw = f"{private_key}{data_b64}{private_key}".encode("utf-8")
    return base64.b64encode(hashlib.sha1(raw).digest()).decode()


def create_liqpay_payment(data: dict, order_id: str) -> dict:
    payload = {
        "public_key": base_config.LIQPAY_PUBLIC_KEY,
        "version": 3,
        "action": "pay",
        "amount": data["amount"],
        "currency": data["currency"],
        "description": "Оплата товарів MARSEA",
        "order_id": order_id,
        "result_url": base_config.LIQPAY_RETURN_URL,
        "server_url": base_config.LIQPAY_CALLBACK_URL,
        "language": "uk",
    }

    json_data = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    data_b64 = base64.b64encode(json_data.encode()).decode()
    signature = generate_liqpay_signature(data_b64, base_config.LIQPAY_PRIVATE_KEY)

    return {
        "action_url": base_config.LIQPAY_CHECKOUT_URL,
        "params": {
            "data": data_b64,
            "signature": signature,
        },
    }


def verify_liqpay_signature(data_b64: str, signature: str, private_key: str) -> bool:
    expected = generate_liqpay_signature(data_b64, private_key)
    return signature == expected
