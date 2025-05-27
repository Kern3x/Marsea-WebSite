import os

from dotenv import load_dotenv


DIR_NAME = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(DIR_NAME)


class BaseConfig:
    """Base configuration."""

    BOT_TOKEN = os.environ.get("BOT_TOKEN")
    ORDERS_CHAT = os.environ.get("ORDERS_CHAT")

    LIQPAY_PUBLIC_KEY = os.environ.get('LIQPAY_PUBLIC_KEY')
    LIQPAY_PRIVATE_KEY = os.environ.get('LIQPAY_PRIVATE_KEY')

    LIQPAY_RETURN_URL = os.environ.get('LIQPAY_RETURN_URL')
    LIQPAY_CALLBACK_URL = os.environ.get('LIQPAY_CALLBACK_URL')
    LIQPAY_CHECKOUT_URL = os.environ.get('LIQPAY_CHECKOUT_URL')


class DevelopmentConfig:
    """Development configuration."""


config = dict(base=BaseConfig, development=DevelopmentConfig)
