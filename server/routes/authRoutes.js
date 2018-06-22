"use strict";
const Authentication = require("../middlewares/authentication");
const passport = require("passport");
require("../services/passport");
require("../services/google-passport");
require("../services/youtube-passport");
require("../services/spotify-passport");
require("dotenv").config();

// Constants defined to protect routes
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });
const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"]
});

const youtubeAuth = passport.authenticate("youtube", {
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/youtube"]
});

const spotifyAuth = passport.authenticate("spotify", {
  scope: ["user-read-email", "user-read-private"]
});

// Routes used on server side for API
module.exports = app => {
  //Spotify passport rules
  app.get("/auth/spotify", spotifyAuth);
    app.get('/auth/spotify/callback', spotifyAuth,
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

  // Google passport rules
  app.get("/auth/google", googleAuth);

  //Callback request to receive the token exchange
  app.get("/auth/google/callback", googleAuth, (req, res) => {
    res.redirect("/playlist");
  });

  // Test Route
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  // Youtube Auth Routes
  app.get("/auth/youtube", youtubeAuth);
  app.get("/auth/youtube/callback", youtubeAuth, (req, res) => {
    res.redirect("/playlist");
  });

  // Logout Route
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //Passport route business logic
  app.post("/api/login", requireLogin, Authentication.login);

  //Passport route business logic with db privileges.
  app.post("/api/register", Authentication.register);
};
