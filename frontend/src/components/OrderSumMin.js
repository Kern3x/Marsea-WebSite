import React from 'react';
import "./order_summ.css"
import kr from "./images/bitcoin-icons_plus-outline.svg"
const OrderSumMin = ({t}) => {

    return (
        <div className = "order_summ_min" onClick={(e) => {
            e.currentTarget.classList.remove("dis_block_summ")
        }} onLoad = {(e) => {
            if (t){
            e.currentTarget.classList.add("dis_block_summ")
            }
        }}>
            <div className = "order_summ_info" onClick={(e) => {
                if (!t){
                    e.stopPropagation()
                }

            }}>
                <img src={kr} alt = "" onClick = {() => {
                    document.querySelector(".order_summ_min").classList.remove("dis_block_summ")

                }}/>
                <div className = "text_min_summ">
                    <div className = "min_summ_h1">Мінімальна сума замовлення - 200 грн.</div>
                    <div className = "min_summ_text">Будь ласка, додайте ще товари до кошика.<br/>
                        Оформлення можливе при досягенні<br/>
                        мінімальної суми!</div>
                </div>
            </div>
        </div>
    );
};

export default OrderSumMin;