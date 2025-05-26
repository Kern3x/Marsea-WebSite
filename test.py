import hmac
import hashlib
import time
import uuid
import requests


# MERCHANT_SECRET = "7783d4166c9fce281982f10cc5ab87167a23e648"
# MERCHANT_ACCOUNT = "marsea_shop_com"
# DOMAIN_NAME = "marsea-shop.com"
# RETURN_URL = "https://marsea-shop.com/success"
# SERVICE_URL = "https://marsea-shop.com/api/callback"

# order_reference = str(uuid.uuid4())
# order_date = int(time.time())
# amount = 700
# currency = "UAH"

# product_name = ["Оплата товарів MARSEA"]
# product_price = [amount]
# product_count = [1]

# # ⬇️ Формуємо дані для підпису
# signature_data = [
#     MERCHANT_ACCOUNT,
#     DOMAIN_NAME,
#     order_reference,
#     order_date,
#     amount,
#     currency,
#     product_name[0],
#     product_count[0],
#     product_price[0],
# ]

# # ⬇️ Створення підпису
# signature_string = ";".join(map(str, signature_data))
# signature = hmac.new(
#     bytes.fromhex(MERCHANT_SECRET), signature_string.encode("utf-8"), hashlib.md5
# ).hexdigest()

# # ⬇️ Формування форми
payload = {
    "merchantAccount": MERCHANT_ACCOUNT,
    "merchantDomainName": DOMAIN_NAME,
    "orderReference": order_reference,
    "orderDate": order_date,
    "amount": amount,
    "currency": currency,
    "productName": product_name,
    "productPrice": product_price,
    "productCount": product_count,
    "clientEmail": "test@example.com",
    "clientPhone": "+380991234567",
    "returnUrl": RETURN_URL,
    "serviceUrl": SERVICE_URL,
    "merchantSignature": signature,
}

# # ⬇️ Відправка форми POST-запитом (емуляція браузера)
# res = requests.post("https://secure.wayforpay.com/pay", data=payload)

# print("Status code:", res.status_code)
# print("Final URL:", res.url)
# print("Text response (HTML):")
# print(res.text)  # обмежено, бо там буде HTML