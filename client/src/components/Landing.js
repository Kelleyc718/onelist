import React from "react";
import logo from "../img/logo.svg";
import "../css/landing.css";

export default Landing => {
        return (
            <div className="landing">
                <div className="image-container">

                </div>
                <div className="header">
                    <img className="logo" src={logo} alt="logo"/>
                    <div className="title">Redefine your playlist.</div>
                </div>
            </div>
        );
}


