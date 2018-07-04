import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "../../css/playlist.css";

class Playlist extends Component {
  componentDidMount() {
      this.props.fetch();
  }

  onRender() {
    if (!this.props.spotify) {
      return this.props.errorMessage;
    } else {
      return this.props.spotify.items.map(item => {
        return (
          <li key={item.track.id} className="playlist-items">
            <img src={item.track.album.images[2].url} alt="Album cover" />
            <p className="track-info">
              {item.track.artists[0].name} - {item.track.name}
            </p>
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div className="playlist-comp">
        <button className="service-button btn">
          <Link to="/addservice">Add New Service</Link>
        </button>

        <div className="playlist card">
          <ul>{this.onRender()}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.playlist;
};
export default connect(
  mapStateToProps,
  actions
)(Playlist);
