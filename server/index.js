// Express and Middleware imports
const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const cors = require("cors");
const keys = require("./config/keys");

// dB imports
const mongoose = require("mongoose");
require("./models/Playlist");
require("./models/User");

// Authentication Imports
const passport = require('passport');
require("./services/passport");

// Connection to MongoDB
mongoose.connect(keys.MONGOURI)
    .then(() => {
        console.log('Backend Started');
    })
    .catch(err => {
        console.error('Backend error:', err.stack);
        process.exit(1);
    });

// Server setup
const app = express();
const server = http.createServer(app);

// Middleware Setup
app.use("*", cors());
app.use(morgan("combined"));
app.use(bodyParser.json({}));
app.use(
    cookieSession({
        maxAge: 60 * 60 * 1000,
        keys: [keys.APP_SECRET]
    }));
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);
require("./routes/playlistRoutes")(app);

// Tell server to listen to the defined port
server.listen(5000);
console.log("Server listening on " + 5000);
