import hmac
import hashlib

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
