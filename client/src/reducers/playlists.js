import {PLAY_LIST_ERROR, PLAY_LISTS} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case PLAY_LISTS:
            const playlists = action.payload.data.items.map(item => item.snippet.thumbnails.default.url);
            return {...state, ...playlists};

        case PLAY_LIST_ERROR:
            return {...state, errorMessage: action.payload};
        default:
            return state;
    }
}