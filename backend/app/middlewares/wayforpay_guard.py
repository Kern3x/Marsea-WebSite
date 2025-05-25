from typing import Callable, Awaitable

from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.wayforpay.client import create_signature


class WayforpaySignatureGuard(BaseHTTPMiddleware):
    async def dispatch(
        self, request: Request, call_next: Callable[[Request], Awaitable]
    ):
        if request.url.path == "/api/callback" and request.method == "POST":
            try:
                body = await request.json()
                expected_signature = create_signature(
                    [
                        body.get("orderReference"),
                        body.get("currency"),
                        body.get("transactionStatus"),
                        body.get("reason", ""),
                    ]
                )
                if body.get("merchantSignature") != expected_signature:
                    return JSONResponse(
                        {"detail": "Forbidden: Invalid WayforPay Signature"},
                        status_code=403,
                    )
            except Exception:
                return JSONResponse(
                    {"detail": "Invalid request or malformed JSON"},
                    status_code=400,
                )

        return await call_next(request)
