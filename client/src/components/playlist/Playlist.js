import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ReactPlayer from "react-player";
import "../../css/playlist.css";

class Playlist extends Component {
    componentDidMount() {
        this.props.fetch();
    }

    onRender() {
        if (!this.props.playlist) {
            return this.props.errorMessage;
        }
        return this.props.map(list => {
            const url = `http://youtube.com/watch?listType=playlist&list=${list.id}`;
            return (
                <li key={list.id}>
                    <ReactPlayer url={url}/>
                </li>
            );
        });
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

const mapStateToProps = ({playlist}) => {
    return { errorMessage: playlist.errorMessage };
};
export default connect(
  mapStateToProps,
  actions
)(Playlist);
