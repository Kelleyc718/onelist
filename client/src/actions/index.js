import {AUTH_USER, AUTH_ERROR} from "./types";
import axios from "axios";

export const register= (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post("http://localhost:3000/register", formProps);

        dispatch({type: AUTH_USER, payload: response.data.token});

        // Sets users token after successful signup
        localStorage.setItem("token", response.data.token);
        callback();
    } catch (e) {
        dispatch({type: AUTH_ERROR, payload: "Email in use"})
    }
};

export const login = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post("http://localhost:3000/login", formProps);

        dispatch({type: AUTH_USER, payload: response.data.token});

        // Sets users token after successful signup
        localStorage.setItem("token", response.data.token);
        callback();
    } catch (e) {
        dispatch({type: AUTH_ERROR, payload: "Name or password was incorrect."})
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    return {
        type: AUTH_USER,
        payload: ""
    };
};