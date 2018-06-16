const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Basic user model
const userSchema = new Schema({
    googleId: String,
    email: String,
    access_token: String,
    token: String,
    password: String
});

// On save hook, encrypt password
// Before saving a model, runs the salt/hash functions to encrypt password
userSchema.pre("save", function(next) {
    const user = this;
    if (user.password == null) {
        return next();
    }

    // Generate salt for 10 rounds
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        // Has salted password
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            // Set user password == hashed salt
            user.password = hash;

            // Model gets saved
            next();
        });
    });
});

// Helper method implemented within routes
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
};

const ModelClass = mongoose.model('users', userSchema);

module.exports = ModelClass;