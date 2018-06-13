import {AUTH_USER, AUTH_ERROR, CHECK_USER} from "../actions/types";

const INITIAL_STATE = {
    authenticated: "",
    errorMessage: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECK_USER:
            return action.payload || false;
        case AUTH_USER:
            return {...state, authenticated: action.payload};
        case AUTH_ERROR:
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
}