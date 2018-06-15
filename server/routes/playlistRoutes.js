const youtubeUrl = "https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true";

module.exports = app => {
    app.get(youtubeUrl, (req, res) => {
        console.log(res);
    })
};
