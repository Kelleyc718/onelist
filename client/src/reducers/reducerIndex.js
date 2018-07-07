import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import auth from "./authReducer";
import playlist from "./playlistsReducer";

export default combineReducers({
    auth,
    playlist,
    form: formReducer
});