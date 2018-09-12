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
        if (this.props.spotify.list) {
            return this.props.spotify.list.items.map(item => {
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
        return (
            <div>Nothing here</div>
        )
    };

    renderYoutube = () => {
        if (this.props.youtube.list) {
            return this.props.youtube.list.items.map(item => {
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
        return (
            <div>Loading</div>
        )
    }

    render() {
        if (!this.props.spotify || !this.props.youtube) {
            return (
                <div>
                    Add a new playlist
                </div>
            )
        }
        return (
            <div className="playlist-comp">
                <button className="service-button btn">
                    <Link to="/addservice">Add New Service</Link>
                </button>

                <div className="playlist card">
                    <ul>
                        {this.renderSpotify()}
                        {this.renderYoutube()}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({spotify, youtube, auth}) => {
    return {
        spotify,
        youtube,
        auth
    };
};
export default connect(
    mapStateToProps,
    actions
)(Playlist);