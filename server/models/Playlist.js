const mongoose = require('mongoose');
const {Schema} = require('mongoose');

// Basic Playlist model
const playlistSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    service: String
});

mongoose.model("playlist", playlistSchema);



