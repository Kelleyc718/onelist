import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actionsIndex";
import "../../css/playlist.css";

class Playlist extends Component {
    componentDidMount () {
        this.props.fetchSpotify();
        this.props.fetchYoutube();
    }

    renderSpotify = () => {
        if (this.props.spotify.lists) {
            return this.props.spotify.lists.items.map(item => {
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

    renderYoutube = () => {
        if (this.props.youtube.lists.items) {
            return this.props.youtube.lists.items.map(item => {
                return (
                    <li key={item.snippet.title} className="playlist-items">
                        <img src={item.snippet.thumbnails.default.url} alt="Album cover" />
                        <p className="track-info">
                            placeholder
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
                    <ul>{this.renderSpotify()}</ul>
                    <ul>{this.renderYoutube()}</ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        spotify: state.spotify,
        youtube: state.youtube,
        auth: state.auth
    };
};
export default connect(
    mapStateToProps,
    actions
)(Playlist);