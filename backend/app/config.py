import os

from dotenv import load_dotenv


DIR_NAME = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(DIR_NAME)


class BaseConfig:
    """Base configuration."""

    BOT_TOKEN = os.environ.get("BOT_TOKEN")
    ORDERS_CHAT = os.environ.get("ORDERS_CHAT")

    MERCHANT_ACCOUNT = os.environ.get("MERCHANT_ACCOUNT")
    MERCHANT_SECRET = os.environ.get("MERCHANT_SECRET")

    WEBSITE_DOMAIN = os.environ.get("WEBSITE_DOMAIN")
    PAYMENT_URL = os.environ.get("PAYMENT_URL")
    RETURN_URL = os.environ.get("RETURN_URL")
    CALLBACK_URL = os.environ.get("CALLBACK_URL")

    REDIS_HOST = os.environ.get("REDIS_HOST")


class DevelopmentConfig:
    """Development configuration."""


config = dict(base=BaseConfig, development=DevelopmentConfig)
