import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import "../css/nav.css";

class Nav extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <ul className="nav">
                    <li className="nav-links">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-links">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className="nav-links">
                        <Link to='/playlist'>Playlist</Link>
                    </li>
                    <li className="nav-links">
                        <Link to="/logout">Logout</Link>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="nav">
                    <li className="nav-links">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-links">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className="nav-links">
                        <Link to='/register'>Register</Link>
                    </li>
                    <li className="nav-links">
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            )
        }
    };

    render() {
        return (
            <div className="nav-bar">
                {this.renderLinks()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {authenticated: state.auth.authenticated}
};

export default connect(mapStateToProps)(Nav);