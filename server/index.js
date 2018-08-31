// Express and Middleware imports
const express = require("express");
const path = require("path");
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
require("./services/passport");

// Environment Variables
require("dotenv").config();

// Connection to MongoDB
mongoose.connect('mongodb://mongodb')
    .then(() => {
        console.log('Backend Started');
    })
    .catch(err => {
        console.error('Backend error:', err.stack);
        process.exit(1);
    });

// Server setup
const app = express();
const port = 6200;
const server = http.createServer(app);

// Middleware Setup
app.use("*", cors());
app.use(morgan("combined"));
app.use(bodyParser.json({}));
app.use(
    cookieSession({
        maxAge: 60 * 60 * 1000,
        keys: [process.env.APP_SECRET]
    }));
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);
require("./routes/playlistRoutes")(app);


// if (process.env.NODE_ENV === "production") {
//     // Production assets served for known express routes
//     app.use(express.static("client/build"));
//
//     // Serve Index for routes unknown to Express
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }

// Tell server to listen to the defined port
server.listen(port);
console.log("Server listening on " + port);
