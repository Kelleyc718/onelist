const passport = require("passport");
const mongoose = require("mongoose");
const Strategy = require("passport-http-bearer");
const User = mongoose.model("users");

passport.use(
  new Strategy(function(token, cb) {
    User.findByToken(token, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);
