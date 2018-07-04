import {CHECK_USER, AUTH_USER, AUTH_ERROR, FETCH_LIST, FETCH_LIST_ERROR} from "./types";
import axios from "axios";

export const checkUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/current_user");
    dispatch({ type: CHECK_USER, payload: res.data });
  } catch (e) {
      console.error(e);
  }
};

export const register = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post("/api/register", formProps);
    dispatch({ type: AUTH_USER, payload: res.data.token });

    // Sets users token after successful signup
    // noinspection JSCheckFunctionSignatures
    localStorage.setItem("token", res.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const login = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post("/api/login", formProps);

    dispatch({ type: AUTH_USER, payload: res.data.token });

    // Sets users token after successful signup
    // noinspection JSCheckFunctionSignatures
    localStorage.setItem("token", res.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Name or password was incorrect." });
  }
};

export const fetch = () => async dispatch => {
    try {
        const res = await axios.get("/api/spotify/playlist");
        dispatch({type: FETCH_LIST, payload: res.data})
    } catch (e) {
        dispatch({type: FETCH_LIST_ERROR, payload: "Could not find playlist."})
    }
};
