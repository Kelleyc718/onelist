import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actionsIndex";
import "../../css/playlist.css";

class Playlist extends Component {
  componentDidMount() {
    this.props.fetchLists();
  }

  onRender() {
      return (!this.props.auth.authenticated)
          ? <div>{this.props.auth.errorMessage}</div>
          : (this.props.isFetching)
              ? <div>{this.props.loadingMessage}</div>
              : (this.props.playlist.lists)
                  ? <div>{this.props.spotify}</div>
                  : "Hi";

        // this.props.spotify.map(item => {
      //   return (
      //     <li key={item.track.id} className="playlist-items">
      //       <img src={item.track.album.images[2].url} alt="Album cover" />
      //       <p className="track-info">
      //         {item.track.artists[0].name} - {item.track.name}
      //       </p>
      //     </li>

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
  return {
    playlist: state.playlist,
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  actions
)(Playlist);
