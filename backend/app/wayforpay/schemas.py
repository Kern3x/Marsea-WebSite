from typing import Optional

from pydantic import BaseModel


class PaymentRequest(BaseModel):
    order_reference: str
    amount: float
    currency: str
    product_name: str
    client_phone: Optional[str] = None


class WayForPayCallback(BaseModel):
    orderReference: str
    amount: float
    currency: str
    transactionStatus: str
    reason: Optional[str] = ""
    merchantSignature: str
