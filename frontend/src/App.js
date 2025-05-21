import './App.css';
import {href, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./mainPage/mainPage";
import PageProduct from "./pageProduct/pageProduct";
import Basket from "./basket/Basket";
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

function App() {
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
    const pages = [...bars, ...powders, ...kombucha, ...sets]
    return (
        <div className="App">

            <Routes>
                {pages.map((e) => <Route path={e.href} element={<PageProduct price={e.price} image={e.image} description={e.description} namee={e.name}/>}/>
                )}
                <Route index path="/" element={<MainPage/>}/>
                <Route path="/basket" element={<Basket/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
