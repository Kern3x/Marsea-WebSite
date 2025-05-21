import React from 'react';
import addToCart from "../components/images/addToCart.svg";
import bar1 from "../components/images/bar1.png";
import "./productPageCard.css"
const ProductPageCard = ({image, description, namee, price}) => {
    return (
        <div className = "product_page_card">
            <div className = "add_to_cart">
                <img src = {addToCart} alt = ""/>
            </div>
            <div className = "product_image">
                <img src = {image} alt = ""/>
            </div>
            <div className = "product_short_info">
                <div className = "product_card_name">
                    {namee}
                </div>
                <div className = "product_card_info">
                    {description}
                </div>
            </div>
            <div className = "product_price">
                {price}₴
            </div>
        </div>
    );
};

export default ProductPageCard;