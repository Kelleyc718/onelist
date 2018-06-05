import {PLAY_LIST, PLAY_LIST_ERROR} from "../actions/types";

const INITIAL_STATE = {
    authenticated: "",
    errorMessage: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAY_LIST:
            return {...state, authenticated: action.payload};
        case PLAY_LIST_ERROR:
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
}