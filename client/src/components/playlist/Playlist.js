import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actionsIndex";
import "../../css/playlist.css";

class Playlist extends Component {
  onRender() {
    if (this.props.playlist.isFetching) {
      return <div>{this.props.playlist.loadingMessage}</div>;
    }

    if (this.props.playlist.lists) {
      return this.props.playlist.lists.items.map(item => {
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
    if (!this.props.auth.authenticated) {
      return (
        <div className="playlist-comp">
          <div className="playlist card">
            <h4 className="error-text">{this.props.auth.errorMessage}</h4>
          </div>
        </div>
      );
    }
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
  return {
    playlist: state.playlist,
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  actions
)(Playlist);
