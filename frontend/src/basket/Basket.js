import React, {useContext, useEffect, useState} from "react";
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
    const [products1, setProducts1] = useState(0);
    const [deliveryMethod, setDeliveryMethod] = useState("post");
    console.log(deliveryMethod)

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
                            <input type="text" className="form_input" placeholder="Ваше ім’я"/>
                            <div className="name_input">Телефон</div>
                            <input
                                type="text"
                                className="form_input"
                                placeholder="+380 (93) 993 93 93"
                            />
                            <div className="name_input">пошта</div>
                            <input
                                type="text"
                                className="form_input"
                                placeholder="example@gmail.com"
                            />
                            <div className="name_input">КОМЕНТАР</div>
                            <textarea
                                className="form_textarea"
                                placeholder="Уточнення до замовлення"
                            />
                        </div>

                        <div className="order_form_mail">
                            <div className="order_text">СПОСІБ ДОСТАВКИ</div>
                            <div className="order_details_main">
                                <label className="custom-checkbox checkbox_mail">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="post"
                                        className="checkbox-input"
                                        checked={deliveryMethod === "post"}
                                        onChange={() => setDeliveryMethod("post")}
                                    />
                                    <span className="checkbox-custom"></span>
                                    <img src={newMail} alt=""/>
                                    ДОСТАВКА У ВІДДІЛЕННЯ НОВОЇ ПОШТИ
                                </label>
                                <label className="custom-checkbox checkbox_mail curier_basket">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="courier"
                                        className="checkbox-input"
                                        checked={deliveryMethod === "courier"}
                                        onChange={() => setDeliveryMethod("courier")}
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
                                    />{deliveryMethod === "post" ?
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
                                        <input className="name_input_curier" placeholder="ДРАГОМАНОВА 2А"/>
                                        <div className="name_input">БУДИНОК</div>
                                        <input className="name_input_curier" placeholder="2"/>
                                        <div className="name_input">квартира/офіс</div>
                                        <input className="name_input_curier" placeholder="2"/>
                                    </>
                                }

                                </div>
                            </div>

                            <button className="order_button_next">вперед</button>
                            <div className="delivery_type">СПОСІБ ОПЛАТИ</div>
                            <input
                                type="text"
                                className="form_input payment_input"
                                placeholder="ОПЛАТА APPLE PAY/GOOGLE PAY/ ЗА РЕКВІЗИТАМИ"
                            />
                            <button className="order_button_next">Замовити</button>
                        </div>
                    </div>
                </div>

                <div className="kombucha_block">
                    <div className="kombucha_block_h1">схожі товари</div>
                    <div className="kombucha_block_description">
                        glow.detox.sleep.focus - без цукру, без лактози, без глютену. ЦЕ НЕ ПРОСТО
                        ПЕРЕКУС - ЦЕ ТВОЯ СУПЕРСИЛА У ФОРМАТІ БАТОНЧИКА.
                    </div>
                    <div className="kombucha_block_products">
                        {bars.map((e, i) => (
                            <ProductCard
                                key={i}
                                namee={e.name}
                                description={e.description}
                                image={e.image}
                                price={e.price}
                                href={e.href}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Basket;
