const SpotifyStrategy = require("passport-spotify").Strategy;
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
require("dotenv").config();

const spotifyOptions = {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SEC,
  callbackURL: "/auth/spotify/callback"
};

const spotify = new SpotifyStrategy(
  spotifyOptions,
  async (accessToken, refreshToken, expires_in, profile, done) => {
    const existingUser = await User.findOne({ email: profile.emails[0].value });

    if (existingUser) {
      const existingService = await User.findOne({ service: spotify });
      if (existingService) {
        return done(null, existingUser);
      } else {
        User.update({
          spotifyId: profile.id,
          tokens: {
            spotifyTokens: {
              token: accessToken,
              refreshToken: refreshToken
            }
          }
        });
      }
    }

    const user = await new User({
      spotifyId: profile.id,
      email: profile.emails[0].value,
      spotifyTokens: {
        token: accessToken,
        refresh_token: refreshToken,
        expires_in: expires_in
      },
      service: "spotify"
    }).save();
    done(null, user);
  }
);

passport.use(spotify);
