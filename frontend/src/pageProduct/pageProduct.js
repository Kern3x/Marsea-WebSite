import React, {useContext, useEffect, useState} from 'react';
import "./pageProduct.css"
import ProductCard from "../components/ProductCard";
import ProductPageCard from "./ProductPageCard";
import marseaLine from "../components/images/marseaLine.svg";
import Header from "../components/Header";
import bar1 from "../components/images/bar1.png";
import bar2 from "../mainPage/images/detoxbar.png";
import bar3 from "../mainPage/images/sleepbar.png";
import bar4 from "../mainPage/images/focusbar.png";
import CartContext from "../CartContext";
import BasketElement from "../basket/BasketElement";
import mob_cart from "../components/images/mob_cart.svg";
import footer_logo from "../components/images/logo_footer.svg";
import insta from "../mainPage/images/inst.svg";
import telegram from "../mainPage/images/telegram.svg";
const PageProduct = ({ image, description, namee, price, bars, phrase, aboutProduct, lastPhrase, composition}) => {

    const [products1, setProducts1] = useState(0)
    const { products, setProducts } = useContext(CartContext);
    const addToCart1 = () => {

        document.querySelector(".cart_modal_h").classList.add("opacity_o")
        console.log(products)
        const updatedCart = [...products];
        const index = updatedCart.findIndex(item => item.namee === namee);

        if (index !== -1) {
            updatedCart[index].quantity += 1;
        } else {
            updatedCart.push({image, namee, price, quantity: 1});
        }

        setProducts(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        if(window.innerWidth <= 768) {

            document.querySelector(".modal_cart_allscreen").classList.toggle("opacity_mob")
        }else{
            document.querySelector(".cart_modal_h").classList.add("opacity_o")

        }
    };
    useEffect(() => {
        setProducts1(products.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0))

        localStorage.setItem("cart", JSON.stringify(products))

    }, [products])
    return (
        <>
            <div className = "modal_cart_allscreen" onClick={(e) => {
                e.currentTarget.classList.toggle("opacity_mob")
            }}>
                <div className="cart_modal_mob" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div className="cart_modal_text">Деталі замовлення</div>
                    {products.length < 1 ? <>
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

                    <a href="/basket">
                        <button className="to_cart">
                            до кошика
                        </button>
                    </a>
                    <button className="button_close_cart" onClick={() => {
                        document.querySelector(".modal_cart_allscreen").classList.toggle("opacity_mob")
                    }}>
                        закрити
                    </button>
                </div>
            </div>
            <img src={mob_cart} alt="" className = "mob_cart_btn" onClick = {() => {
                document.querySelector(".modal_cart_allscreen").classList.toggle("opacity_mob")
            }} />
            <Header/>


            <div className = "page_product">
            <div className = "breadcrumbs">
                <a href = "/">ГОЛОВНА</a> / {namee}
            </div>
            <div className = "product_desc">
                <ProductPageCard image={image} price={price} description={description} namee={namee} setProducts={setProducts} products={products}/>
                <div className = "product_desc_main">
                    <div className = "red_text">{namee}</div>
                    <div className = "main_desc_product">{phrase}</div>
                    <div className = "red_text">склад:</div>
                    <div className = "product_attribute"><ul>
                        {composition.map((e) => <li>{e}</li>)}
                    </ul>
                        <br/>
                        <br/>
                        {aboutProduct.map((e) => <div>{e}</div>)}
                        <br/>
                        <br/>
                        {lastPhrase}</div>
                    <button className = "order_button" onClick={() => {
                        addToCart1()
                        document.querySelector(".modal_cart_allscreen").classList.toggle("opacity_mob")}}>
                        Замовити
                    </button>
                </div>
            </div>
            <div className = "marsea_line">
                <div className = "line_images">
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                </div>
            </div>
            <div className = "kombucha_block">
                <div className = "kombucha_block_h1">
                    схожі товари
                </div>
                <div className = "kombucha_block_description">
                    glow.detox.sleep.focus - без цукру, без лактози, без глютену.
                    ЦЕ НЕ ПРОСТО ПЕРЕКУС - ЦЕ ТВОЯ СУПЕРСИЛА У ФОРМАТІ БАТОНЧИКА.
                </div>
                <div className = "for_over">
                <div className="bars_block_products">

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
        </div>
            <div className = "footer" onLoad={(e) => {
               if( window.innerWidth < 768){ e.currentTarget.style.cssText = "margin-bottom:109px"}
            }}>
                <div className = "footer_logo_menu">
                    <div className = "footer_logo_block">
                        <img src = {footer_logo} alt = ""/>
                    </div>
                    <div className = "footer_main_menu">
                        <a href="#bars">батончики</a>
                        <a href="#about">про нас</a>
                        <a href="#powder">порошки</a>
                        <a href="#showbox">шоубокс</a>
                        <a href="#set">набори</a>
                    </div>
                    <div className = "society_footer">
                        <div><a href = "https://www.instagram.com/marsea.official?igsh=OW04ZHRjMHYyNWgx" target = "_blank">{window.innerWidth <= 768 ? <img src={insta} alt = "" /> : "instagram"}</a></div>
                        <div><a href = "https://t.me/marsi2k19" target = "_blank">{window.innerWidth <= 768 ? <img src={telegram} alt = "" /> : "telegram"}</a></div>
                    </div>
                </div>
                <div className = "copyright_marsea">
                    ©2025, Marsea
                </div>
            </div>
            {window.innerWidth <= 768 ? <div className = "button_order">
                <button className = "order_button fix" onClick={() => {
                    addToCart1()
                    document.querySelector(".modal_cart_allscreen").classList.add("opacity_mob")
                }}>
                    Замовити
                </button>
            </div> : ""}
        </>
    );
};

export default PageProduct;