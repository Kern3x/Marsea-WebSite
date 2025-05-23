import React from 'react';
import "./productCard.css"
import bar1 from "./images/bar1.png"
import addToCart from "./images/addToCart.svg"
const ProductCard = ({image, description, namee, price, href}) => {
    return (
        <div className = "product_card">
            <div className = "add_to_cart">
                <img src = {addToCart} alt = "" onClick={() => {
                    if(localStorage.getItem("cart")){
                        let el = JSON.parse(localStorage.getItem("cart"))

                        let el1
                        /*for (let i = 0; i < el.length; i++) {
                            if (el[i].namee === namee){
                                el1 = JSON.stringify([...el,{image,namee, price, quantity: 1}])
                            }
                        }*/
                        el1 = JSON.stringify([...el,{image,namee, price, quantity: 1}])
                        localStorage.setItem("cart", el1)
                        console.log(JSON.parse(localStorage.getItem("cart")))

                    }else {
                        let el1 = JSON.stringify([{image,namee, price, quantity: 1}])
                        localStorage.setItem("cart", el1)
                        console.log(JSON.parse(localStorage.getItem("cart")))

                    }
                }}/>
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