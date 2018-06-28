const mongoose = require("mongoose");
const promise = require("request-promise");
require("../models/User");
require("../models/Playlist");

const User = mongoose.model("users");
const Playlist = mongoose.model("playlist");

module.exports = app => {
  app.get("/api/youtube/playlist", async (req, res) => {
    console.log(req.user);
    const currentUserPlaylist = await User.findOne(req.user);
    promise({
      uri:
        "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true",
      headers: {
        Authorization: `Bearer ${currentUserPlaylist.token}`
      }
    }).then(data => res.send(data));
  });

  app.get("/api/spotify/playlist", async (req, res) => {
    const currentUser = await User.findOne(req.user);
    const currentUserPlaylist = await Playlist.findOne({
      _user: currentUser
    });
    promise({
      uri: "https://api.spotify.com/v1/users/jroztg2rclgpl105vajdib8ld/playlists/5OKl9gecg9nNfrIGNRIHUd/tracks",
      headers: {
        Authorization: `Bearer ${currentUserPlaylist.spotify.accessToken}`
      }
    }).then(data => res.send(data));
  });
};
