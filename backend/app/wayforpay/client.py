import hashlib
import uuid
import time
from typing import Dict, Any, List

from ..config import config


base_config = config.get("base")


# ❗️❗️❗️ ИЗМЕНЕНА ФУНКЦИЯ create_signature ❗️❗️❗️
def create_signature(data_for_signing: List[str | float | int], secret_key: str) -> str:
    # Преобразуем все элементы в строки и объединяем
    joined_data = ";".join(map(str, data_for_signing))

    # Добавляем секретный ключ в конец строки для хеширования
    # WayForPay использует md5(data;secret_key)
    string_to_hash = joined_data + ";" + secret_key

    # Применяем MD5 хеширование
    return hashlib.md5(string_to_hash.encode("utf-8")).hexdigest()


def generate_order_reference() -> str:
    return str(uuid.uuid4())


def generate_payment_link(data: Dict[str, Any]) -> Dict[str, Any]:
    order_reference = data.get("order_reference") or generate_order_reference()
    order_date = int(time.time())

    amount = float(data["amount"])  # обязательно float
    currency = str(data["currency"])
    client_phone = data.get("client_phone", "")
    client_email = data.get("client_email", "")

    payment_data = {
        "merchantAccount": base_config.MERCHANT_ACCOUNT,
        "merchantDomainName": base_config.WEBSITE_DOMAIN,
        "orderReference": order_reference,
        "orderDate": order_date,
        "amount": amount,
        "currency": currency,
        # Убедитесь, что productName, productPrice, productCount всегда массивы,
        # даже если с одним элементом, как вы это делаете
        "productName": ["Оплата товарів MARSEA"],
        "productPrice": [float(amount)],
        "productCount": [1],
        "clientPhone": client_phone,
        "clientEmail": client_email,
        "returnUrl": base_config.RETURN_URL,
        "serviceUrl": base_config.CALLBACK_URL,
    }

    # ❗️❗️❗️ ИЗМЕНЕН ПОРЯДОК И СОСТАВ signature_data ❗️❗️❗️
    # ПОРЯДОК КЛЮЧЕВОЙ! WayForPay ожидает определенный порядок полей.
    # Если какие-то поля отсутствуют (например, clientPhone, clientEmail),
    # то для них должны быть пустые строки в списке.
    # Обратитесь к актуальной документации WayForPay по формированию подписи
    # для точного списка и порядка полей. Обычно это:
    # merchantAccount, merchantDomainName, orderReference, orderDate, amount, currency,
    # productName[], productCount[], productPrice[], clientPhone, clientEmail, returnUrl, serviceUrl

    signature_data_values = [
        payment_data["merchantAccount"],
        payment_data["merchantDomainName"],
        payment_data["orderReference"],
        payment_data["orderDate"],
        payment_data["amount"],
        payment_data["currency"],
        # Обработка массивов: объединяем элементы через ';'
        ";".join(map(str, payment_data["productName"])),
        ";".join(map(str, payment_data["productCount"])),
        ";".join(map(str, payment_data["productPrice"])),
        # Добавление опциональных полей. Если они присутствуют в payment_data,
        # они должны быть в signature_data_values.
        # Если значение может быть None, убедитесь, что оно преобразуется в пустую строку.
        payment_data.get("clientPhone", ""),
        payment_data.get("clientEmail", ""),
        payment_data.get("returnUrl", ""),
        payment_data.get("serviceUrl", ""),
    ]

    payment_data["merchantSignature"] = create_signature(
        signature_data_values, base_config.MERCHANT_SECRET  # Передаем секретный ключ
    )

    return {"url": base_config.PAYMENT_URL, "method": "POST", "params": payment_data}
