import React from 'react';
import addToCart from "./images/addToCart.svg";
import bar1 from "./images/bar1.png";
import "./productCardBig.css"
import setImage from "./images/set.png"
const ProductCardBig = () => {
    return (
        <div className="product_card_big">
            <div className="add_to_cart">
                <img src={addToCart} alt=""/>
            </div>
            <div className="product_image">
                <img src={setImage} alt=""/>
            </div>
            <div className="product_short_info">
                <div className="product_card_name">
                    АСОРТІ (x2 кожного батончика)
                </div>
                <div className="product_card_info">
                    — glow bar, detox bar, sleep bar, focus bar
                </div>
            </div>
            <div className="product_price">
                740₴
            </div>
        </div>
    );
};

export default ProductCardBig;