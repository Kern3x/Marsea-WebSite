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
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

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


    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) newErrors.name = true;
        if (!phone.trim()) newErrors.phone = true;
        if (!email.trim()) newErrors.email = true;

        if (!selectedRegion) newErrors.region = true;
        if (!selectedCity) newErrors.city = true;

        if (deliveryMethod === "np_branch") {
            if (!selectedWarehouse) newErrors.warehouse = true;
        } else {
            if (!street.trim()) newErrors.street = true;
            if (!house.trim()) newErrors.house = true;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [signature, setSignature] = useState("");
    const [merchantAccount, setMerchantAccount] = useState("freelance_user_66f5183794ca1");
    const [merchantDomainName, setMerchantDomainName] = useState("marsea-shop.com");
    const [orderDate, setOrderDate] = useState(""); // Renamed from rand for clarity
    const [orderReference, setOrderReference] = useState(""); // Renamed from rand1 for clarity
    const [amount, setAmount] = useState(""); // Changed initial state to empty string, and ensured it's a string later
    const [productNameState, setProductNameState] = useState([]);
    const [productPriceState, setProductPriceState] = useState([]);
    const [productCountState, setProductCountState] = useState([]);

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

    const [totalProductsPrice, setTotalProductsPrice] = useState(0); // Renamed from products1 for clarity
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [street, setStreet] = useState("");
    const [house, setHouse] = useState("");
    const [flat, setFlat] = useState("");

    // Ref to the WayForPay form
    const wayforpayFormRef = React.useRef(null);

    const handleWayforpay = async () => {
        if (totalProductsPrice < 200) {
            alert("Мінімальна сума замовлення 200₴");
            return;
        }

        const cart = products.map((e) => ({
            name: e.namee,
            price: e.price,
            quantity: e.quantity,
        }));

        const payload = {
            amount: totalProductsPrice,
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
            const response = await axios.post("https://marsea-shop.com/api/pay", payload);
            const data = response.data;

            if (paymentMethod === "card") {
                // сохраните данные во временное состояние
                fillAndSubmitWayforpayForm(data.params);
            } else {
                window.location.href = "https://marsea-shop.com/thankyou";
            }
        } catch (error) {
            console.error("Помилка при оформленні замовлення", error);
            alert("Виникла помилка при оформленні замовлення. Будь ласка, спробуйте ще раз.");
        }
    };

    const fillAndSubmitWayforpayForm = (wayforpayParams) => {
        // ✅ вызывается только из `handleWayforpay`, но вызов сабмита вынесен в клик-обработчик
        setTimeout(() => {
            const form = wayforpayFormRef.current;
            if (!form) return;

            form.querySelector('input[name="merchantSignature"]').value = wayforpayParams.merchantSignature;
            form.querySelector('input[name="orderDate"]').value = wayforpayParams.orderDate;
            form.querySelector('input[name="orderReference"]').value = wayforpayParams.orderReference;
            form.querySelector('input[name="amount"]').value = String(wayforpayParams.amount);

            // Удалить и пересоздать поля
            form.querySelectorAll('input[name="productName[]"]').forEach(input => input.remove());
            form.querySelectorAll('input[name="productPrice[]"]').forEach(input => input.remove());
            form.querySelectorAll('input[name="productCount[]"]').forEach(input => input.remove());

            products.forEach(product => {
                const nameInput = document.createElement('input');
                nameInput.type = 'hidden';
                nameInput.name = 'productName[]';
                nameInput.value = product.namee;
                form.appendChild(nameInput);

                const priceInput = document.createElement('input');
                priceInput.type = 'hidden';
                priceInput.name = 'productPrice[]';
                priceInput.value = String(`${product.price}.00`);
                form.appendChild(priceInput);

                const countInput = document.createElement('input');
                countInput.type = 'hidden';
                countInput.name = 'productCount[]';
                countInput.value = product.quantity;
                form.appendChild(countInput);
            });

            form.querySelector('input[name="clientFirstName"]').value = name;
            form.querySelector('input[name="clientAddress"]').value = `${street}, ${house}, ${flat}`;
            form.querySelector('input[name="clientCity"]').value = selectedCity?.value;
            form.querySelector('input[name="clientEmail"]').value = email;

            form.target = "_blank";

            // ✅ ОБЯЗАТЕЛЬНО вызвать submit через клик
            const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
            form.dispatchEvent(clickEvent); // iOS лучше воспринимает такое поведение
            form.submit();
        }, 0); // микрозадержка
    };

    useEffect(() => {
        setTotalProductsPrice(
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
        const prices = products.map((e) => String(`${e.price}.00`));
        const counts = products.map((e) => e.quantity);

        setProductNameState(names);
        setProductPriceState(prices);
        setProductCountState(counts);
    }, [products]);

    return (
        <>
            <form
                method="post"
                action="https://secure.wayforpay.com/pay"
                acceptCharset="utf-8"
                className="qwer"
                ref={wayforpayFormRef} // Assign ref to the form
            >
                <input type="hidden" name="merchantAccount" value={merchantAccount} />
                <input type="hidden" name="merchantAuthType" value="" />
                <input type="hidden" name="merchantDomainName" value={merchantDomainName} />
                <input type="hidden" name="orderReference" value={orderReference} />
                <input type="hidden" name="orderDate" value={orderDate} />
                <input type="hidden" name="amount" value={amount} />
                <input type="hidden" name="currency" value="UAH" />
                <input type="hidden" name="orderTimeout" value="" />
                {productNameState.map((e, i) => (
                    <input key={`name-${i}`} type="hidden" name="productName[]" value={e} />
                ))}
                {productPriceState.map((e, i) => (
                    <input key={`price-${i}`} type="hidden" name="productPrice[]" value={e} />
                ))}
                {productCountState.map((e, i) => (
                    <input key={`count-${i}`} type="hidden" name="productCount[]" value={e} />
                ))}
                <input type="hidden" name="clientFirstName" value={name} /> {/* Populate client info */}
                <input type="hidden" name="clientLastName" value="" />
                <input type="hidden" name="clientAddress" value={`${street}, ${house}, ${flat}`} />
                <input type="hidden" name="clientCity" value={selectedCity?.value} />
                <input type="hidden" name="clientEmail" value={email} />
                <input type="hidden" name="defaultPaymentSystem" value="" />
                <input type="hidden" name="returnUrl" value="https://marsea-shop.com/thankyou" />
                <input type="hidden" name="serviceUrl" value="https://marsea-shop.com/api/pay-callback" />
                <input type="hidden" name="merchantSignature" value={signature} />
            </form>

            {totalProductsPrice < 200 ? <OrderSumMin t={true} /> : ""}
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
                                        <div className="summ">{totalProductsPrice}₴</div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <form className="order_form">
                        <div className="order_text">данні для замовлення</div>
                        <div className="order_details_main">
                            <div className="name_input">ім’я</div>
                            <input
                                type="text"
                                className={`form_input ${errors.name ? "error" : ""}`}
                                placeholder="Ваше ім’я"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <div className="name_input">Телефон</div>
                            <input
                                type="text"
                                className={`form_input ${errors.phone ? "error" : ""}`}
                                placeholder="+380 (93) 993 93 93"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                            <div className="name_input">пошта</div>
                            <input
                                type="text"
                                className={`form_input ${errors.email ? "error" : ""}`}
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
                                        classNamePrefix={errors.region ? "select-error" : ""}
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
                                        classNamePrefix={errors.city ? "select-error" : ""}
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
                                                classNamePrefix={errors.warehouse ? "select-error" : ""}
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
                                                className={`name_input_curier ${errors.street ? "error" : ""}`}
                                                placeholder="ДРАГОМАНОВА 2А"
                                                value={street}
                                                onChange={(e) => {
                                                    setStreet(e.target.value);
                                                }}
                                            />
                                            <div className="name_input">БУДИНОК</div>
                                            <input
                                                className={`name_input_curier ${errors.house ? "error" : ""}`}
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

                            <button type = "submit"
                                    className="order_button_next"
                                    onClick={(e) => {
                                        e.preventDefault(); // Остановим отправку формы
                                        if (totalProductsPrice < 200) {
                                            alert("Мінімальна сума замовлення 200₴");
                                            return;
                                        }

                                        if (validateForm()) {
                                            handleWayforpay();
                                        } else {
                                            window.scrollTo({ top: 0, behavior: 'smooth' }); // Поднимем к форме
                                        }
                                    }}
                            >
                                Замовити
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bars_main_block">
                    <div className="bars_block_h1">БАТОНЧИКИ</div>
                    <div className="bars_block_description">
                        glow.detox.sleep.focus - без цукру, без лактози, без глютену. ЦЕ
                        НЕ ПРОСТО ПЕРЕКУС - ЦЕ ТВОЯ СУПЕРСИЛА У ФОРМАТІ БАТОНЧИКА.
                    </div>
                    <div className="for_over">
                        {window.innerWidth > 1000 ? (
                            <div className="bars_block_products">
                                {bars.map((e, i) => (
                                    <ProductCard
                                        key={i} // Added key for list rendering
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
                        ) : (
                            <Swiper
                                spaceBetween={16}
                                slidesPerView={window.innerWidth / 230}
                                pagination={{ clickable: true }}
                                modules={[Pagination]}
                                breakpoints={{
                                    768: { slidesPerView: 1 }, // для планшетов
                                    1024: { slidesPerView: 3 }, // для десктопа
                                }}
                            >
                                {bars.map((e, index) => (
                                    <SwiperSlide key={index}>
                                        <ProductCard
                                            namee={e.name}
                                            description={e.description}
                                            image={e.image}
                                            price={e.price}
                                            href={e.href}
                                            products={products}
                                            setProducts={setProducts}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Basket;