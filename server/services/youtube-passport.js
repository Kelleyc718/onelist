const passport = require("passport");
const YoutubeV3Strategy = require("passport-youtube-v3").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Playlist = mongoose.model("playlist");

require("dotenv").config();

// OAuth2 For Youtube Access
const youtubeAuthOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SEC,
  callbackURL: "/auth/youtube/callback",
  proxy: true
};

const youtubeAuth = new YoutubeV3Strategy(
  youtubeAuthOptions,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ id: ObjectId });
      const existingService = await Playlist.findOne({
          "service.name": "youtube"
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
          service: {
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
