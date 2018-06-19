const mongoose = require("mongoose");
const promise = require("request-promise");
require("../models/Playlist");

const Playlist = mongoose.model("playlist");

module.exports = app => {
  app.get("/api/playlist", async (req, res) => {
    const currentUserPlaylist = await Playlist.findOne({ _user: req.user.id });
    promise({
      uri:
        "https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true",
      qs: { part: "snippet", mine: "true" },
      headers: {
        'Authorization': `Bearer ${currentUserPlaylist.token}`
      }
    }).then((data) => res.send(JSON.parse(data)));
  });
};
