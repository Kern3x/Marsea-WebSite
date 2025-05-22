import React from 'react';
import "./pageProduct.css"
import ProductCard from "../components/ProductCard";
import ProductPageCard from "./ProductPageCard";
import marseaLine from "../components/images/marseaLine.svg";
import Header from "../components/Header";
import bar1 from "../components/images/bar1.png";
import bar2 from "../mainPage/images/detoxbar.png";
import bar3 from "../mainPage/images/sleepbar.png";
import bar4 from "../mainPage/images/focusbar.png";
const PageProduct = ({image, description, namee, price, bars, phrase, aboutProduct, lastPhrase, composition}) => {

    return (
        <>
            <Header/>


        <div className = "page_product">
            <div className = "breadcrumbs">
                <a href = "/">ГОЛОВНА</a> / {namee}
            </div>
            <div className = "product_desc">
                <ProductPageCard image={image} price={price} description={description} namee={namee}/>
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
                    <button className = "order_button">
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
        </>
    );
};

export default PageProduct;