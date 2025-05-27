import './App.css';
import {data, href, Route, Routes} from "react-router-dom";
import CartContext from "./CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./mainPage/mainPage";
import PageProduct from "./pageProduct/pageProduct";
import Basket from "./basket/Basket";
import sImage1 from "./components/images/set.png"
import bar1 from "./components/images/bar1.png";
import bar2 from "./mainPage/images/detoxbar.png";
import bar3 from "./mainPage/images/sleepbar.png";
import bar4 from "./mainPage/images/focusbar.png";
import powder1 from "./mainPage/images/powder1.png";
import powder2 from "./mainPage/images/powder2.png";
import powder3 from "./mainPage/images/powder3.png";
import kombucha1 from "./mainPage/images/kombucha1.png";
import kombucha2 from "./mainPage/images/kombucha2.png";
import kombucha3 from "./mainPage/images/kombucha3.png";
import kombucha4 from "./mainPage/images/kombucha4.png";
import set1 from "./mainPage/images/set1.png";
import set2 from "./mainPage/images/set2.png";
import set3 from "./mainPage/images/set3.png";
import beautyCombo from "./mainPage/images/beautyCombo.png";
import inst_mobile from "./components/images/inst_mob_menu.svg"
import tg_mobile from "./components/images/tg_mob_menu.svg"
import fish_mobile from "./components/images/fish_mob_menu.svg"
import cat_mobile from "./components/images/cat_mobile.svg"
import React, {useEffect, useState} from "react";
import axios from "axios";
import ThankYouPage from "./components/ThankYouPage";
import OrderSumMin from "./components/OrderSumMin";
import T from "./t";

function App() {
    const bars =
        [
            {
                name: "glow Bar",
                image: bar1,
                description: "— твоя шкіра, волосся та нігті скажуть: “Дякую!”",
                price: 88,
                href: "/glowbar",
                phrase: "Твоя шкіра, волосся та нігті скажуть: “Дякую!”",
                composition: ["5 г гідролізованого колагену", "2г гіалуронової кислоти", "5 г мигдальної пасти", "20 г фінікової пасти", "5 г какао-масла", "2 г асаї (порошок)", "1 г ванільного екстракту"],
                aboutProduct: ["Цей батончик — як б’юті-рутина, але смачна.", "Колаген підтримує еластичність шкіри, гіалуронова кислота зволожує зсередини, асаї додає антиоксидантів, а мигдальна паста й какао-масло роблять смак ніжним і кремовим. Ваніль завершує все це легким ароматом турботи про себе."],
                lastPhrase: "Коли хочеш сяяти — просто дістань Glow Bar."
            }, {
            name: "detox Bar",
            image: bar2,
            description: "— перезавантаження  вашого організму.",
            price: 65,
            href: "/detoxbar",
            phrase: "Перезавантаження організму.",
            composition: ["Фінікова паста", "Насіння гарбуза", "Інулін", "Спіруліна", "Чіа"],
            aboutProduct: ["Це твоя кнопка RESET у форматі перекусу.", "Спіруліна та інулін допомагають м’яко очистити організм, підтримати мікрофлору й зарядити клітини."],
            lastPhrase: "Легка текстура, натуральний смак і робота зсередини."
        }, {
            name: "Sleep Bar",
            image: bar3,
            description: "— ніжний батончик з вишнею та мелісою для вечірнього ритуалу.",
            price: 92,
            href: "/sleepbar",
            phrase: "Заспокой себе. Без слів.",
            composition: ["Фінікова паста", "Насіння гарбуза", "Інулін", "Магній", "Мелатонін"],
            aboutProduct: ["Цей батончик — як м’яка ковдра для нервової системи.", "Магній розслабляє м’язи, мелатонін допомагає налаштуватися на здоровий сон, інулін — підтримує кишечник, бо здоровий сон починається зсередини."],
            lastPhrase: "Фінікова паста й гарбузове насіння додають приємного смаку вечору."
        }, {
            name: "focus Bar",
            image: bar4,
            description: "—пам’ять, швидкість та продуктивність.",
            price: 67,
            href: "/focusbar",
            phrase: "Пам’ять. Швидкість. Продуктивність.",
            composition: ["Фінікова паста", "Насіння гарбуза", "Інулін", "Сімбіотик (лактобацили + біфідобактерії)", "Лецитин", "Цитиколін"],
            aboutProduct: ["Це не просто батончик — це твій мозковий апгрейд.", "Цитиколін — для концентрації, лецитин — для пам’яті, симбіотик — для балансу кишківника, бо ясна голова починається зі здорового травлення."],
            lastPhrase: "Смак фініків і гарбузового насіння, який працює на тебе, коли треба зловити фокус і бути в потоці."
        }
        ]
    const powders = [
        {
            name: "манго-банан",
            image: powder1,
            description: "— сублімірований мікс фруктів для активності та фокусу.",
            price: 214,
            href: "/powder1",
            phrase: "Сублімований мікс для активності та фокусу.",
            composition: ["Манго", "Банан", "Полуниця", "Лимон", "Яблуко"],
            aboutProduct: ["Це твій енергетичний заряд в одному пакеті.", "Манго та банан — для природної солодкості та тропічного вайбу.", "Полуниця — щоб смак був насичений.", "Лимон — для легкого цитрусового балансу.", "Яблуко — як база, яка гармонізує все."],
            lastPhrase: "Ідеально додати в смузі, йогурт, кашу або навіть просто в воду для яскравого смаку і легкого підняття тонусу."

        }, {
            name: "обліпиха-черешня",
            image: powder2,
            description: "— суперфруктовий мікс для сяйва зсередини.",
            price: 212,
            href: "/powder2",
            phrase: "Суперфруктовий мікс для сяйва зсередини.",
            composition: ["Обліпиха", "Черешня", "Полуниця", "Ківі", "Ананас"],
            aboutProduct: ["Це вітамінна бомба для шкіри, настрою та імунітету.", "Обліпиха — джерело омега-кислот і сяйва.", "Черешня та полуниця — для ніжного фруктового смаку.", "Ківі — для балансу кислинки.", "Ананас — додає тропічну нотку і підтримує травлення."],
            lastPhrase: "Додавай у чай, десерти, каші, йогурти або просто розмішуй у воді. Один пакет — один крок до свого glow."

        }, {
            name: "ягідно-фруктовий",
            image: powder3,
            description: "— сублімований мікс для внутрішнього балансу.",
            price: 218,
            href: "/powder3",
            phrase: "Сублімований мікс для внутрішнього балансу.",
            composition: ["Лохина", "Малина", "Черешня", "Ківі", "Яблуко"],
            aboutProduct: ["е мікс, що працює на твою красу зсередини.", "Лохина та малина — антиоксиданти, які підтримують шкіру та клітини.", "Черешня — для настрою та ніжного смаку.", "Ківі — додасть легку кислинку та вітамінний boost.", "Яблуко — м’яко поєднує всі смаки."],
            lastPhrase: "Ідеально для смузі, каш, десертів або як корисний підсолоджувач у воду."

        }
    ]
    const kombucha = [
        {
            name: "класична",
            image: kombucha1,
            description: "— коли хочеться простоти, балансу та легкого перезбору думок.",
            price: 50,
            href: "/kombucha-classic",
            phrase: ".Пам’ять. Швидкість. Продуктивність.",
            composition: ["вода підготовлена", "купаж відібраних сортів чаю (Mix)", "інвертований цукровий сироп", "культура чайного гриба — Scoby"],
            aboutProduct: ["Має авторський смак, підтримує роботу шлунково-кишкового тракту та зміцнює імунну систему."],
            lastPhrase: ""

        }, {
            name: "гранат",
            image: kombucha2,
            description: "— гранатова комбуча для моментів м’якого перезавантаження.",
            price: 50,
            href: "/kombucha-granat",
            phrase: "Працює на підтримку імунітету та травлення.",
            composition: ["вода підготовлена", "купаж відібраних сортів чаю (Mix)", "інвертований цукровий сироп", "плоди граната", "культура чайного гриба — Scoby"],
            aboutProduct: ["Живий напій із гранатовим післясмаком. Працює на підтримку імунітету та травлення."],
            lastPhrase: ""

        }, {
            name: "манго-ананас",
            image: kombucha3,
            description: "— як ковток тропічного сонця у розпал дня.",
            price: 50,
            href: "/kombucha-mango",
            phrase: "Допомагає травленню та підтримує баланс.",
            composition: ["вода підготовлена", "купаж відібраних сортів чаю (Mix)", "інвертований цукровий сироп", "пюре манго", "культура чайного гриба — Scoby"],
            aboutProduct: ["Тропічна хвиля для твого настрою та шлунка. Допомагає травленню та підтримує баланс."],
            lastPhrase: ""

        }, {
            name: "яблуко",
            image: kombucha4,
            description: "— для затишних пауз і м’якого оновлення зсередини.",
            price: 50,
            href: "/kombucha-apple",
            phrase: "Пам’ять. Швидкість. Продуктивність.",
            composition: ["вода підготовлена", "купаж відібраних сортів чаю (Mix)", "інвертований цукровий сироп", "фрукти: яблуко", "культура чайного гриба — Scoby"],
            aboutProduct: ["Освіжає, нормалізує мікрофлору та додає легкості."],
            lastPhrase: ""

        }
    ]

    const sets = [
        {
            name: "манго-банан (x2 в наборі)",
            image: set1,
            description: "— сублімірований мікс фруктів для активності та фокусу.",
            price: 495,
            href: "/set-mango",
            phrase: "Пам’ять. Швидкість. Продуктивність.",
            composition: ["Фінікова паста", "Насіння гарбуза", "Інулін", "Сімбіотик (лактобацили + біфідобактерії)", "Лецитин", "Цитиколін"],
            aboutProduct: ["Це не просто батончик — це твій мозковий апгрейд.", "Цитиколін — для концентрації, лецитин — для пам’яті, симбіотик — для балансу кишківника, бо ясна голова починається зі здорового травлення."],
            lastPhrase: "Смак фініків і гарбузового насіння, який працює на тебе, коли треба зловити фокус і бути в потоці."

        }, {
            name: "обліпиха-черешня (x2 в наборі)",
            image: set2,
            description: "— суперфруктовий мікс для сяйва зсередини.",
            price: 495,
            href: "/set-cherry",
            phrase: "Пам’ять. Швидкість. Продуктивність.",
            composition: ["Фінікова паста", "Насіння гарбуза", "Інулін", "Сімбіотик (лактобацили + біфідобактерії)", "Лецитин", "Цитиколін"],
            aboutProduct: ["Це не просто батончик — це твій мозковий апгрейд.", "Цитиколін — для концентрації, лецитин — для пам’яті, симбіотик — для балансу кишківника, бо ясна голова починається зі здорового травлення."],
            lastPhrase: "Смак фініків і гарбузового насіння, який працює на тебе, коли треба зловити фокус і бути в потоці."

        }, {
            name: "ягідно-фруктовий (x2 в наборі)",
            image: set3,
            description: "— сублімований мікс для внутрішнього балансу.",
            price: 495,
            href: "/set-fruits",
            phrase: "Пам’ять. Швидкість. Продуктивність.",
            composition: ["Фінікова паста", "Насіння гарбуза", "Інулін", "Сімбіотик (лактобацили + біфідобактерії)", "Лецитин", "Цитиколін"],
            aboutProduct: ["Це не просто батончик — це твій мозковий апгрейд.", "Цитиколін — для концентрації, лецитин — для пам’яті, симбіотик — для балансу кишківника, бо ясна голова починається зі здорового травлення."],
            lastPhrase: "Смак фініків і гарбузового насіння, який працює на тебе, коли треба зловити фокус і бути в потоці."

        }
    ]
    const beautyKombo = [{
        name: "BEAUTY-КОМБО",
        description: "— 2х саше манго-банан, 2х саше ягідно-фруктовий, 2х саше обліпиха-черешня",
        price: "480",
        image: beautyCombo,
        href: "/beauty-combo",
        phrase: "Пам’ять. Швидкість. Продуктивність.",
        composition: ["Фінікова паста", "Насіння гарбуза", "Інулін", "Сімбіотик (лактобацили + біфідобактерії)", "Лецитин", "Цитиколін"],
        aboutProduct: ["Це не просто батончик — це твій мозковий апгрейд.", "Цитиколін — для концентрації, лецитин — для пам’яті, симбіотик — для балансу кишківника, бо ясна голова починається зі здорового травлення."],
        lastPhrase: "Смак фініків і гарбузового насіння, який працює на тебе, коли треба зловити фокус і бути в потоці."

    }]
    const showbox = [{
        name: "Асорті-бокс: 10 батончиків MARSEA",
        description: " — glow bar, detox bar, sleep bar, focus bar",
        price: "740",
        image: sImage1,
        href: "/showbox",
        phrase: "",
        composition: ["3 × Focus Bar — пам’ять, швидкість, продуктивність", "3 × Glow Bar — сяйво шкіри зсередини", "2 × Sleep Bar — м’який вечірній ритуал", "2 × Detox Bar — перезавантаження організму"],
        aboutProduct: ["Усі смаки в одному боксі", "Вигідніше, ніж купувати окремо", "Суперзручність і економія"],
        lastPhrase: ""

    }]
    const pages = [...bars, ...powders, ...kombucha, ...sets, ...beautyKombo, ...showbox]
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });




// Пример использования в функции order_process или при клике на кнопку

    return (
        <div className="App">


            {window.innerWidth <= 768 ?
                <div className="mobile_menu start_pos_mob_menu">
                   <a href = "/#bars" onClick={() => {
                       document.querySelector(".mobile_menu").classList.toggle("start_pos_mob_menu")
                   }}><div>БАТОНЧИКИ</div></a>
                    <a href = "/#about" onClick={() => {
                        document.querySelector(".mobile_menu").classList.toggle("start_pos_mob_menu")
                    }}><div>ПРО НАС</div></a>
                    <a href = "/#powder" onClick={() => {
                        document.querySelector(".mobile_menu").classList.toggle("start_pos_mob_menu")
                    }}><div>ПОРОШКИ</div></a>
                    <a href = "/#beautycombo" onClick={() => {
                        document.querySelector(".mobile_menu").classList.toggle("start_pos_mob_menu")
                    }}><div>BEAUTY комбо</div></a>
                    <a href = "/#showbox" onClick={() => {
                        document.querySelector(".mobile_menu").classList.toggle("start_pos_mob_menu")
                    }}><div>ШОУБОКС</div></a>
                    <a href = "/#kombucha" onClick={() => {
                        document.querySelector(".mobile_menu").classList.toggle("start_pos_mob_menu")
                    }}><div>КОМБУЧА</div></a>
                    <a href = "/#set" onClick={() => {
                        document.querySelector(".mobile_menu").classList.toggle("start_pos_mob_menu")
                    }}><div>НАБОРИ</div></a>
                    <div className = "society_mob_menu">
                        <img src={inst_mobile} alt = ""/>
                        <img src={tg_mobile} alt = ""/>
                    </div>
                    <img src={fish_mobile} alt = "" className = "fish_mobile_menu"/>
                    <img src={cat_mobile} alt = "" className = "cat_mobile_menu"/>

                </div>
                : ""}
            <CartContext.Provider value={{products, setProducts}}>
                <OrderSumMin/>
                <Routes>
                    {pages.map((e) => <Route path={e.href} element={<PageProduct price={e.price} image={e.image}
                                                                                 description={e.description}
                                                                                 namee={e.name} bars={bars}
                                                                                 phrase={e.phrase}
                                                                                 composition={e.composition}
                                                                                 aboutProduct={e.aboutProduct}
                                                                                 lastPhrase={e.lastPhrase}
                                                                                 products={products}
                                                                                 setProducts={setProducts}/>}/>
                    )}
                    <Route index path="/"
                           element={<MainPage bars={bars} kombucha={kombucha} powders={powders} sets={sets}
                                              beautyKombo={beautyKombo}/>}/>
                    <Route path="/basket" element={<Basket bars={bars}/>}/>
                    <Route path="/t" element={<T/>}/>
                    <Route path="/thankyou" element={<ThankYouPage bars={bars}/>}/>
                </Routes>

            </CartContext.Provider>
        </div>
    );
}

export default App;
