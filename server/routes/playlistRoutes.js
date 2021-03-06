const mongoose = require("mongoose");
const promise = require("request-promise");
require("../models/User");
require("../models/Playlist");

const User = mongoose.model("users");
const Playlist = mongoose.model("playlist");

module.exports = app => {
  app.get("/api/youtube/playlist", async (req, res) => {
    const currentUser = await User.findOne(req.user);
      const currentUserPlaylist = await Playlist.findOne({
          _user: currentUser
      });
    console.log(currentUserPlaylist.youtube.accessToken);
    promise({
      uri:
        "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true",
      headers: {
        Authorization: `Bearer ${currentUserPlaylist.youtube.accessToken}`
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
    }).then(data => res.send(data))
        .catch(e => {
            console.log(e);
            res.send(e + "Your access token has expired")
        });
  });
};
