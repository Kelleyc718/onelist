const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
require("dotenv").config();

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
    const existingUser = await User.findOne({ serviceId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    if (!accessToken) {
        accessToken = null;
        console.log("no token available");
    }

      if (!refreshToken) {
          refreshToken = null;
          console.log("no refresh token available");
      }

    const user = await new User({
      email: profile.emails[0].value,
      serviceId: {
        google: profile.id
      },
      serviceTokens: {
        google: {
          token: accessToken,
          refresh_token: refreshToken,
          expires_in: 1000 * 60 * 60
        }
      }
    }).save();
    done(null, user);
  }
);

passport.use(google);
