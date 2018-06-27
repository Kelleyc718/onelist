const mongoose = require("mongoose");
const promise = require("request-promise");
require("../models/User");

const User = mongoose.model("users");

module.exports = app => {
  app.get("/api/youtube/playlist", async (req, res) => {
      console.log(req.user);
      const currentUserPlaylist = await User.findOne(req.user);
      promise({
          uri:
              "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true",
          headers: {
              'Authorization': `Bearer ${currentUserPlaylist.token}`
          }
      }).then((data) => res.send(data))
  });

     app.get("/api/spotify/playlist", async (req, res) => {
        const currentUserPlaylist = await User.findOne(req.user);
        promise({
            uri:
                "https://api.spotify.com/v1/me/playlists",
            headers: {
                'Authorization': `Bearer ${currentUserPlaylist.token}`
            }
        }).then((data) => res.send(data))
    });
};
