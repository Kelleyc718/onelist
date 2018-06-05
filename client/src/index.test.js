import React from "react";
import ReactDOM from 'react-dom';
import './index';
import App from "../src/index";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App/>, div);
});