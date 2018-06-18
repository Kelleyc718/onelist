const mongoose = require("mongoose");
const request = require("request");
require("../models/Playlist");
require("../services/bearer-passport");

const Playlist = mongoose.model("playlist");

module.exports = app => {
  app.get("/api/playlist", async (req, res) => {
    const currentUserPlaylist = await Playlist.findOne({ _user: req.user.id });
    console.log(currentUserPlaylist.token);
    request({
      url:
        "https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true",
      qs: { part: "snippet", mine: "true" },
      headers: {
        Authorization: `Bearer ${currentUserPlaylist.token}`
      }
    }, (error, response, body) => {
        console.log(response);
        console.log(body);
    }).pipe(res);
  });
};
