import axios from "axios";
import {
  CHECK_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE
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