import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import async from "./middlewares/async";
import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./components/App";



const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk, async)
);

ReactDom.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector("#root")
);

