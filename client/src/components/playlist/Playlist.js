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
        console.log(this.props.spotify);
        if (!this.props.spotify) {
            return this.props.errorMessage;
        }
        return this.props.spotify.items.map(item => {
            return <li key={item.track.id}>{item.track.name}</li>
        })
    }


  render() {
    return (
      <div className="container">
        <button>
          <Link to="/addservice">Add New Service</Link>
        </button>

        <div className="playlist card">
          <ul>{this.onRender()}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return state.playlist;
};
export default connect(
  mapStateToProps,
  actions
)(Playlist);
