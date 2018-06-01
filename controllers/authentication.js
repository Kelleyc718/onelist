import User from "../models/user";
import jwt from "jwt-simple";
import config from "../config";

// Creates a authorization token allowing user to visit protected routes
const tokenForUser = (user) => {
    let timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
};

// Checks the credentials and provides token upon valid signin
exports.signin = (req, res, next) => {
    res.send({token: tokenForUser(req.user)});
};

// Basic signup requiring user email and password TODO: Expand on this
exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({error: "Must enter an email AND password."});
    }

    User.findOne({email: email}, (error, existingUser) => {
        if (error) {
            return next(error);
        }

        if (existingUser) {
            return res.status(422).send({error: "Email is in use."})
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save((error) => {
            return (error) ? next(error) : res.json({token: tokenForUser(user)});
        });
    })
};