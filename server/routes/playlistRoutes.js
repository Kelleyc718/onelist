const request = require("request");
const youtubeUrl =
  'https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true';

module.exports = app => {
  app.get("/api/playlist", (req, res) => {
    request({
        uri: youtubeUrl
    },
      function(error, response, body) {
        if (error) {
          return console.error(error);
        }
        console.log("Server responded with:", body);
      }
    );
  });
};
