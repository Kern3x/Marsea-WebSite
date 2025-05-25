from pydantic import BaseModel

from typing import Optional, Literal, List


class CartItem(BaseModel):
    name: str
    price: float
    quantity: int


class DeliveryInfo(BaseModel):
    method: Literal["np_branch", "np_courier"]
    region: str
    city: str
    warehouse: Optional[str] = None  # для np_branch
    address: Optional[str] = None  # для np_courier


class PaymentRequest(BaseModel):
    amount: float
    currency: str
    cart: List[CartItem]

    client_name: str
    client_phone: Optional[str] = None
    client_email: Optional[str] = None
    comment: Optional[str] = None
    delivery: DeliveryInfo

    payment_method: Literal["card", "cod"]  # ДОДАНО


class WayForPayCallback(BaseModel):
    orderReference: str
    amount: float
    currency: str
    transactionStatus: str
    reason: Optional[str] = ""
    merchantSignature: str
