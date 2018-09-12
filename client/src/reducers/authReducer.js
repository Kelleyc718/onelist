import {AUTH_USER_SUCCESS, AUTH_USER_FAILURE, CHECK_USER} from "../actions/types";

const INITIAL_STATE = {
    user: "",
    authenticated: false,
    errorMessage: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECK_USER:
            console.log("user check request in progress");
            return {...state, isFetching: true, authenticated: true, user: action.payload};
        case AUTH_USER_SUCCESS:
            console.log("the user is authorized succeeded");
            return {...state, isFetching:false, authenticated: true, user: action.payload};
        case AUTH_USER_FAILURE:
            console.log("fetching the user failed or does not have authorization.");
            return {...state, isFetching:false, authenticated: false, errorMessage: action.payload};
        default:
            return state;
    }
}