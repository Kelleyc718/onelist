import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import Thunk from "redux-thunk";
import reducers from "./reducers/reducerIndex";
import App from "./components/App";

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(Thunk)));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
