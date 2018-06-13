import {PLAY_LIST} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case PLAY_LIST:
            return action.payload;
        default:
            return state;
    }
}