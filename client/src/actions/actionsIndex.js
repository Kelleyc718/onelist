import axios from "axios";
import {
  FETCH_LIST_FAILURE,
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE
} from "./types";

/***********************************/
/***********************************/
/* Auth Action Creators Start Here*/
/***********************************/
/***********************************/

// Check if user is logged in Action
export const fetchUser = () => {
  return async dispatch => {
    dispatch({ type: FETCH_USER_REQUEST, authenticated: false, user: null });
    await axios.get('/api/current_user').then(res => {
      if (res.data) {
        dispatch({
          type: FETCH_USER_SUCCESS,
          authenticated: true,
          payload: res.data
        });
      } else {
        dispatch({
          type: AUTH_USER_FAILURE,
          authenticated: false,
          payload: "Must be signed in to access this."
        });
      }
    });
  };
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

/***************************************/
/***************************************/
/* Playlist Action Creators Start Here*/
/***************************************/
/***************************************/

export const fetchLists = () => {
  return async dispatch => {
    dispatch({ type: FETCH_LIST_REQUEST });
    await axios.get("/api/spotify/playlist")
      .then(res => {
        if (!res.data.items) {
          dispatch({
            type: FETCH_LIST_FAILURE,
            isFetching: false,
            errorMessage: "Could not find playlist."
          });
        } else {
            dispatch({
                type: FETCH_LIST_SUCCESS,
                isFetching: false,
                payload: res.data
            });
        }
      })
      .catch(e => {
        dispatch({
          type: FETCH_LIST_FAILURE,
          isFetching: false,
          errorMessage: e + "Could not find playlist."
        });
      });
  };
};
