import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";
import App from "./components/App";
import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Feature from "./components/Feature";
import Logout from "./components/auth/Logout";
import Login from "./components/auth/Login";


const store = createStore(
    reducers,
    {
        // Token stored in browser's local storage to give Redux state to reference after signup action
        auth: {authenticated: localStorage.getItem("token")}
    },
    applyMiddleware(thunk)
);

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route path="/" exact component={Landing}/>
                <Route path="/register" component={Register}/>
                <Route path="/feature" component={Feature}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/login" component={Login}/>
            </App>
        </BrowserRouter>
    </Provider>,
    document.querySelector("#root")
);

