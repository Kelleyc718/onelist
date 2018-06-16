const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const User = mongoose.model("users");
require("dotenv").config();

// Local strategy used to find a user and authenticate login
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// JWT Strategy
// Checks if user exists with proper authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.APP_SECRET
};
const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    return err ? done(err, false) : user ? done(null, user) : done(null, false);
  });
});


// Passport instructions
passport.use(jwtLogin);
passport.use(localLogin);
