import requests

from config import config


base_config = config.get("base")


class TelegramAPIHelper:
    def __init__(self):
        self.telegram_api_url = "https://api.telegram.org/bot"

        self.bot_token = base_config.BOT_TOKEN
        self.chat_id = base_config.ORDERS_CHAT

    def send_message(self, text: str):
        try:
            r = requests.post(
                self.telegram_api_url + self.bot_token + "/sendMessage",
                json={"chat_id": self.chat_id, "text": text},
            )

            return r

        except Exception:
            return 400
