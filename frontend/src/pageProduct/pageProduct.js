import React from 'react';
import "./pageProduct.css"
import ProductCard from "../components/ProductCard";
import ProductPageCard from "./ProductPageCard";
import marseaLine from "../components/images/marseaLine.svg";
import Header from "../components/Header";
import bar1 from "../components/images/bar1.png";
import bar2 from "../mainPage/images/detoxbar.png";
import bar3 from "../mainPage/images/sleepbar.png";
import bar4 from "../mainPage/images/focusbar.png";
const PageProduct = ({image, description, namee, price}) => {
    const bars =
        [
            {
                name: "glow Bar",
                image: bar1,
                description: "— твоя шкіра, волосся та нігті скажуть: “Дякую!”",
                price: 88
            },{
            name: "detox Bar",
            image: bar2,
            description: "— перезавантаження  вашого організму.",
            price: 65
        },{
            name: "Sleep Bar",
            image: bar3,
            description: "— ніжний батончик з вишнею та мелісою для вечірнього ритуалу.",
            price: 92
        },{
            name: "focus Bar",
            image: bar4,
            description: "—пам’ять, швидкість та продуктивність.",
            price: 67
        }
        ]
    return (
        <>
            <Header/>


        <div className = "page_product">
            <div className = "breadcrumbs">
                ГОЛОВНА / glow bar
            </div>
            <div className = "product_desc">
                <ProductPageCard image={image} price={price} description={description} namee={namee}/>
                <div className = "product_desc_main">
                    <div className = "red_text">GLOW BAR</div>
                    <div className = "main_desc_product">Твоя шкіра, волосся та нігті скажуть: “Дякую!”</div>
                    <div className = "red_text">склад:</div>
                    <div className = "product_attribute">• 5 г гідролізованого колагену
                        • 2 г гіалуронової кислоти<br/>
                        • 5 г мигдальної пасти<br/>
                        • 20 г фінікової пасти<br/>
                        • 5 г какао-масла<br/>
                        • 2 г асаї (порошок)<br/>
                        • 1 г ванільного екстракту
                        <br/>
                        <br/>
                        Цей батончик — як б’юті-рутина, але смачна. Колаген підтримує еластичність шкіри, гіалуронова кислота зволожує зсередини, асаї додає антиоксидантів, а мигдальна паста й какао-масло роблять смак ніжним і кремовим. Ваніль завершує все це легким ароматом турботи про себе.
                        <br/>
                        <br/>
                        Коли хочеш сяяти — просто дістань Glow Bar.</div>
                    <button className = "order_button">
                        Замовити
                    </button>
                </div>
            </div>
            <div className = "marsea_line">
                <div className = "line_images">
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                    <img src = {marseaLine} alt = ""/>
                </div>
            </div>
            <div className = "kombucha_block">
                <div className = "kombucha_block_h1">
                    схожі товари
                </div>
                <div className = "kombucha_block_description">
                    glow.detox.sleep.focus - без цукру, без лактози, без глютену.
                    ЦЕ НЕ ПРОСТО ПЕРЕКУС - ЦЕ ТВОЯ СУПЕРСИЛА У ФОРМАТІ БАТОНЧИКА.
                </div>
                <div className="bars_block_products">

                    {bars.map((e) =>
                        <ProductCard
                            namee={e.name}
                            description={e.description}
                            image={e.image}
                            price={e.price}/>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default PageProduct;