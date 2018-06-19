import React, { Component } from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "../../css/playlist.css";

class Playlist extends Component {
    renderPlaylists() {
        return this.props.playlists;
    }

  render() {
    return (
      <div className="container">
          <button>
              <Link to="/addservice">
              Add New Service
              </Link>
          </button>

        <div className="playlist card">
            {this.renderPlaylists()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {playlists: state.playlists};
};

export default connect(mapStateToProps, actions)(Playlist);
