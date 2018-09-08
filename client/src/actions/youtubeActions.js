import axios from "axios";
import {
    FETCH_YOUTUBE_FAILURE,
    FETCH_YOUTUBE_REQUEST,
    FETCH_YOUTUBE_SUCCESS
} from './types';

/** ********************************** **/
/** ********************************** **/
/** ********      Youtube   ********** **/
/** ********      Action    ********** **/
/** ********     Creators   ********** **/
/** ********      Start     ********** **/
/** ********      Here      ********** **/
/** ********************************** **/
/** ********************************** **/

export const fetchSpotify = () => {
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
                    console.log(res.data);
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
