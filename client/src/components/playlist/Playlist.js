import React, {Component} from "react";
import requireAuth from "../../components/auth/requireAuth";

class Playlist extends Component {
    render() {
        return (
            <div className="playlist">
                <h1 className="current-playlist">nada</h1>
            </div>
        );
    }
};

export default requireAuth(Playlist);
