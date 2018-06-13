import React from "react";
import logo from "../img/logo.svg";
import "../css/landing.css";

const Landing = () => {
  return (
    <div className="landing">
      <img className="logo" src={logo} alt="logo" />
      <div className="title">Redefine your playlist.</div>
    </div>
  );
};

export default Landing;
