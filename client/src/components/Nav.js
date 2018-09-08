import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../css/nav.css";

class Nav extends Component {
    renderLinks() {
        if (this.props.auth) {
            return (
                <span>
              <li className="nav-links">
                <Link to="/playlist">Playlist</Link>
              </li>
              <li className="nav-links">
                <a href={"/api/logout"}>Logout</a>
              </li>
          </span>
            );
        } else {
            return (
                <span>
              <li className="nav-links">
                <Link to="/register">Register</Link>
              </li>
              <li className="nav-links">
                <Link to="/login">Login</Link>
              </li>
          </span>
            );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="left brand-logo">OneList</Link>
                    <ul id="mobile-nav" className="right">
                        <li className="nav-links">
                            <Link to="/about">About Us</Link>
                        </li>
                        {this.renderLinks()}
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth: auth.user};
};

export default connect(mapStateToProps)(Nav);