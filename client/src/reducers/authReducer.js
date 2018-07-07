import {AUTH_USER_SUCCESS, AUTH_USER_FAILURE, FETCH_USER_SUCCESS, FETCH_USER_REQUEST} from "../actions/types";

const INITIAL_STATE = {
    user: null,
    authenticated: false,
    errorMessage: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            console.log("user check request in progress");
            return {...state, isFetching: true, authenticated: false, user: action.payload};
        case FETCH_USER_SUCCESS:
            console.log("fetching the user succeeded");
            return {...state, isFetching: false, authenticated: true, user: action.payload};
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