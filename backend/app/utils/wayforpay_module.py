import hmac
import hashlib
from decimal import Decimal, ROUND_HALF_UP

from app.config import config


base_config = config.get("base")


def create_signature(data: list):
    joined = ";".join(str(i) for i in data)
    return [
        joined,
        hmac.new(
            base_config.MERCHANT_SECRET.encode(), joined.encode(), hashlib.md5
        ).hexdigest(),
    ]


def format_decimal(value: float) -> str:
    return str(Decimal(str(value)).quantize(Decimal("0.00"), rounding=ROUND_HALF_UP))
