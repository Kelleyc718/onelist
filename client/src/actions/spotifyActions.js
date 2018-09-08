import axios from "axios";
import {
    FETCH_SPOTIFY_FAILURE,
    FETCH_SPOTIFY_REQUEST,
    FETCH_SPOTIFY_SUCCESS
} from './types';

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
