import {
  CHECK_USER,
  AUTH_USER,
  AUTH_ERROR,
  PLAY_LIST
} from "./types";
import axios from "axios";

export const checkUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/current_user");
    dispatch({ type: CHECK_USER, payload: res.data });
  } catch (e) {
    console.log("Login");
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

export const playlist = () => async dispatch => {
    const youtubeApi = 'https://www.googleapis.com/auth/youtube';
  try {
    const res = await axios.get(youtubeApi);
    console.log(res);

    dispatch({ type: PLAY_LIST, payload: res.data });
  } catch (e) {
      console.log("cannot find");
  }
};
