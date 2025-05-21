import React from 'react';
import "./basket.css"
import bar from "../components/images/bar1.png"
import kr from "../components/images/bitcoin-icons_plus-outline.svg"
import minus from "../components/images/Minus.svg"
import plus from "../components/images/Plus.svg"
import BasketElement from "./BasketElement";
import ProductCard from "../components/ProductCard";
import newMail from "./newMail.svg"
import Header from "../components/Header";

const Basket = () => {
    return (
        <>
            <Header/>
            <div className="basket_page">
                <div className="basket_details">
                    <div className="products_details">
                        <div className="details_text">деталі замовлення</div>
                        <div className="details_quantity">
                            <BasketElement/>
                            <BasketElement/>
                            <BasketElement/>
                            <BasketElement/>
                            <BasketElement/>
                        </div>
                        <div className="summ_products">
                            <div>ВСЬОГО:</div>
                            <div className="summ">352₴</div>
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
                                    <input type="checkbox" className="checkbox-input"/>

                                    <span className="checkbox-custom"></span>
                                    <img src = {newMail} alt = ""/>
                                    ДОСТАВКА У ВІДДІЛЕННЯ НОВОЇ ПОШТИ
                                </label>
                                <label className="custom-checkbox checkbox_mail">
                                    <input type="checkbox" className="checkbox-input"/>

                                    <span className="checkbox-custom"></span>
                                    <img src = {newMail} alt = ""/>
                                    ДОСТАВКА КУР’ЄРОМ НА АДРЕСУ
                                </label>


                                <div className="name_input">
                                    ОБЛАСТЬ
                                </div>
                                <input type="text" className="form_input" placeholder="КИЇВСЬКА ОБЛАСТЬ"/>
                                <div className="name_input">
                                    МІСТО
                                </div>
                                <input type="text" className="form_input" placeholder="КИЇВ"/>
                                <div className="name_input">
                                    відділення
                                </div>
                                <input type = "text" className="form_input" placeholder="№11223"/>
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
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>

                    </div>
                </div>

            </div>
        </>

    );
};

export default Basket;