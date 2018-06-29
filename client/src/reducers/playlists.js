import { FETCH_LIST, FETCH_LIST_ERROR } from "../actions/types";

const INITIAL_STATE = {
  lists: "",
  errorMessage: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case FETCH_LIST:
      return {...state, spotify: action.payload};
      case FETCH_LIST_ERROR:
      return {...state, errorMessage: action.payload};
    default:
      return state;
  }
};
