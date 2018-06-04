import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import "../css/nav.css";

class Nav extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/feature">About Us</Link>
                    <Link to="/logout">Logout</Link>
                </div>
            );
        } else {
            return (
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/feature">About Us</Link>
                    <Link to="/login">Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
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