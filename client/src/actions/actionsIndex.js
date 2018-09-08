import axios from "axios";
import {
  CHECK_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
    FETCH_SPOTIFY_REQUEST,
    FETCH_SPOTIFY_SUCCESS,
    FETCH_SPOTIFY_FAILURE,
    FETCH_YOUTUBE_REQUEST,
    FETCH_YOUTUBE_SUCCESS,
    FETCH_YOUTUBE_FAILURE
} from "./types";

/***********************************/
/***********************************/
/* Auth Action Creators Start Here**/
/***********************************/
/***********************************/

// Check if user is logged in Action
export const checkUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/current_user");
    dispatch({
        type: CHECK_USER,
        payload: res.data
    })
  }
  catch (e) {
    console.error("whoops");
  }
};

// Registers a new user Action
export const register = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('/api/register', formProps);
    dispatch({ type: AUTH_USER_SUCCESS, payload: res.data.token });

    // Sets users token after successful signup
    // noinspection JSCheckFunctionSignatures
    localStorage.setItem("token", res.data.token);
    console.log(localStorage.getItem("token"));
    callback();
  } catch (e) {
    dispatch({ type: AUTH_USER_FAILURE, payload: "Email in use" });
  }
};

// Normal login Action for a registered user
export const login = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('/api/login', formProps);

    dispatch({ type: AUTH_USER_SUCCESS, payload: res.data.token });

    // Sets users token after successful signup
    // noinspection JSCheckFunctionSignatures
    localStorage.setItem("token", res.data.token);
    callback();
  } catch (e) {
    dispatch({
      type: AUTH_USER_FAILURE,
      payload: "Name or password was incorrect."
    });
  }
};

/** ********************************** **/
/** ********************************** **/
/** ********      Youtube   ********** **/
/** ********      Action    ********** **/
/** ********     Creators   ********** **/
/** ********      Start     ********** **/
/** ********      Here      ********** **/
/** ********************************** **/
/** ********************************** **/

export const fetchYoutube = () => {
    return async dispatch => {
        dispatch({ type: FETCH_YOUTUBE_REQUEST });
        await axios.get("/api/youtube/playlist")
            .then(res => {
                if (!res.data.items) {
                    dispatch({
                        type: FETCH_YOUTUBE_FAILURE,
                        isFetching: false,
                        errorMessage: "Could not find playlist."
                    });
                } else {
                    console.log("Youtube: " + res.data);
                    dispatch({
                        type: FETCH_YOUTUBE_SUCCESS,
                        isFetching: false,
                        payload: res.data
                    });
                }
            })
            .catch(e => {
                dispatch({
                    type: FETCH_YOUTUBE_FAILURE,
                    isFetching: false,
                    errorMessage: e + "Could not find playlist."
                });
            });
    };
};

/** ********************************** **/
/** ********************************** **/
/** ********      Spotify   ********** **/
/** ********      Action    ********** **/
/** ********     Creators   ********** **/
/** ********      Start     ********** **/
/** ********      Here      ********** **/
/** ********************************** **/
/** ********************************** **/

export const fetchSpotify = () => {
    return async dispatch => {
        dispatch({ type: FETCH_SPOTIFY_REQUEST });
        await axios.get("/api/spotify/playlist")
            .then(res => {
                if (!res.data.items) {
                    dispatch({
                        type: FETCH_SPOTIFY_FAILURE,
                        isFetching: false,
                        errorMessage: "Could not find playlist."
                    });
                } else {
                    console.log(res.data);
                    dispatch({
                        type: FETCH_SPOTIFY_SUCCESS,
                        isFetching: false,
                        payload: res.data
                    });
                }
            })
            .catch(e => {
                dispatch({
                    type: FETCH_SPOTIFY_FAILURE,
                    isFetching: false,
                    errorMessage: e + "Could not find playlist."
                });
            });
    };
};
