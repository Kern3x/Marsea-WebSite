import React from 'react';
import "./mainPageStyle.css"
import main_banner from "./images/main_banner.png"
import basket from "../components/images/basket.svg";
import ProductCard from "../components/ProductCard";
import marseaLine from "../components/images/marseaLine.svg"
import logo from "../components/images/logo.svg"
import marseaPhoto from "./images/marsea_photo.png"
import beautyCat from "./images/beautyCat.svg"
import beautyLama from "./images/beautyLama.svg"
import cat_showbox from "./images/Cat_Showbox.svg"
import fish_showbox from "./images/fish_showbox.svg"
import ProductCardBig from "../components/ProductCardBig";
import Header from "../components/Header";
import bar1 from "../components/images/bar1.png";
import bar2 from "./images/detoxbar.png";
import bar3 from "./images/sleepbar.png";
import bar4 from "./images/focusbar.png";
import powder1 from "./images/powder1.png";
import powder2 from "./images/powder2.png";
import powder3 from "./images/powder3.png";
import kombucha1 from "./images/kombucha1.png";
import kombucha2 from "./images/kombucha2.png";
import kombucha3 from "./images/kombucha3.png";
import kombucha4 from "./images/kombucha4.png";
import set1 from "./images/set1.png";
import set2 from "./images/set2.png";
import set3 from "./images/set3.png";
import beautyCombo from "./images/beautyCombo.png";

const MainPage = () => {

    const bars =
        [
            {
                name: "glow Bar",
                image: bar1,
                description: "— твоя шкіра, волосся та нігті скажуть: “Дякую!”",
                price: 88,
                href: "/glowbar"
            },{
            name: "detox Bar",
            image: bar2,
            description: "— перезавантаження  вашого організму.",
            price: 65,
            href: "/detoxbar"
        },{
            name: "Sleep Bar",
            image: bar3,
            description: "— ніжний батончик з вишнею та мелісою для вечірнього ритуалу.",
            price: 92,
            href: "/sleepbar"
        },{
            name: "focus Bar",
            image: bar4,
            description: "—пам’ять, швидкість та продуктивність.",
            price: 67,
            href: "/focusbar"
        }
        ]
    const powders = [
        {
            name: "манго-банан",
            image: powder1,
            description: "— сублімірований мікс фруктів для активності та фокусу.",
            price: 214,
            href: "/powder1"
        },{
            name: "обліпиха-черешня",
            image: powder2,
            description: "— суперфруктовий мікс для сяйва зсередини.",
            price: 212,
            href: "/powder2"
        },{
            name: "ягідно-фруктовий",
            image: powder3,
            description: "— сублімований мікс для внутрішнього балансу.",
            price: 218,
            href: "/powder3"
        }
    ]
    const kombucha = [
        {
            name: "класична",
            image: kombucha1,
            description: "— коли хочеться простоти, балансу та легкого перезбору думок.",
            price: 50,
            href: "/kombucha-classic"
        },{
            name: "гранат",
            image: kombucha2,
            description: "— гранатова комбуча для моментів м’якого перезавантаження.",
            price: 50,
            href: "/kombucha-granat"
        },{
            name: "манго-ананас",
            image: kombucha3,
            description: "— як ковток тропічного сонця у розпал дня.",
            price: 50,
            href: "/kombucha-mango"
        },{
            name: "яблуко",
            image: kombucha4,
            description: "— для затишних пауз і м’якого оновлення зсередини.",
            price: 50,
            href: "/kombucha-apple"
        }
    ]
    const sets = [
        {
            name: "манго-банан (x2 в наборі)",
            image: set1,
            description: "— сублімірований мікс фруктів для активності та фокусу.",
            price: 495,
            href: "/set-mango"
        },{
            name: "обліпиха-черешня (x2 в наборі)",
            image: set2,
            description: "— суперфруктовий мікс для сяйва зсередини.",
            price: 495,
            href: "/set-cherry"
        },{
            name: "ягідно-фруктовий (x2 в наборі)",
            image: set3,
            description: "— сублімований мікс для внутрішнього балансу.",
            price: 495,
            href: "/set-fruits"
        }
    ]


    return (
        <>

            <div className="main_page">
                <div className="main_banner_block">
                    <div className="main_banner">
                        <img src={main_banner} alt=""/>
                    </div>
                    <div className="main_banner_block_info">
                        <div className="main_banner_info">
                            <div className="main_menu_basket">
                                <div className="header_main_menu">
                                    <a href="#bars">батончики</a>
                                    <a href="#about">про нас</a>
                                    <a href="#powder">порошки</a>
                                    <a href="#showbox">шоубокс</a>
                                    <a href="#set">набори</a>
                                </div>
                                <div className="basket_block">
                                    <img src={basket} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="main_info_marsea">
                            <div className="banner_h1">
                                Смак, що виводить за межі буденного
                            </div>
                            <div className="banner_description">
                                Створюємо натуральні батончики без цукру на основі сублімованих
                                фруктів. Ми віримо, що корисне може бути смачним, а здоров’я — стилем життя,
                                а не компромісом.
                            </div>
                            <button className="banner_button">
                                Замовити
                            </button>
                        </div>
                    </div>
                </div>
                <a name="bars"></a>
                <div className="bars_main_block">

                    <div className="bars_block_h1">
                        БАТОНЧИКИ
                    </div>
                    <div className="bars_block_description">
                        glow.detox.sleep.focus - без цукру, без лактози, без глютену.
                        ЦЕ НЕ ПРОСТО ПЕРЕКУС - ЦЕ ТВОЯ СУПЕРСИЛА У ФОРМАТІ БАТОНЧИКА.
                    </div>
                    <div className="bars_block_products">

                        {bars.map((e) =>
                            <ProductCard
                                namee={e.name}
                                description={e.description}
                                image={e.image}
                                price={e.price}
                                href = {e.href}
                            />
                        )}
                    </div>
                </div>
                <div className="marsea_line">
                    <div className="line_images">
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                    </div>
                    <div className="desc_marsea_line">
                        <div className="h1_marsea_line">
                            ТВІЙ ЗДОРОВИЙ РИТУАЛ У ЗРУЧНОМУ НАБОРІ
                        </div>
                        <button className="button_buy marsi">
                            Замовити
                        </button>
                    </div>
                </div>
                <a name="about"></a>
                <div className="about_marsea">
                    <div className="info_about_marsea">
                        <img src={logo} alt=""/>
                        <div className="about_marsea_text">
                            Ми — <span>MARSEA</span>. <br/>Ми створюємо не просто батончики й фрукти.
                            Ми створюємо естетику турботи про себе. Кожен продукт — це
                            маленький ритуал, який допомагає жити в балансі зі своїм тілом і бажаннями.
                        </div>
                    </div>
                    <div className="marsea_image">
                        <img src={marseaPhoto} alt=''/>
                    </div>
                </div>
                <a name="powder"></a>
                <div className="powder_block">
                    <div className="powder_block_h1">
                        порційні порошки
                    </div>
                    <div className="powder_block_description">
                        Сублімовані фрукти — максимум користі, мінімум зусиль
                        .Додавай у смузі, йогурт або воду — і отримуй результат.
                    </div>
                    <div className="powder_block_products">
                        {powders.map((e) => <ProductCard
                            namee={e.name}
                            description={e.description}
                            image={e.image}
                            price={e.price}
                            href = {e.href}
                        />)}

                    </div>
                </div>
                <div className="beauty_block">
                    <img src={beautyCat} alt="" className="beautyCat"/>
                    <img src={beautyLama} alt="" className="beautyLama"/>
                    <div className="beauty_block_h1">
                        beauty комбо
                    </div>
                    <div className="beauty_block_description">
                        Подвійна порція натуральних смаків: манго-банан,
                        ягідно-фруктовий та обліпиха-черешня — по 2 саші кожного.
                        Ідеальний мікс для краси та енергії.
                    </div>
                    <div className="beauty_block_products">
                        <ProductCard
                            namee = "BEAUTY-КОМБО"
                            description="— 2х саше манго-банан, 2х саше ягідно-фруктовий, 2х саше обліпиха-черешня"
                            price="480"
                            image={beautyCombo}
                        />
                    </div>
                </div>
                <div className="marsea_line">
                    <div className="line_images">
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                        <img src={marseaLine} alt=""/>
                    </div>
                    <div className="desc_marsea_line">
                        <div className="h1_marsea_line">
                            ТВІЙ ЗДОРОВИЙ РИТУАЛ У ЗРУЧНОМУ НАБОРІ
                        </div>
                        <button className="button_buy marsi">
                            Замовити
                        </button>
                    </div>
                </div>
                <div className="kombucha_block">
                    <div className="kombucha_block_h1">
                        комбуча
                    </div>
                    <div className="kombucha_block_description">
                        Функціональний напій, що поєднує давні традиції й сучасний ритм життя.
                        Для тих, хто обирає користь без компромісів у смаку.
                    </div>
                    <div className="kombucha_block_products">
                        {kombucha.map((e) =>
                            <ProductCard
                                namee={e.name}
                                description={e.description}
                                image={e.image}
                                price={e.price}
                                href = {e.href}
                            />
                        )}

                    </div>
                </div>
                <a name="showbox"></a>
                <div className="show_box">
                    <img src={cat_showbox} alt="" className="cat_showbox"/>
                    <img src={fish_showbox} alt="" className="fish_showbox"/>
                    <div className="show_box_h1">
                        шоубокс
                    </div>
                    <div className="show_box_description">
                        шоубокс асорті вітамінних батончиків: glow bar, detox bar, sleep bar, focus bar.
                    </div>
                    <div className="show_box_products">
                        <ProductCardBig/>


                    </div>
                </div>
                <a name="set"></a>
                <div className="set_block">
                    <div className="set_block_h1">
                        набори
                    </div>
                    <div className="set_block_description">
                        сублімовані порошки в наборі - більше, ніж просто добавка. зберігаємо смак
                        природи у великому форматі, щоб наповнювати твоє тіло корисним щодня.
                    </div>
                    <div className="set_block_products">
                        {sets.map((e) => <ProductCard
                            namee={e.name}
                            description={e.description}
                            image={e.image}
                            price={e.price}
                            href = {e.href}
                        />)}

                    </div>
                </div>
            </div>
        </>

    );
};

export default MainPage;