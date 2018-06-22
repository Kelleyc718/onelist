const mongoose = require("mongoose");
const promise = require("request-promise");
require("../models/Playlist");

const Playlist = mongoose.model("playlist");

module.exports = app => {
  app.get("/api/youtube/playlist", async (req, res) => {
      const currentUserPlaylist = await Playlist.findOne({_user: req.user.id});
      promise({
          uri:
              "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true",
          headers: {
              'Authorization': `Bearer ${currentUserPlaylist.token}`
          }
      }).then((data) => res.send(data))
  });

    app.get("/api/spotify/playlist", async (req, res) => {
        const currentUserPlaylist = await Playlist.findOne({_user: req.user.id});
        promise({
            uri:
                "https://api.spotify.com/v1/me/playlists",
            headers: {
                'Authorization': `Bearer ${currentUserPlaylist.token}`
            }
        }).then((data) => res.send(data))
    });
};
