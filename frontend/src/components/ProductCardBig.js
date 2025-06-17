import React, {useContext} from 'react';
import addToCart from "./images/addToCart.svg";
import bar1 from "./images/bar1.png";
import "./productCardBig.css"
import setImage from "./images/set.png"
import CartContext from "../CartContext";

const ProductCardBig = () => {
    const { products, setProducts } = useContext(CartContext);
    const addToCart1 = () => {
        fbq('track', 'AddToCart', {
            content_ids: ["Асорті-бокс: 10 батончиків MARSEA"],
            content_type: 'product',
            value: 740,
            currency: 'UAH'
        });
        document.querySelector(".cart_modal_h").classList.add("opacity_o")
        console.log(products)
        const updatedCart = [...products];
        const index = updatedCart.findIndex(item => item.namee === "Асорті-бокс: 10 батончиків MARSEA");

        if (index !== -1) {
            updatedCart[index].quantity += 1;
        } else {
            updatedCart.push({image:setImage, namee:"Асорті-бокс: 10 батончиків MARSEA", price: 740 , quantity: 1});
        }

        setProducts(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        if(window.innerWidth <= 768) {

            document.querySelector(".modal_cart_allscreen").classList.toggle("opacity_mob")
        }else{
            document.querySelector(".cart_modal_h").classList.add("opacity_o")

        }
    };

    return (
        <div className="product_card_big">
            <div className="add_to_cart">

                <img src={addToCart} alt="" onClick={addToCart1}/>

            </div>
            <div className="product_image">
                <a href="/showbox">
                    <img src={setImage} alt=""/>
                </a>
            </div>
            <div className="product_short_info">
                <div className="product_card_name">
                    Асорті-бокс: 10 батончиків MARSEA
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