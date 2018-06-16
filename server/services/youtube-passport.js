const passport = require("passport");
const YoutubeV3Strategy = require("passport-youtube-v3").Strategy;
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const User = mongoose.model("users");
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

      if (existingUser) {
        const existingService = await Playlist.findOne({ service: "youtube" });
        console.log(existingService);
        if (existingService) {
          return done(null, existingUser);
        } else {
          await Playlist({
            _user: existingUser,
              token: accessToken,
            service: "youtube"
          }).save();
        }
      }
    } catch (e) {
      console.log("error");
    }
  }
);

passport.use(youtubeAuth);
