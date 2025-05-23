import React, {useEffect, useState} from 'react';
import "./header.css"
import logo from "./images/logo.svg"
import basket from "./images/basket.svg"
import BasketElement from "../basket/BasketElement";
    const Header = ({products, setProducts}) => {

        const [products1, setProducts1] = useState(0)

        const [showHeader, setShowHeader] = useState(false);

        useEffect(() => {
            const onScroll = () => {
                setShowHeader(window.pageYOffset >= 70);
            };
            window.addEventListener("scroll", onScroll);
            return () => window.removeEventListener("scroll", onScroll);
        }, []);

        useEffect(() => {
            if (Array.isArray(products)) {
                setProducts1(products.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0));
                localStorage.setItem("cart", JSON.stringify(products));
            }
        }, [products]);
        return (
            <div className={`header ${showHeader ? "visible" : ""}`}>
                <div>
                    <a href = "/">
                <img src = {logo} alt = ""/>
                    </a>
                </div>

                <div className = "main_menu_basket">
                    <div className = "header_main_menu">
                        <a href="#bars">батончики</a>
                        <a href="#about">про нас</a>
                        <a href="#powder">порошки</a>
                        <a href="#showbox">шоубокс</a>
                        <a href="#set">набори</a>
                    </div>
                    <div className = "header_cart_button">
                        <a onClick={() => {
                            document.querySelector(".cart_modal_h").classList.toggle("dis_block")
                        }}><img src={basket} alt=""/></a>
                        <div className="cart_modal_h">
                            <div className="cart_modal_text">Деталі замовлення</div>
                            {products?.length || 0 < 1 ? <>
                                    <div className="empty_cart">ТУТ ПОКИ НІЧОГО НЕМАЄ</div>
                                    <hr/>
                                </> :
                                <>{products.map((e) =>
                                    <BasketElement image={e.image} namee={e.namee} price={e.price}
                                                   setProducts={setProducts} products={products}
                                                   quantity={e.quantity}/>
                                )}
                                    <div className="summ_products">
                                        <div>ВСЬОГО</div>
                                        <div>{products1} грн.</div>
                                    </div>
                                </>
                            }

                            <a href="/basket">
                                <button className="to_cart">
                                    до кошика
                                </button>
                            </a>
                            <button className="button_close_cart" onClick={() => {
                                document.querySelector(".cart_modal_h").classList.toggle("dis_block")
                            }}>
                                закрити
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

export default Header;