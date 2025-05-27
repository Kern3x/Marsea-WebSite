import React, {useContext} from 'react';
import addToCart from "../components/images/addToCart.svg";
import bar1 from "../components/images/bar1.png";
import "./productPageCard.css"
import CartContext from "../CartContext";
const ProductPageCard = ({image, description, namee, price, href}) => {
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

    return (
        <div className = "product_page_card">
            <div className = "add_to_cart">
                <img src = {addToCart} alt = "" onClick={addToCart1}/>
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