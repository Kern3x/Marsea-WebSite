import React, {useContext, useEffect, useState} from 'react';
import "./mainPageStyle.css"
import "../App.css"
import main_banner from "./images/main_banner.png"
import basket from "../components/images/basket.svg";
import mob_cart from "../components/images/mob_cart.svg";
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
import BasketElement from "../basket/BasketElement";
import CartContext from "../CartContext";
import "./mainPageAdaptive.css"
import axios from "axios";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const MainPage = ({bars, powders, kombucha, sets, beautyKombo,}) => {

    const {products, setProducts} = useContext(CartContext);
    const [products1, setProducts1] = useState(0)


    useEffect(() => {

        setProducts1(products.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0))

        localStorage.setItem("cart", JSON.stringify(products))

    }, [products])
    //console.log(JSON.parse(localStorage.getItem("cart")).length)
    return (
        <>
        <div className="main">
            <div className = "modal_cart_allscreen" onClick={(e) => {
                e.currentTarget.classList.toggle("opacity_mob")
            }}>
                <div className="cart_modal_mob" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div className="cart_modal_text">Деталі замовлення</div>
                    {products.length < 1 ? <>
                            <div className="empty_cart">ТУТ ПОКИ НІЧОГО НЕМАЄ</div>
                            <hr/>
                        </> :
                        <>
                            <div className="all_products_basket">{products.map((e) =>
                                <BasketElement image={e.image} namee={e.namee} price={e.price}
                                               setProducts={setProducts} products={products}
                                               quantity={e.quantity}/>
                            )}</div>
                            <div className="summ_products">
                                <div>ВСЬОГО</div>
                                <div>{products1} грн.</div>
                            </div>
                        </>
                    }

                    <a onClick={() => {
                        products1 < 200 ? document.querySelector(".order_summ_min").classList.add("dis_block_summ") : window.location.href = "/basket"
                    }}>
                        <button className="to_cart">
                            до кошика
                        </button>
                    </a>
                    <button className="button_close_cart" onClick={() => {
                        document.querySelector(".modal_cart_allscreen").classList.toggle("opacity_mob")
                    }}>
                        закрити
                    </button>
                </div>
            </div>



            <img loading = "lazy" src={mob_cart} alt="" className = "mob_cart_btn" onClick = {() => {
                document.querySelector(".modal_cart_allscreen").classList.toggle("opacity_mob")
            }} />
            <Header setProducts={setProducts} products={products}/>
            <div className="main_page">
                <div className="main_banner_block">
                    <div className="main_banner">
                        <img loading = "lazy" src={main_banner} alt=""/>
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
                                <div className="basket_block" style={{position:"relative"}}>
                                    <a onClick={() => {
                                        document.querySelector(".cart_modal").classList.toggle("opacity_t")
                                    }}><img loading = "lazy" src={basket} alt=""/></a>
                                    <div className="cart_modal">
                                        <div className="cart_modal_text">Деталі замовлення</div>
                                        {products.length < 1 ? <>
                                                <div className="empty_cart">ТУТ ПОКИ НІЧОГО НЕМАЄ</div>
                                                <hr/>
                                            </> :
                                            <>
                                                <div className="all_products_basket">{products.map((e) =>
                                                    <BasketElement image={e.image} namee={e.namee} price={e.price}
                                                                   setProducts={setProducts} products={products}
                                                                   quantity={e.quantity}/>
                                                )}</div>
                                                <div className="summ_products">
                                                    <div>ВСЬОГО</div>
                                                    <div>{products1} грн.</div>
                                                </div>
                                            </>
                                        }

                                        <a onClick={() => {
                                            products1 < 200 ? document.querySelector(".order_summ_min").classList.add("dis_block_summ") : window.location.href = "/basket"
                                        }}>
                                            <button className="to_cart">
                                                до кошика
                                            </button>
                                        </a>
                                        <button className="button_close_cart" onClick={() => {
                                            document.querySelector(".cart_modal").classList.toggle("opacity_t")
                                        }}>
                                            закрити
                                        </button>
                                    </div>
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
                                <a onClick={() => {
                                    products1 < 200 ? document.querySelector(".order_summ_min").classList.add("dis_block_summ") : window.location.href = "/basket"
                                }}>
                                    Замовити
                                </a>
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
                    <div className="for_over">
                        {window.innerWidth > 1000 ?
                            <div className="bars_block_products">

                                {bars.map((e) =>
                                    <ProductCard
                                        namee={e.name}
                                        description={e.description}
                                        image={e.image}
                                        price={e.price}
                                        href = {e.href}
                                        setProducts={setProducts}
                                        products={products}
                                    />
                                )}
                            </div> : <Swiper
                                spaceBetween={16}
                                slidesPerView={Number(window.innerWidth/230).toFixed(2)}
                                pagination={{ clickable: true }}
                                modules={[Pagination]}
                                breakpoints={{
                                    768: { slidesPerView: 1 }, // для планшетов
                                    1024: { slidesPerView: 3 }, // для десктопа
                                }}
                            >
                                {bars.map((e, index) => (
                                    <SwiperSlide key={index}>
                                        <ProductCard
                                            namee={e.name}
                                            description={e.description}
                                            image={e.image}
                                            price={e.price}
                                            href={e.href}
                                            products={products}
                                            setProducts={setProducts}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        }
                    </div>
                </div>
                <div className="marsea_line">
                    {window.innerWidth > 1000 ?  <div className="line_images">
                        {Array.from({ length: Math.floor(window.innerWidth / 180)  }).map((_, index) => (
                            <img loading = "lazy" key={index} src={marseaLine} alt="" />
                        ))}
                    </div> : <div className = "line_images">
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                    </div>}
                    <div className="desc_marsea_line">

                        <a  onClick={() => {
                            products1 < 200 ? document.querySelector(".order_summ_min").classList.add("dis_block_summ") : window.location.href = "/basket"
                        }} className="marsi_a">
                            <button className="button_buy marsi">

                                Замовити

                            </button>
                        </a>
                    </div>
                </div>
                <a name="about"></a>
                <div className="about_marsea">
                    <div className="info_about_marsea">
                        <img loading = "lazy" src={logo} alt=""/>
                        <div className="about_marsea_text">
                            Ми — <span>MARSEA</span>. <br/>Ми створюємо не просто батончики й фрукти.
                            Ми створюємо естетику турботи про себе. Кожен продукт — це
                            маленький ритуал, який допомагає жити в балансі зі своїм тілом і бажаннями.
                        </div>
                    </div>
                    <div className="marsea_image">
                        <img loading = "lazy" src={marseaPhoto} alt=''/>
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
                    <div className="for_over">
                        {window.innerWidth > 1000 ?
                            <div className="powder_block_products">

                                {powders.map((e) => <ProductCard
                                    namee={e.name}
                                    description={e.description}
                                    image={e.image}
                                    price={e.price}
                                    href={e.href}
                                    products={products}
                                    setProducts={setProducts}
                                />)}
                            </div> : <Swiper
                                spaceBetween={16}
                                slidesPerView={Number(window.innerWidth/230).toFixed(2)}
                                pagination={{ clickable: true }}
                                modules={[Pagination]}
                                breakpoints={{
                                    768: { slidesPerView: 1 }, // для планшетов
                                    1024: { slidesPerView: 3 }, // для десктопа
                                }}
                            >
                                {powders.map((e, index) => (
                                    <SwiperSlide key={index}>
                                        <ProductCard
                                            namee={e.name}
                                            description={e.description}
                                            image={e.image}
                                            price={e.price}
                                            href={e.href}
                                            products={products}
                                            setProducts={setProducts}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        }

                    </div>
                </div>
                <a name="beautycombo"></a>
                <div className="beauty_block">
                    <img loading = "lazy" src={beautyCat} alt="" className="beautyCat"/>
                    <img loading = "lazy" src={beautyLama} alt="" className="beautyLama"/>
                    <div className="beauty_block_h1">
                        beauty комбо
                    </div>
                    <div className="beauty_block_description">
                        Подвійна порція натуральних смаків: манго-банан,
                        ягідно-фруктовий та обліпиха-черешня — по 2 саше кожного.
                        Ідеальний мікс для краси та енергії.
                    </div>
                    <div className="beauty_block_products">

                        {beautyKombo.map((e) => <ProductCard
                            namee={e.name}
                            description={e.description}
                            image={e.image}
                            price={e.price}
                            href={e.href}
                            products={products}
                            setProducts={setProducts}
                        />)}
                    </div>
                </div>
                <div className="marsea_line">
                    {window.innerWidth > 1000 ?  <div className="line_images">
                        {Array.from({ length: Math.floor(window.innerWidth / 180)  }).map((_, index) => (
                            <img loading = "lazy" key={index} src={marseaLine} alt="" />
                        ))}
                    </div> : <div className = "line_images">
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                        <img loading = "lazy" src = {marseaLine} alt = ""/>
                    </div>}
                    <div className="desc_marsea_line">
                        <div className="h1_marsea_line">
                            ТВІЙ ЗДОРОВИЙ РИТУАЛ У ЗРУЧНОМУ НАБОРІ
                        </div>
                        <a  onClick={() => {
                            products1 < 200 ? document.querySelector(".order_summ_min").classList.add("dis_block_summ") : window.location.href = "/basket"
                        }} className="marsi_a">
                            <button className="button_buy marsi">

                                Замовити

                            </button>
                        </a>
                    </div>
                </div>
                <a name="kombucha"></a>
                <div className="kombucha_block">
                    <div className="kombucha_block_h1">
                        комбуча
                    </div>
                    <div className="kombucha_block_description">
                        Функціональний напій, що поєднує давні традиції й сучасний ритм життя.
                        Для тих, хто обирає користь без компромісів у смаку.
                    </div>
                    <div className="for_over">
                        {window.innerWidth > 1000 ?
                            <div className="kombucha_block_products">

                                {kombucha.map((e) =>
                                    <ProductCard
                                        namee={e.name}
                                        description={e.description}
                                        image={e.image}
                                        price={e.price}
                                        href={e.href}
                                        products={products}
                                        setProducts={setProducts}
                                    />
                                )}
                            </div> : <Swiper
                                spaceBetween={16}
                                slidesPerView={Number(window.innerWidth/230).toFixed(2)}
                                pagination={{ clickable: true }}
                                modules={[Pagination]}
                                breakpoints={{
                                    768: { slidesPerView: 1 }, // для планшетов
                                    1024: { slidesPerView: 3 }, // для десктопа
                                }}
                            >
                                {kombucha.map((e, index) => (
                                    <SwiperSlide key={index}>
                                        <ProductCard
                                            namee={e.name}
                                            description={e.description}
                                            image={e.image}
                                            price={e.price}
                                            href={e.href}
                                            products={products}
                                            setProducts={setProducts}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        }

                    </div>
                </div>
                <a name="showbox"></a>
                <div className="show_box">
                    <img loading = "lazy" src={cat_showbox} alt="" className="cat_showbox"/>
                    <img loading = "lazy" src={fish_showbox} alt="" className="fish_showbox"/>
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
                    <div className="for_over">
                        {window.innerWidth > 767 ?
                            <div className="set_block_products">

                                {sets.map((e) =>
                                    <ProductCard
                                        namee={e.name}
                                        description={e.description}
                                        image={e.image}
                                        price={e.price}
                                        href={e.href}
                                        products={products}
                                        setProducts={setProducts}
                                    />
                                )}
                            </div> : <Swiper
                                spaceBetween={16}
                                slidesPerView={Number(window.innerWidth/230).toFixed(2)}
                                pagination={{ clickable: true }}
                                modules={[Pagination]}
                                breakpoints={{
                                    768: { slidesPerView: 1 }, // для планшетов
                                    1024: { slidesPerView: 3 }, // для десктопа
                                }}
                            >
                                {sets.map((e, index) => (
                                    <SwiperSlide key={index}>
                                        <ProductCard
                                            namee={e.name}
                                            description={e.description}
                                            image={e.image}
                                            price={e.price}
                                            href={e.href}
                                            products={products}
                                            setProducts={setProducts}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        }

                    </div>
                </div>
            </div>

        </div>

            <Footer /></>
    );
};

export default MainPage;