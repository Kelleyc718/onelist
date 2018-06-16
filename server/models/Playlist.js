const mongoose = require('mongoose');
const {Schema} = require('mongoose');

// Basic Playlist model
const playlistSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    token: String,
    service: String,
    lists: String
});

const PlaylistModel = mongoose.model('playlist', playlistSchema);

module.exports = PlaylistModel;



