import os

from dotenv import load_dotenv


load_dotenv(".env")


class BaseConfig:
    """Base configuration."""

    BOT_TOKEN = os.environ.get("BOT_TOKEN")
    ORDERS_CHAT = os.environ.get("ORDERS_CHAT")


class DevelopmentConfig:
    """Development configuration."""


config = dict(base=BaseConfig, development=DevelopmentConfig)
