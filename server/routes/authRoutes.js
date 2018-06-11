"use strict";
const Authentication = require("../controllers/authentication");
const passport = require("passport");
require("../services/passport");
require("dotenv").config();

// Constants defined to protect routes
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });
const googleAuth = passport.authenticate("google");

// Routes used on server side for API
module.exports = app => {
  // Google passport rules
  app.get("/auth/google", googleAuth);

  //Callback request to receive the token exchange
  app.get("/auth/google/callback", googleAuth);

  app.get("/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/logout", (req, res) => {
      req.logout();
      res.send("You have been logged out");
  });

  //Poassport route buisness logic
  app.post("/login", requireLogin, Authentication.login);

  //Poassport route buisness logic with db prividledges.
  app.post("/register", Authentication.register);
};
