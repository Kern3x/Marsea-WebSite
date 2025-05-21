import React from 'react';
import "./header.css"
import logo from "./images/logo.svg"
import basket from "./images/basket.svg"
const Header = () => {
    return (
        <div className = "header">
            <div>
                <a href = "/">
            <img src = {logo} alt = ""/>
                </a>
            </div>

            <div className = "main_menu_basket">
                <div className = "header_main_menu">
                    <a href="#bars">батончики</a>
                    <a href="#about">про нас</a>
                    <a href="#powder">порошки</a>
                    <a href="#showbox">шоубокс</a>
                    <a href="#set">набори</a>
                </div>
                <div>
                    <img src={basket} alt = ""/>
                </div>
            </div>
        </div>
    );
};

export default Header;