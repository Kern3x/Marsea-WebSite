import React, { useContext, useEffect, useState } from "react";
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
        width: "100%",
        minWidth: "100%",
    }),
};

const Basket = ({ bars }) => {



    const { products, setProducts } = useContext(CartContext);


    const [signature, setSignature] = useState("");
    const [merchantAccount, setMerchantAccount] = useState("marsea_shop_com")
    const [merchantDomainName, setMerchantDomainName] = useState("marsea-shop.com")
    const [rand, setRand] = useState(Math.floor(Date.now() / 1000))
    const [rand1, setRand1] = useState(Math.floor(Date.now() / 10))
    const [summ, setSumm] = useState(123.00)
    const [productNameState, setProductNameState] = useState([])
    const [productPriceState, setProductPriceState] = useState([])
    const [productCountState, setProductCountState] = useState([])














    const [deliveryMethod, setDeliveryMethod] = useState("np_branch");
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const regionOptions = Array.from(
        new Set(npData.map((entry) => entry.region))
    ).map((region) => ({ value: region, label: region }));

    const cityOptions = selectedRegion
        ? Array.from(
            new Set(
                npData
                    .filter((entry) => entry.region === selectedRegion.value)
                    .map((entry) => entry.city)
            )
        ).map((city) => ({ value: city, label: city }))
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
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [street, setStreet] = useState("");
    const [house, setHouse] = useState("");
    const [flat, setFlat] = useState("");

    const handleWayforpay = async () => {
        const cart = products.map((e) => ({
            name: e.namee,
            price: e.price,
            quantity: e.quantity,
        }));

        const payload = {
            amount: products1,
            currency: "UAH",
            cart,
            client_name: name,
            client_phone: phone,
            client_email: email,
            comment,
            delivery: {
                method: deliveryMethod,
                region: selectedRegion?.value,
                city: selectedCity?.value,
                ...(deliveryMethod === "np_branch"
                    ? { warehouse: selectedWarehouse?.value }
                    : { address: `вул. ${street}, буд. ${house}, кв. ${flat}` }),
            },
            payment_method: paymentMethod,
        };

        try {
            const response = await axios.post(
                "https://marsea-shop.com/api/pay",
                payload
            );
            const data = response.data;
            console.log(data)

            if (paymentMethod === "card" && data?.url && data?.params) {
                const form = document.createElement("form");
                form.method = "POST";
                form.action = data.url;

                Object.entries(data.params).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((val) => {
                            const input = document.createElement("input");
                            input.type = "hidden";
                            input.name = key + "[]";
                            input.value = val;
                            form.appendChild(input);
                        });
                    } else {
                        const input = document.createElement("input");
                        input.type = "hidden";
                        input.name = key;
                        input.value = value;
                        form.appendChild(input);
                    }
                });

                document.body.appendChild(form);
                form.target = "_blank"
                console.log(form)
                form.submit();
            } else {
                console.log("Оплата готівкою або помилка", data);
            }
        } catch (error) {
            console.error("Помилка при оформленні замовлення", error);
        }
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



    useEffect(() => {
        if (!products || products.length === 0) return;

        const names = products.map((e) => e.namee);
        const prices = products.map((e) => e.price);
        const counts = products.map((e) => e.quantity);

        setProductNameState(names);
        setProductPriceState(prices);
        setProductCountState(counts);
    }, [products]);

    useEffect(() => {
        if (
            productNameState.length === 0 ||
            productPriceState.length === 0 ||
            productCountState.length === 0
        )
            return;

        const fetchSignature = async () => {
            const res = await fetch("http://localhost:3001/generate-signature", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    merchantAccount: merchantAccount,
                    merchantDomainName: merchantDomainName,
                    orderReference: rand1,
                    orderDate: rand,
                    amount: products1,
                    currency: "UAH",
                    productName: productNameState,
                    productCount: productCountState,
                    productPrice: productPriceState,
                }),
            });

            const data = await res.json();
            console.log("Подпись:", data.signature);
            setSignature(data.signature);
        };

        fetchSignature();
    }, [productNameState, productPriceState, productCountState]);



    // Пока подпись не загружена — не рендерим форму

    return (
        <>
            <form
                method="post"
                action="https://secure.wayforpay.com/pay"
                acceptCharset="utf-8"
                className = "qwer"
            >
                <input type="hidden" name="merchantAccount" value={merchantAccount} />
                <input type="hidden" name="merchantAuthType" value="" />
                <input type="hidden" name="merchantDomainName" value={merchantDomainName} />
                <input type="hidden" name="orderReference" value={rand1} />
                <input type="hidden" name="orderDate" value={rand} />
                <input type="hidden" name="amount" value={products1} />
                <input type="hidden" name="currency" value="UAH" />
                <input type="hidden" name="orderTimeout" value="" />
                {productNameState.map((e) => <input type="hidden" name="productName[]" value={e} />)}
                {productPriceState.map((e) => <input type="hidden" name="productPrice[]" value={e} />)}
                {productCountState.map((e) => <input type="hidden" name="productCount[]" value={e} />)}
                <input type="hidden" name="clientFirstName" value="" />
                <input type="hidden" name="clientLastName" value="" />
                <input type="hidden" name="clientAddress" value="" />
                <input type="hidden" name="clientCity" value="" />
                <input type="hidden" name="clientEmail" value="" />
                <input type="hidden" name="defaultPaymentSystem" value="" />
                <input type="hidden" name="returnUrl" value="https://marsea-shop.com/thankyou" />
                <input type="hidden" name="serviceUrl" value="http://localhost:3001/wayforpay-callback" />
                <input type="hidden" name="merchantSignature" value={signature} />

            </form>
            {!signature ? <div>Загрузка...</div> : ""}

            {products1 < 200 ? (
                <OrderSumMin t={true} />
            ) : (
                <>
                    <Header products={products} setProducts={setProducts} />
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
                                        {products.length < 1 ? (
                                            "ТУТ ПОКИ НІЧОГО НЕМАЄ"
                                        ) : (
                                            <>
                                                <div>ВСЬОГО:</div>
                                                <div className="summ">{products1}₴</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="order_form">
                                <div className="order_text">данні для замовлення</div>
                                <div className="order_details_main">
                                    <div className="name_input">ім’я</div>
                                    <input
                                        type="text"
                                        className="form_input"
                                        placeholder="Ваше ім’я"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                    <div className="name_input">Телефон</div>
                                    <input
                                        type="text"
                                        className="form_input"
                                        placeholder="+380 (93) 993 93 93"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                        }}
                                    />
                                    <div className="name_input">пошта</div>
                                    <input
                                        type="text"
                                        className="form_input"
                                        placeholder="example@gmail.com"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                    <div className="name_input">КОМЕНТАР</div>
                                    <textarea
                                        className="form_textarea"
                                        placeholder="Уточнення до замовлення"
                                        value={comment}
                                        onChange={(e) => {
                                            setComment(e.target.value);
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
                                            <img src={newMail} alt="" />
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
                                            <img src={newMail} alt="" />
                                            ДОСТАВКА КУР’ЄРОМ НА АДРЕСУ
                                        </label>

                                        <div className="name_input">ОБЛАСТЬ</div>
                                        <div style={{ width: "300px", margin: "20px auto" }}>
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
                                            />
                                            {deliveryMethod === "np_branch" ? (
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
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <div className="name_input">ВУЛИЦЯ</div>
                                                    <input
                                                        className="name_input_curier"
                                                        placeholder="ДРАГОМАНОВА 2А"
                                                        value={street}
                                                        onChange={(e) => {
                                                            setStreet(e.target.value);
                                                        }}
                                                    />
                                                    <div className="name_input">БУДИНОК</div>
                                                    <input
                                                        className="name_input_curier"
                                                        placeholder="2"
                                                        value={house}
                                                        onChange={(e) => {
                                                            setHouse(e.target.value);
                                                        }}
                                                    />
                                                    <div className="name_input">квартира/офіс</div>
                                                    <input
                                                        className="name_input_curier"
                                                        placeholder="2"
                                                        value={flat}
                                                        onChange={(e) => {
                                                            setFlat(e.target.value);
                                                        }}
                                                    />
                                                </>
                                            )}
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

                                    <button
                                        className="order_button_next"
                                        onClick={() => {
                                            if (paymentMethod === "cod"){
                                                handleWayforpay()
                                            }else{
                                                handleWayforpay()
                                                document.querySelector(".qwer").submit()
                                            }


                                        }}
                                    >
                                        Замовити
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bars_main_block">
                            <div className="bars_block_h1">БАТОНЧИКИ</div>
                            <div className="bars_block_description">
                                glow.detox.sleep.focus - без цукру, без лактози, без глютену. ЦЕ
                                НЕ ПРОСТО ПЕРЕКУС - ЦЕ ТВОЯ СУПЕРСИЛА У ФОРМАТІ БАТОНЧИКА.
                            </div>
                            <div className="for_over">
                                <div className="bars_block_products">
                                    {bars.map((e) => (
                                        <ProductCard
                                            namee={e.name}
                                            description={e.description}
                                            image={e.image}
                                            price={e.price}
                                            href={e.href}
                                            products={products}
                                            setProducts={setProducts}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
};

export default Basket;
