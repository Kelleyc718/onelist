const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Basic Playlist model
const playlistSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  services: [
    {
      name: String,
      accessToken: String,
      refreshToken: String,
      expires_in: Number
    }
  ]
});

const PlaylistModel = mongoose.model("playlist", playlistSchema);

module.exports = PlaylistModel;
