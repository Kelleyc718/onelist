const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

// OAuth2.0 options for Google
const googleOptions = {
  clientID: keys.GOOGLE_CLIENT_ID,
  clientSecret: keys.GOOGLE_CLIENT_SEC,
  callbackURL: '/auth/google/callback',
  access_type: 'offline'
};

// Google O2Auth Buisness Logic
const google = new GoogleStrategy(
  googleOptions,
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({
      'serviceTokens.google.profileId' : profile.id
    });

    if (existingUser) {
      return done(null, existingUser);
    }

    if (!accessToken) {
      accessToken = null;
    }

    if (!refreshToken) {
      refreshToken = null;
      console.log('no refresh token available');
    }

    const user = await new User({
      email: profile.emails[0].value,
      serviceTokens: {
        google: {
          profileId: profile.id,
          token: accessToken,
          refresh_token: refreshToken,
          expires_in: 1440000
        }
      }
    }).save();
    done(null, user);
  }
);

passport.use(google);


// 1440000ms a day