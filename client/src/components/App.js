import React from "react";
import Nav from "../components/Nav";
import "../css/app.css";

export default ({children}) => {
    return (
        <div className="main-content">
            <Nav/>
            {children}
        </div>
    );
}