const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const User = mongoose.model("users");
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Local strategy used to find a user and authenticate login
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    // Returns error if there is an error during the search
    return err
      ? done(err)
      : // If search did not error and did not find a user
        !user
        ? done(null, false)
        : // User was found and now checking passwords
          user.comparePassword(password, (err, isMatch) => {
            // Check for errors when comparing passwords
            return err
              ? done(err)
              : // Check if passwords match
                !isMatch
                ? done(null, false)
                : // User exists and password matches, User object is returned
                  done(null, user);
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
