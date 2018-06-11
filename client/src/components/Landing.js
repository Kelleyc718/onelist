import React, {Component} from 'react';
import logo from "../img/logo.svg";
import "../css/landing.css";

export default class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <img className="logo" src={logo} alt="logo"/>
                <div className="title">
                    Redefine your playlist.
                </div>
            </div>
        );
    }
}