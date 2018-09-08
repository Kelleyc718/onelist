import {
    FETCH_SPOTIFY_REQUEST,
    FETCH_SPOTIFY_SUCCESS,
    FETCH_SPOTIFY_FAILURE
} from "../actions/types";

const INITIAL_STATE = {
    lists: "",
    errorMessage: "",
    isFetching: true
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SPOTIFY_REQUEST:
            console.log("fetching the playlist requested.");
            return {...state, isFetching: true, loadingMessage: "Loading...Thank you for your patience." };

        case FETCH_SPOTIFY_SUCCESS:
            console.log("fetching the playlist succeeded.");
            return {...state, isFetching: false, lists: action.payload};

        case FETCH_SPOTIFY_FAILURE:
            console.log("fetching the playlist failed.");
            return {...state, isFetching: false, lists: "Cannot Find.", errorMessage: "Something went wrong."};
        default:
            return state;
    }
};
