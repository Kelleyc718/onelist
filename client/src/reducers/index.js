import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import auth from "./auth";
import playlist from "./playlist";

export default combineReducers({
    auth,
    play_list: playlist,
    form: formReducer
});