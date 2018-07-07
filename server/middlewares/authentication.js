const User = require("../models/User");
const jwt = require("jwt-simple");
const mongoose = require("mongoose");
require("../models/User");

const existingUser = mongoose.model("users");

// Creates a authorization token allowing user to visit protected routes
const tokenForUser = user => {
  let timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.APP_SECRET);
};

// Checks the credentials and provides token upon valid signin
exports.login = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

// Basic register requiring user email and password TODO: Expand on this
exports.register = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // If email or password are null, "422 Error" will be returned
  if (!email || !password) {
    return res.status(422).send({ error: "Must enter an email AND password." });
  }

  // If email is not found, user will be saved, otherwise, an error will populate.
  existingUser.findOne({ email: email }, (error, existingUser) => {
    if (error) {
      return next(error);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use." });
    }

    const user = new User({
      email: email,
      password: password
    });

    // On user save, either an error, or a new token will be returned.
    user.save(error => {
      return error ? next(error) : res.json({ token: tokenForUser(user) });
    });
  });
};
