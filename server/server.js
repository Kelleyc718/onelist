import express from "express";
import http from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./router";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
// DB Setup
mongoose.connect(process.env.MONGODB_URI);
const app = express();

// App Setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Tell server to listen to the defined port
server.listen(port);

// Console check to provide feedback to user
console.log("Server listening on " + port);
