import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import auth from "./auth";
import playlist from "./playlists";

export default combineReducers({
    auth,
    playlist,
    form: formReducer
});