import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../actions";

class Playlist extends Component {
    renderPlaylists() {
        if (!this.props.authenticated) {
            return (
                <div className="error">
                    {this.props.history.push("/login")};
                </div>
            )
        } else if (this.props.authenticated && this.props.services) {
            return (
                <div>Here is your playlist</div>
            )
        } else {
            return (
                <div>You don't has any playlists</div>
            )
        }
    }


    render() {
        console.log("You made it to the playlist");
        return (
            <div className="container">
                <div className="playlist">
                    {this.renderPlaylists()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, actions)(Playlist);