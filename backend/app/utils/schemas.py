from pydantic import BaseModel, Field

from typing import Optional, Literal, List
 

class CartItem(BaseModel):
    name: str
    price: float
    quantity: int


class DeliveryInfo(BaseModel):
    method: Literal["np_branch", "np_courier"]
    region: str
    city: str
    warehouse: Optional[str] = None
    address: Optional[str] = None


class PaymentRequest(BaseModel):
    order_reference: Optional[str] = Field(None)
    amount: float
    currency: str = "UAH"
    cart: List[CartItem]
    client_name: str
    client_phone: Optional[str] = None
    client_email: Optional[str] = None
    comment: Optional[str] = None
    delivery: DeliveryInfo
    payment_method: Literal["card", "cod"]