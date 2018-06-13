"use strict";
const Authentication = require("../controllers/authentication");
const passport = require("passport");
require("../services/passport");
require("dotenv").config();

// Constants defined to protect routes
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });
const googleAuth = passport.authenticate("google", {scope: ["profile", "email"]});


// Routes used on server side for API
module.exports = app => {
  // Google passport rules
  app.get("/auth/google", googleAuth);

  //Callback request to receive the token exchange
  app.get("/auth/google/callback", passport.authenticate("google"),
      (req, res) => {
      res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
      req.logout();
      res.redirect("/");
  });

  //Passport route business logic
  app.post("/api/login", requireLogin, Authentication.login);

  //Passport route business logic with db privileges.
  app.post("/api/register", Authentication.register);
};
