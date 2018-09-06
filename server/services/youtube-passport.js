const passport = require("passport");
const YoutubeV3Strategy = require("passport-youtube-v3").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Playlist = mongoose.model("playlist");
const keys = require('../config/keys');

require("dotenv").config();

// OAuth2 For Youtube Access
const youtubeAuthOptions = {
  clientID: keys.GOOGLE_CLIENT_ID,
  clientSecret: keys.GOOGLE_CLIENT_SEC,
  callbackURL: "/auth/youtube/callback",
  proxy: true
};

const youtubeAuth = new YoutubeV3Strategy(
  youtubeAuthOptions,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ id: ObjectId });
      const existingService = await Playlist.findOne({
          _user : existingUser
      });

      if (existingService) {
        await Playlist.update({
          accessToken: accessToken,
          refreshToken: refreshToken
        });

        return done(null, existingService);
      } else {
        await Playlist({
          _user: existingUser,
          services: {
            name: "youtube",
            accessToken: accessToken,
            refreshToken: refreshToken,
            expires_in: 3500
          }
        }).save();
        return done(null, existingUser);
      }
    } catch (e) {
      console.log("error" + e);
    }
  }
);

passport.use(youtubeAuth);
