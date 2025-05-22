import React, {useEffect, useState} from 'react';
import "./basket.css"
import bar from "../components/images/bar1.png"
import kr from "../components/images/bitcoin-icons_plus-outline.svg"
import minus from "../components/images/Minus.svg"
import plus from "../components/images/Plus.svg"
import BasketElement from "./BasketElement";
import ProductCard from "../components/ProductCard";
import newMail from "./newMail.svg"
import Header from "../components/Header";
import CitySelect from "../components/SelectObl";
import CityWarehouseSelect from "../components/SelectObl";
import SelectCity from "../components/SelectCity";

const Basket = ({bars}) => {

    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("cart")))
    const [products1, setProducts1] = useState(0)
    const [deliveryMethod, setDeliveryMethod] = useState("post");


    useEffect(() => {
        setProducts1(products.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0))
        localStorage.setItem("cart", JSON.stringify(products))



    }, [products])
    const handleCityChange = (city) => {
        console.log("Selected city:", city);
    };




    return (
        <>
            <Header/>
            <div className="basket_page">
                <div className="basket_details">
                    <div className="products_details">
                        <div className="details_text">деталі замовлення</div>
                        <div className="details_quantity">
                            {products.map((e) =>
                                <BasketElement image={e.image} namee={e.namee} price={e.price} setProducts={setProducts} products={products} quantity={e.quantity}/>
                            )}
                            <div className="summ_products">
                                <div>ВСЬОГО:</div>
                                <div className="summ">{products1}₴</div>
                            </div>
                        </div>

                    </div>
                    <div className="order_form">
                        <div className="order_text">
                            данні для замовлення
                        </div>
                        <div className="order_details_main">
                            <div className="name_input">
                                ім’я
                            </div>
                            <input type="text" className="form_input" placeholder="Ваше ім’я"/>
                            <div className="name_input">
                                Телефон
                            </div>
                            <input type="text" className="form_input" placeholder="+380 (93) 993 93 93"/>
                            <div className="name_input">
                                пошта
                            </div>
                            <input type="text" className="form_input" placeholder="example@gmail.com"/>
                            <div className="name_input">
                                КОМЕНТАР
                            </div>
                            <textarea className="form_textarea" placeholder="Уточнення до замовлення"/>
                        </div>

                        <div className="order_form_mail">
                            <div className="order_text">
                                СПОСІБ ДОСТАВКИ
                            </div>
                            <div className="order_details_main">

                                <label className="custom-checkbox checkbox_mail">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="post"
                                        className = "checkbox-input"
                                        checked={deliveryMethod === "post"}
                                        onChange={() => setDeliveryMethod("post")}
                                    />

                                    <span className="checkbox-custom"></span>
                                    <img src = {newMail} alt = ""/>
                                    ДОСТАВКА У ВІДДІЛЕННЯ НОВОЇ ПОШТИ
                                </label>
                                <label className="custom-checkbox checkbox_mail curier_basket">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        className = "checkbox-input"
                                        value="courier"
                                        checked={deliveryMethod === "courier"}
                                        onChange={() => setDeliveryMethod("courier")}
                                    />

                                    <span className="checkbox-custom"></span>
                                    <img src = {newMail} alt = ""/>
                                    ДОСТАВКА КУР’ЄРОМ НА АДРЕСУ
                                </label>


                                <div className="name_input">
                                    ОБЛАСТЬ
                                </div>
                                <div style={{ width: "300px", margin: "20px auto" }}>
                                    <SelectCity placeholder = "КИЇВСЬКА ОБЛАСТЬ"/>
                                </div>

                            </div>
                            <button className = "order_button_next">
                                вперед
                            </button>
                            <div className="delivery_type">
                                СПОСІБ ОПЛАТИ
                            </div>
                            <input type = "text" className="form_input payment_input" placeholder="ОПЛАТА APPLE PAY/GOOGLE PAY/ ЗА РЕКВІЗИТАМИ"/>
                            <button className = "order_button_next">
                                Замовити
                            </button>

                        </div>


                    </div>


                </div>
                <div className = "kombucha_block">
                    <div className = "kombucha_block_h1">
                        схожі товари
                    </div>
                    <div className = "kombucha_block_description">
                        glow.detox.sleep.focus - без цукру, без лактози,
                        без глютену. ЦЕ НЕ ПРОСТО ПЕРЕКУС - ЦЕ ТВОЯ СУПЕРСИЛА У ФОРМАТІ БАТОНЧИКА.
                    </div>
                    <div className = "kombucha_block_products">
                        {bars.map((e) =>
                            <ProductCard
                                namee={e.name}
                                description={e.description}
                                image={e.image}
                                price={e.price}
                                href = {e.href}
                            />
                        )}

                    </div>
                </div>

            </div>
        </>

    );
};

export default Basket;