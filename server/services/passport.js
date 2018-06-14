const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const YoutubeV3Strategy = require("passport-youtube-v3").Strategy;
const mongoose = require("mongoose");
require("dotenv").config();

const User = mongoose.model("users");

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
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
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

    const user = await new User({ googleId: profile.id }).save();
    done(null, user);
  }
);


// OAuth2 For Youtube Access
const youtubeOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SEC,
    callbackURL: "/auth/youtube/callback",
    proxy: true
};

const youtube = new YoutubeV3Strategy(
    youtubeOptions,
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({userId: profile.id});
        const user = await new User({ userId: profile.id }).save();
        done(null, user);
    }
);

// Passport instructions
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(google);
passport.use(youtube);

// TODO LIST
//https://www.googleapis.com/auth/youtube",

// // Facebook token exchange
// const fbToken = (accessToken, refreshToken, profile, cb) => {
//     User.findOrCreate({facebookId: profile.id}, function (err, user) {
//         return cb(err, user);
//     });
// };

// Facebook O2Auth business logic
// passport.use(new FacebookStrategy(
//     {
//         clientID: FACEBOOK_APP_ID,
//         clientSecret: FACEBOOK_APP_SECRET,
//         callbackURL: "http://localhost:3000/auth/facebook/callback"
//     }, fbTokens
// ));
