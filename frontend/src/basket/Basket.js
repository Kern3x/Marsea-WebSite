import React, {use, useContext, useEffect, useState} from "react";
import "./basket.css";
import bar from "../components/images/bar1.png";
import kr from "../components/images/bitcoin-icons_plus-outline.svg";
import minus from "../components/images/Minus.svg";
import plus from "../components/images/Plus.svg";
import BasketElement from "./BasketElement";
import ProductCard from "../components/ProductCard";
import newMail from "./newMail.svg";
import Header from "../components/Header";
import Select from "react-select";
import npData from "../np.json";
import CartContext from "../CartContext";
import axios from "axios";
import Footer from "../components/Footer";
import OrderSumMin from "../components/OrderSumMin";

const customStyles = {
    control: (base) => ({
        ...base,
        borderRadius: "90px",
        border: "1px solid black",
        padding: "6px 10px",
        fontSize: "16px",
        marginBottom: "20px",
    }),
    menu: (base) => ({
        ...base,
        width: '100%',
        minWidth: '100%',
    }),
};

const Basket = ({bars}) => {
    const {products, setProducts} = useContext(CartContext);

    const [deliveryMethod, setDeliveryMethod] = useState("np_branch");
    const [paymentMethod, setPaymentMethod] = useState("cod");
    console.log(paymentMethod)

    // SelectCity state
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const regionOptions = Array.from(
        new Set(npData.map((entry) => entry.region))
    ).map((region) => ({
        value: region,
        label: region,
    }));

    const cityOptions = selectedRegion
        ? Array.from(
            new Set(
                npData
                    .filter((entry) => entry.region === selectedRegion.value)
                    .map((entry) => entry.city)
            )
        ).map((city) => ({
            value: city,
            label: city,
        }))
        : [];

    const warehouseOptions = selectedCity
        ? npData
            .filter((entry) => entry.city === selectedCity.value)
            .map((entry) => ({
                value: entry.warehouse_number,
                label: entry.warehouse,
            }))
        : [];

    const [products1, setProducts1] = useState(0);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [comment, setComment] = useState("")
    const [street, setStreet] = useState("")
    const [house, setHouse] = useState("")
    const [flat, setFlat] = useState("")


    const handleLiqPayPayment = async () => {
        const orderDetails = {
            amount: products1, // Сумма для теста. В реальном приложении - из корзины.
            currency: 'UAH',
            description: 'Оплата товаров MARSEA',
        };

        try {
            console.log('Sending request to backend with payload:', orderDetails); // Лог того, что отправляем на бэкенд
            const response = await fetch('http://localhost:3001/api/pay-liqpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDetails),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Попробуем получить текст ошибки
                console.error(`HTTP error! Status: ${response.status}. Response text: ${errorText}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const liqpayResponse = await response.json();
            console.log('LiqPay Response from Backend:', liqpayResponse); // <-- КЛЮЧЕВОЙ ЛОГ: ЧТО ВЕРНУЛ БЭКЕНД

            // Убедитесь, что liqpayResponse содержит action_url и params
            const { action_url, params } = liqpayResponse;

            if (!action_url || !params || !params.data || !params.signature) {
                console.error('Missing LiqPay parameters in response from backend:', liqpayResponse);
                alert('Не удалось получить полные данные для оплаты LiqPay. Проверьте консоль для деталей.');
                return;
            }

            // Создаем динамическую форму и отправляем ее
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = action_url; // Это должно быть 'https://www.liqpay.ua/api/3/checkout'
            form.target = '_self';

            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = params[key];
                    form.appendChild(input);
                }
            }

            document.body.appendChild(form);
            console.log('Submitting form to LiqPay:', form);
            form.submit();
            // document.body.removeChild(form); // Обычно удаляется после submit, но если возникнут проблемы, можно закомментировать для отладки
        } catch (error) {
            console.error('Error during LiqPay payment initiation:', error);
            alert('Не удалось начать оплату LiqPay. Пожалуйста, попробуйте позже. Детали в консоли.');
        }
    };



    const order_process = () => {
        const qwe = products.map((e) => ({
            name: e.namee,
            price: e.price,
            quantity: e.quantity
        }));

        const payload = {
            //order_reference: localStorage.getItem("order_id"),
            amount: products1,
           // currency: "UAH",
            cart: qwe,
            client_name: name,
            client_phone: phone,
            client_email: email,
            comment: comment,
            delivery: {
                method: deliveryMethod,
                region: selectedRegion?.value,
                city: selectedCity?.value,
                ...(deliveryMethod === "np_branch"
                    ? { warehouse: selectedWarehouse?.value }
                    : { address: `вул. ${street}, буд. ${house}, кв. ${flat}` })
    },
        payment_method: paymentMethod
    };

        axios.post("https://marsea-shop.com/api/pay", payload)
            .then((response) => {
              //  axios.post("https://secure.wayforpay.com/pay",response.data)

                const data = response.data;
                console.log("data :", data);

                if (paymentMethod === "card" && data?.url && data?.params) {
                    handleLiqPayPayment()
                } else {
                    console.log("Оплата готівкою, данные успешно отправлены", data);
                }
            })
            .catch((error) => {
                console.error("Ошибка при оформлении заказа", error);
                localStorage.setItem("order_id", null);
            });
    };

    useEffect(() => {
        setProducts1(
            products.reduce(
                (accumulator, currentValue) =>
                    accumulator + currentValue.quantity * currentValue.price,
                0
            )
        );
        localStorage.setItem("cart", JSON.stringify(products));
    }, [products]);

    return (
        <>
            {products1 < 200 ? <OrderSumMin t = {true}/> : <>

            <Header products={products} setProducts={setProducts}/>
            <div className="basket_page">
                <div className="basket_details">
                    <div className="products_details">
                        <div className="details_text">деталі замовлення</div>
                        <div className="details_quantity">
                            {products.map((e, i) => (
                                <BasketElement
                                    key={i}
                                    image={e.image}
                                    namee={e.namee}
                                    price={e.price}
                                    setProducts={setProducts}
                                    products={products}
                                    quantity={e.quantity}
                                />
                            ))}
                            <div className="summ_products">
                                {products.length < 1 ? "ТУТ ПОКИ НІЧОГО НЕМАЄ" : <>
                                    <div>ВСЬОГО:</div>
                                    <div className="summ">{products1}₴</div>
                                </>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="order_form">
                        <div className="order_text">данні для замовлення</div>
                        <div className="order_details_main">
                            <div className="name_input">ім’я</div>
                            <input type="text" className="form_input" placeholder="Ваше ім’я" value={name} onChange={(e) => {
                                setName(e.target.value)
                            }}/>
                            <div className="name_input">Телефон</div>
                            <input
                                type="text"
                                className="form_input"
                                placeholder="+380 (93) 993 93 93"
                                value={phone} onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                            />
                            <div className="name_input">пошта</div>
                            <input
                                type="text"
                                className="form_input"
                                placeholder="example@gmail.com"
                                value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            />
                            <div className="name_input">КОМЕНТАР</div>
                            <textarea
                                className="form_textarea"
                                placeholder="Уточнення до замовлення"
                                value={comment} onChange={(e) => {
                                setComment(e.target.value)
                            }}
                            />
                        </div>

                        <div className="order_form_mail">
                            <div className="order_text">СПОСІБ ДОСТАВКИ</div>
                            <div className="order_details_main">
                                <label className="custom-checkbox checkbox_mail">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="np_branch"
                                        className="checkbox-input"
                                        checked={deliveryMethod === "np_branch"}
                                        onChange={() => setDeliveryMethod("np_branch")}
                                    />
                                    <span className="checkbox-custom"></span>
                                    <img src={newMail} alt=""/>
                                    ДОСТАВКА У ВІДДІЛЕННЯ НОВОЇ ПОШТИ
                                </label>
                                <label className="custom-checkbox checkbox_mail curier_basket">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="np_courier"
                                        className="checkbox-input"
                                        checked={deliveryMethod === "np_courier"}
                                        onChange={() => setDeliveryMethod("np_courier")}
                                    />
                                    <span className="checkbox-custom"></span>
                                    <img src={newMail} alt=""/>
                                    ДОСТАВКА КУР’ЄРОМ НА АДРЕСУ
                                </label>

                                <div className="name_input">ОБЛАСТЬ</div>
                                <div style={{width: "300px", margin: "20px auto"}}>
                                    <Select
                                        options={regionOptions}
                                        placeholder="ОБЛАСТЬ"
                                        styles={customStyles}
                                        onChange={(option) => {
                                            setSelectedRegion(option);
                                            setSelectedCity(null);
                                            setSelectedWarehouse(null);
                                        }}
                                        value={selectedRegion}
                                        isSearchable
                                    />
                                    <div className="name_input">МІСТО</div>
                                    <Select
                                        options={cityOptions}
                                        placeholder="МІСТО"
                                        styles={customStyles}
                                        onChange={(option) => {
                                            setSelectedCity(option);
                                            setSelectedWarehouse(null);
                                        }}
                                        value={selectedCity}
                                        isDisabled={!selectedRegion}
                                        isSearchable
                                    />{deliveryMethod === "np_branch" ?
                                    <>
                                        <div className="name_input">ВІДДІЛЕННЯ</div>
                                        <Select
                                            options={warehouseOptions}
                                            placeholder="ВІДДІЛЕННЯ"
                                            styles={customStyles}
                                            onChange={setSelectedWarehouse}
                                            value={selectedWarehouse}
                                            isDisabled={!selectedCity}
                                            isSearchable
                                        /></>
                                    :
                                    <>
                                        <div className="name_input">ВУЛИЦЯ</div>
                                        <input className="name_input_curier" placeholder="ДРАГОМАНОВА 2А" value={street} onChange={(e) => {setStreet(e.target.value)}}/>
                                        <div className="name_input">БУДИНОК</div>
                                        <input className="name_input_curier" placeholder="2" value={house} onChange={(e) => {setHouse(e.target.value)}}/>
                                        <div className="name_input">квартира/офіс</div>
                                        <input className="name_input_curier" placeholder="2" value={flat} onChange={(e) => {setFlat(e.target.value)}}/>
                                    </>
                                }

                                </div>
                            </div>

                            <div className="delivery_type">СПОСІБ ОПЛАТИ</div>
                            <label className="custom-checkbox checkbox_mail">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    className="checkbox-input"
                                    checked={paymentMethod === "cod"}
                                    onChange={() => setPaymentMethod("cod")}
                                />
                                <span className="checkbox-custom"></span>
                                Оплата готівкою
                            </label>
                            <label className="custom-checkbox checkbox_mail curier_basket">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    className="checkbox-input"
                                    checked={paymentMethod === "card"}
                                    onChange={() => setPaymentMethod("card")}
                                />
                                <span className="checkbox-custom"></span>
                                Оплата карткою(WayForPay)
                            </label>

                            <button className="order_button_next" onClick={() => {
                                order_process()
                            }}>Замовити</button>
                        </div>
                    </div>
                </div>

                <div className="bars_main_block">

                    <div className="bars_block_h1">
                        БАТОНЧИКИ
                    </div>
                    <div className="bars_block_description">
                        glow.detox.sleep.focus - без цукру, без лактози, без глютену.
                        ЦЕ НЕ ПРОСТО ПЕРЕКУС - ЦЕ ТВОЯ СУПЕРСИЛА У ФОРМАТІ БАТОНЧИКА.
                    </div>
                    <div className="for_over">
                        <div className="bars_block_products">

                            {bars.map((e) =>
                                <ProductCard
                                    namee={e.name}
                                    description={e.description}
                                    image={e.image}
                                    price={e.price}
                                    href={e.href}
                                    products={products}
                                    setProducts={setProducts}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer /></>
}
        </>
    );
};

export default Basket;
