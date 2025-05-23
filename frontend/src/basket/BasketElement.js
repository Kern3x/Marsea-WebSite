import React, {useEffect, useState} from 'react';
import bar from "../components/images/bar1.png";
import kr from "../components/images/bitcoin-icons_plus-outline.svg";
import minus from "../components/images/Minus.svg";
import plus from "../components/images/Plus.svg";

const BasketElement = ({image, price, namee, setProducts, products, quantity}) => {


    const [productQuantity, setProductQuantity] = useState(quantity)
    useEffect(() => {
        setProductQuantity(quantity)
    }, [products])


    return (
        <div className="basket_product">
            <div className="product_image_basket">
                <img src={image} alt=""/>
            </div>
            <div className = "basket_details_product">
                <div className = "basket_product_name">
                    <div>
                        {namee}
                    </div>
                    <div className = "kr_block">
                        <img src={kr} alt="" onClick={() => {
                            setProducts(products.filter((el) => {
                                return el.namee !== namee
                            }))
                            }}/>
                    </div>
                </div>
                <div className = "basket_price_quantity">
                    <div className = "basket_price">
                        {price}₴
                    </div>
                    <div className = "product_quantity">
                        <img src = {minus} alt = "" onClick={() => {
                            setProductQuantity(productQuantity - 1)
                            let a = products.findIndex((e) => {
                                return e.namee === namee
                            })
                            let b = JSON.parse(localStorage.getItem("cart"))
                            b[a].quantity = productQuantity -1
                            localStorage.setItem("cart", JSON.stringify(b))
                            setProducts(JSON.parse(localStorage.getItem("cart")))
                        }}/>
                        <div>
                            {productQuantity}
                        </div>
                        <img src = {plus} alt = "" onClick={() => {
                            setProductQuantity(productQuantity + 1)
                            let a = products.findIndex((e) => {
                                return e.namee === namee
                            })
                            let b = JSON.parse(localStorage.getItem("cart"))
                            b[a].quantity = productQuantity + 1
                            localStorage.setItem("cart", JSON.stringify(b))
                            setProducts(JSON.parse(localStorage.getItem("cart")))
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasketElement;