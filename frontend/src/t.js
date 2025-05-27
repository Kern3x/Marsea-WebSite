import React, {useEffect, useState} from 'react';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

const T = () => {
    const [signature, setSignature] = useState("");
    const [merchantAccount, setMerchantAccount] = useState("marsea_shop_com2")
    const [merchantDomainName, setMerchantDomainName] = useState("marsea-shop.com")
    const [rand, setRand] = useState(Math.floor(Date.now() / 1000))
    const [rand1, setRand1] = useState(Math.floor(Date.now() / 10))
    const [summ, setSumm] = useState(123.00)
    const [productNameState, setProductNameState] = useState(["focus Bar", "Sleep Bar"])
    const [productPriceState, setProductPriceState] = useState([67, 92])
    const [productCountState, setProductCountState] = useState([4, 1])
   // console.log(uniqueId)
    useEffect(() => {
        const fetchSignature = async () => {
            const res = await fetch("http://localhost:3001/generate-signature", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    merchantAccount: "marsea_shop_com2",
                    merchantDomainName: "marsea-shop.com",
                    orderReference: rand1,
                    orderDate: rand,
                    amount: summ,
                    currency: "UAH",
                    productName: productNameState,
                    productCount: productCountState,
                    productPrice: productPriceState,
                }),
            });

            const data = await res.json();
            console.log("Подпись:", data.signature);
            setSignature(data.signature);
        };

        fetchSignature();
    }, []);

    // Пока подпись не загружена — не рендерим форму
    if (!signature) return <div>Загрузка...</div>;



    return (
        <>
            <form
                method="post"
                action="https://secure.wayforpay.com/pay"
                acceptCharset="utf-8"
                className = "qwe"
            >
                <input type="hidden" name="merchantAccount" value={merchantAccount} />
                <input type="hidden" name="merchantAuthType" value="" />
                <input type="hidden" name="merchantDomainName" value={merchantDomainName} />
                <input type="hidden" name="orderReference" value={rand1} />
                <input type="hidden" name="orderDate" value={rand} />
                <input type="hidden" name="amount" value={summ} />
                <input type="hidden" name="currency" value="UAH" />
                <input type="hidden" name="orderTimeout" value="" />
                {productNameState.map((e) => <input type="hidden" name="productName[]" value={e} />)}
                {productPriceState.map((e) => <input type="hidden" name="productPrice[]" value={e} />)}
                {productCountState.map((e) => <input type="hidden" name="productCount[]" value={e} />)}
                <input type="hidden" name="clientFirstName" value="" />
                <input type="hidden" name="clientLastName" value="" />
                <input type="hidden" name="clientAddress" value="" />
                <input type="hidden" name="clientCity" value="" />
                <input type="hidden" name="clientEmail" value="" />
                <input type="hidden" name="defaultPaymentSystem" value="" />
                <input type="hidden" name="merchantSignature" value={signature} />

            </form>
            <input type="button" value="Test"  onClick={() => {
                document.querySelector(".qwe").submit()
            }}/>
        </>


    );
};

export default T;