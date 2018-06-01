import express from "express";
import http from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./router";
import mongoose from "mongoose";


// DB Setup
mongoose.connect("mongodb://localhost:27017/auth");
const app = express();

// App Setup
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*"}));
router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);

console.log("Server listening on " + port);