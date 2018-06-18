const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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

// OAuth2.0 options for Google
const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SEC,
  callbackURL: "/auth/google/callback",
  proxy: true
};

// Google O2Auth Buisness Logic
const google = new GoogleStrategy(
  googleOptions,
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      token: accessToken,
      refresh_token: refreshToken
    }).save();
    done(null, user);
  }
);

passport.use(google);

