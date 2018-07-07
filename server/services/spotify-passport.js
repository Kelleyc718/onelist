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
      console.log(profile);
    const existingUser = await User.findOne({
      _user: ObjectId
    });

    const existingPlaylist = await Playlist.findOne({
      _user: existingUser
    });

    if (existingPlaylist) {
      await Playlist.update({
        spotify: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          expires_in: expires_in
        }
      });
      return done(null, existingPlaylist);
    } else {
      await Playlist({
        _user: existingUser,
        spotify: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          expires_in: expires_in
        }
      }).save(done);
    }
  }
);

passport.use(spotify);
