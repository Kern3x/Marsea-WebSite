import React, {useContext, useEffect, useState} from 'react';
import Header from "./Header";
import BasketElement from "../basket/BasketElement";
import newMail from "../basket/newMail.svg";
import Select from "react-select";
import ProductCard from "./ProductCard";
import CartContext from "../CartContext";
import "./thankyoupage.css"
import Footer from "./Footer";
/* global fbq */
const ThankYouPage = ({bars}) => {
    const {products, setProducts} = useContext(CartContext);

    const [products1, setProducts1] = useState(0);
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
        if (products1 > 0){
        setTimeout(() => {
            console.log(products)
           if (products.length > 0 ){
                fbq('track', 'Purchase', {
                    content_ids: products.map(p => p.namee),
                    content_type: 'product',
                    value: products1,
                    currency: 'UAH'
                });
            }
            localStorage.setItem("cart", []);
        }, 5000)}
    }, [products1])
    return (
        <>{products.length ? <>
            <Header products={products} setProducts={setProducts}/>
            <div className="basket_page thank_you">
                <div className="basket_details">
                    <div className="products_details">
                        <div className="details_text">ваше замовлення прийнято</div>
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
        </> : window.location.href = "/"}
            <Footer />
        </>
    );
};

export default ThankYouPage;