const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passport = require('passport');
const auth = require("./routes/authRoutes");
require("./models/User");
require("./services/passport");
require("dotenv").config();

// Connection to MongoDB
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

// Server setup
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// App Setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.APP_SECRET]
    }));
app.use(passport.initialize());
app.use(passport.session());
auth(app);

// Tell server to listen to the defined port
server.listen(port);

// Console check to provide feedback to user
console.log("Server listening on " + port);
