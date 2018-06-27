const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Playlist = mongoose.model("playlist");
require("dotenv").config();

const spotifyOptions = {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SEC,
  callbackURL: "/auth/spotify/callback"
};

const spotify = new SpotifyStrategy(
  spotifyOptions,
  async (accessToken, refreshToken, expires_in, profile, done) => {
    const existingUser = await User.findOne({ id: ObjectId });
    const existingService = await Playlist.findOne({
      services: {
        $elemMatch: {
          name: "spotify"
        }
      }
    });

    if (existingUser && existingService) {
      return done(null, existingService);
    } else {
      await Playlist.update({
          _user: existingUser,
          $push: {
              services:{
                       name: "spotify",
                       accessToken: accessToken,
                       refreshToken: refreshToken,
                       expires_in: 3500
                   }
          }
    });
      return done(null, existingService);
    }
  }
);

passport.use(spotify);
