import React, {useState} from 'react';
import "./productCard.css"
import addToCart from "./images/addToCart.svg"
const ProductCard = ({image, description, namee, price, href, setProducts, products}) => {
    const addToCart1 = () => {
        console.log(products)
        const updatedCart = [...products];
        const index = updatedCart.findIndex(item => item.namee === namee);

        if (index !== -1) {
            updatedCart[index].quantity += 1;
        } else {
            updatedCart.push({ image, namee, price, quantity: 1 });
        }

        setProducts(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <div className = "product_card">
            <div className = "add_to_cart">
                <img src = {addToCart} alt = "" onClick={addToCart1}/>
            </div>
            <div className = "product_image">
               <a href = {href}> <img src = {image} alt = ""/></a>
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

export default ProductCard;