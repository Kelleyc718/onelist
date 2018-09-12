import {
    FETCH_YOUTUBE_SUCCESS,
    FETCH_YOUTUBE_REQUEST,
    FETCH_YOUTUBE_FAILURE
} from "../actions/types";

const INITIAL_STATE = {
  list: "",
  errorMessage: "",
  isFetching: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case FETCH_YOUTUBE_REQUEST:
          console.log("fetching the playlist requested.");
          return {...state, isFetching: true, loadingMessage: "Loading...Thank you for your patience." };

      case FETCH_YOUTUBE_SUCCESS:
          console.log("fetching the playlist succeeded.");
          return {...state, isFetching: false, list: action.payload};

      case FETCH_YOUTUBE_FAILURE:
          console.log("fetching the playlist failed.");
          return {...state, isFetching: false, list: "Cannot Find.", errorMessage: "Something went wrong."};

    default:
      return state;
  }
};
