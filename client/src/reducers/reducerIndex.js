import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import auth from "./authReducer";
import youtube from "./youtubeReducer";
import spotify from "./spotifyReducer";

export default combineReducers({
    auth,
    youtube,
    spotify,
    form: formReducer
});