import React from 'react';
import bar from "../components/images/bar1.png";
import kr from "../components/images/bitcoin-icons_plus-outline.svg";
import minus from "../components/images/Minus.svg";
import plus from "../components/images/Plus.svg";

const BasketElement = () => {
    return (
        <div className="basket_product">
            <div className="product_image_basket">
                <img src={bar} alt=""/>
            </div>
            <div className = "basket_details_product">
                <div className = "basket_product_name">
                    <div>
                        GLOW BAR
                    </div>
                    <div className = "kr_block">
                        <img src={kr} alt=""/>
                    </div>
                </div>
                <div className = "basket_price_quantity">
                    <div className = "basket_price">
                        88₴
                    </div>
                    <div className = "product_quantity">
                        <img src = {minus} alt = ""/>
                        <div>
                            1
                        </div>
                        <img src = {plus} alt = ""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasketElement;