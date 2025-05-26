import React from 'react';
import "./order_summ.css"
const OrderSumMin = () => {
    return (
        <div className = "order_summ_min dis_block_summ">
            <div className = "order_summ_info">
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