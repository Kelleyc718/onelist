const request = require("request");
require("../services/bearer-passport");

const options = {
    url: 'https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true',
    qs: {part: 'snippet', mine: 'true'},
    headers:
        {
            Authorization: 'Bearer ya29.GlvcBd5PlTxHq9pQbRi0QJEi9ob2LT6L1AnH6owgnP8CyrQkbRLI_Q6CyjN8Ne_OMT3lV7DQEa-K4s3b2Jpzzj0IT-Zf-RpySdZs5BczDuPm7BoLaIxkdQj3p4ws'
        }
};


module.exports = app => {
    app.get("/api/playlist", (req, res, next) => {
      request(options, (error, response, body) => {
          if (error) {
              return error;
          }
          return response;
      }).pipe(res);
  });
};

