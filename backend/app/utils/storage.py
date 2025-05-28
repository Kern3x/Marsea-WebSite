import json
import redis

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

def save_order(reference: str, data: dict):
    r.setex(f"order:{reference}", 3600, json.dumps(data))  # 1 година

def get_order(reference: str):
    raw = r.get(f"order:{reference}")
    return json.loads(raw) if raw else None

def delete_order(reference: str):
    r.delete(f"order:{reference}")