import React, { Component } from "react";
import Nav from "../components/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import Playlist from "./playlist/Playlist";
import Register from "./auth/Register";
import Landing from "./Landing";
import Login from "./auth/Login";
import About from "./About";
import { connect } from "react-redux";
import * as actions from "../actions";
import "../css/app.css";

class App extends Component {
  componentDidMount() {
    this.props.checkUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="main-content">
            <Nav />
            <Route path="/" exact component={Landing} />
            <Route path="/register" component={Register} />
            <Route path="/about" component={About} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/login" component={Login} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
