import React, { Component } from "react";
import * as actions from "../../actions";
import {connect} from "react-redux";
import "../../css/playlist.css";

class Playlist extends Component {
  render() {
    return (
      <div className="container">
        <div className="playlist-services">
          <ul className="service-list text-primary">
            <li className="service picker__list-item">
              <img
                className="icon"
                src={require("../../img/youtube.svg")}
                alt="Youtube Icon"
              />
              <a href="/auth/youtube">Youtube</a>
            </li>
            <li className="service picker__list-item">
              <img
                className="icon"
                src={require("../../img/spotify.svg")}
                alt="Spotify Icon"
              />
              <a href="/api/spotify">Spotify</a>
            </li>
            <li className="service picker__list-item">
              <img
                className="icon"
                src={require("../../img/pandora.svg")}
                alt="Pandora Icon"
              />
              <a href="/api/pandora">Pandora</a>
            </li>
            <li className="service picker__list-item">
              <a href="/api/iheart">iHeartRadio</a>
            </li>
          </ul>
        </div>
          <div className="card">
              Playlist
          </div>
      </div>
    );
  }
}

export default connect(null, actions)(Playlist);
