import passport from "passport";
import User from "../models/user";
import config from "../config";
import {Strategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";
import LocalStategy from "passport-local";

// Local strategy used to find a user and authenticate login
const localOptions = { usernameField: "email" };
const localLogin = new LocalStategy(localOptions, (email, password, done) => {
    User.findOne( { email: email}, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }

            if (!isMatch) { return done(null, false); }

            return done(null, user);
        });
    });
});

// JWT Setup, instructs to check header for user's token
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

// JWT Strategy
// Checks if user exists with proper authentication
const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
       return (err) ? done(err, false)
           : (user) ? done(null, user)
               : done(null, false);
    });
});

// Passport instructions
passport.use(jwtLogin);
passport.use(localLogin);