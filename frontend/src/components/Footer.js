import React from 'react';
import "./footer.css"
import footer_logo from "./images/logo_footer.svg"
const Footer = () => {
    return (
        <div className = "footer">
            <div className = "footer_logo_menu">
                <div className = "footer_logo_block">
                    <img src = {footer_logo} alt = ""/>
                </div>
                <div className = "footer_main_menu">
                    <a href="#bars">батончики</a>
                    <a href="#about">про нас</a>
                    <a href="#powder">порошки</a>
                    <a href="#showbox">шоубокс</a>
                    <a href="#set">набори</a>
                </div>
                <div className = "society_footer">
                    <div>instagram</div>
                    <div>telegram</div>
                </div>
            </div>
            <div className = "copyright_marsea">
                ©2025, Marsea
            </div>
        </div>
    );
};

export default Footer;