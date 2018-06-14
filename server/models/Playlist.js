const mongoose = require('mongoose');
const {Schema} = require('mongoose');

// Basic Playlist model
const playlistSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    service: String
});

const ModelClass = mongoose.model('playlist', playlistSchema);

module.exports = ModelClass;



