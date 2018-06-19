// Express and Middleware imports
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const cors = require("cors");

// dB imports
const mongoose = require("mongoose");
require("./models/Playlist");
require("./models/User");

// Authentication Imports
const passport = require('passport');
const auth = require("./routes/authRoutes");
const play = require("./routes/playlistRoutes");
require("./services/passport");

// Environment Variables
require("dotenv").config();

// Connection to MongoDB
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

// Server setup
const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

// Middleware Setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.APP_SECRET]
    }));
app.use(passport.initialize());
app.use(passport.session());
auth(app);
play(app);


// Tell server to listen to the defined port
server.listen(port);
console.log("Server listening on " + port);
