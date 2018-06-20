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
    if (this.props.playlist.lists.items) {
        return this.props.playlist.lists.items.map(item => {
            const url = `https://www.youtube.com/embed?listType=playlist&list=${item.id}&origin=http://localhost:3000/playlist`;
            return <li key={item.id}><ReactPlayer url={url}/></li>;
        });
    }
    return "Loading";
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

const mapStateToProps = ({ playlist }) => {
  return { playlist };
};
export default connect(
  mapStateToProps,
  actions
)(Playlist);
