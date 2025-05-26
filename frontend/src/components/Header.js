import React, {useContext, useEffect, useState} from 'react';
import "./header.css"
import logo from "./images/logo.svg"
import basket from "./images/basket.svg"
import BasketElement from "../basket/BasketElement";
import CartContext from "../CartContext";
import "./headerAdaptive.css"

const Header = () => {


    const {products, setProducts} = useContext(CartContext);
    const [products1, setProducts1] = useState(0)

    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        const onScroll = () => {

            setShowHeader(window.pageYOffset >= 70);
            if (window.pageYOffset < 70) {
                document.querySelector(".cart_modal_h").classList.remove("opacity_o")

            }else if(window.pageYOffset <= 70){
                document.querySelector(".cart_modal").classList.remove("opacity_t")
            }

        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {

        setProducts1(products.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0));
        localStorage.setItem("cart", JSON.stringify(products));

    }, [products]);
    return (
        <div className={`header ${showHeader ? "visible" : ""}`}>

            <div className="logo_block">
                <a href="/">
                    <img src={logo} alt=""/>
                </a>
            </div>
            {window.innerWidth <= 768 ?
                <div className="burger_menu" onClick={() => {
                    document.querySelector(".mobile_menu").classList.toggle("start_pos_mob_menu")
                }}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                : ""}

            <div className="main_menu_basket">
                <div className="header_main_menu">
                    <a href="/#bars">батончики</a>
                    <a href="/#about">про нас</a>
                    <a href="/#powder">порошки</a>
                    <a href="/#showbox">шоубокс</a>
                    <a href="/#set">набори</a>
                </div>
                <div className="header_cart_button">
                    <a onClick={() => {
                        document.querySelector(".cart_modal_h").classList.toggle("opacity_o")
                        document.querySelector(".cart_modal_h").classList.toggle("dis_block")
                    }}><img src={basket} alt=""/></a>
                    <div className="cart_modal_h">
                        <div className="cart_modal_text">Деталі замовлення</div>
                        {Array.isArray(products) && products.length < 1 ? <>
                                <div className="empty_cart">ТУТ ПОКИ НІЧОГО НЕМАЄ</div>
                                <hr/>
                            </> :
                            <>
                                <div className="all_products_basket">{products.map((e) =>
                                    <BasketElement image={e.image} namee={e.namee} price={e.price}
                                                   setProducts={setProducts} products={products}
                                                   quantity={e.quantity}/>
                                )}</div>
                                <div className="summ_products">
                                    <div>ВСЬОГО</div>
                                    <div>{products1} грн.</div>
                                </div>
                            </>
                        }

                        <a onClick={() => {
                            products1 < 200 ? document.querySelector(".order_summ_min").classList.add("dis_block_summ") : window.location.href = "/basket"
                        }}>
                            <button className="to_cart">
                                до кошика
                            </button>
                        </a>
                        <button className="button_close_cart" onClick={() => {
                            document.querySelector(".cart_modal_h").classList.toggle("opacity_o")
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