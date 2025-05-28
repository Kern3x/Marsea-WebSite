import json
import redis

from app.config import config


base_config = config.get("base")
r = redis.Redis(host=base_config.REDIS_HOST, port=6379, decode_responses=True)


def save_order(reference: str, data: dict):
    r.setex(f"order:{reference}", 3600, json.dumps(data))


def get_order(reference: str):
    raw = r.get(f"order:{reference}")
    return json.loads(raw) if raw else None


def delete_order(reference: str):
    r.delete(f"order:{reference}")
