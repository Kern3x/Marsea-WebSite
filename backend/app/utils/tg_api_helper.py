import httpx

from app.config import config
from .schemas import PaymentRequest


base_config = config.get("base")


class TelegramAPIHelper:
    def __init__(self):
        self.telegram_api_url = "https://api.telegram.org/bot"
        self.bot_token = base_config.BOT_TOKEN
        self.chat_id = base_config.ORDERS_CHAT

    def send_message(self, text: str):
        try:
            r = httpx.post(
                f"{self.telegram_api_url}{self.bot_token}/sendMessage",
                json={"chat_id": self.chat_id, "text": text},
            )
            return r
        except Exception:
            return 400

    def build_telegram_message(self, order_ref: str, data: PaymentRequest) -> str:
        cart_lines = "\n".join(
            f"- {item.name} x {item.quantity} = {item.price * item.quantity:.2f} грн"
            for item in data.cart
        )

        delivery = data.delivery
        if delivery.method == "np_branch":
            delivery_info = f"НП (відділення): {delivery.region}, {delivery.city}, {delivery.warehouse}"
        else:
            delivery_info = (
                f"НП (курʼєр): {delivery.region}, {delivery.city}, {delivery.address}"
            )

        msg = (
            f"📦 НОВЕ ЗАМОВЛЕННЯ ({'💳 Онлайн' if data.payment_method == 'card' else '💵 Накладений платіж'})\n\n"
            f"🔹 Номер замовлення: {order_ref}\n"
            f"👤 Імʼя: {data.client_name}\n"
            f"📞 Телефон: {data.client_phone}\n"
            f"📧 Email: {data.client_email or '—'}\n"
            f"💬 Коментар: {data.comment or '—'}\n\n"
            f"🛒 Товари:\n{cart_lines}\n\n"
            f"🚚 Доставка: {delivery_info}\n"
            f"💰 Сума: {data.amount:.2f} {data.currency}"
        )

        return msg
