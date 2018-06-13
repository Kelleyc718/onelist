
module.export = app => {
  app.get("/auth/youtube", async (req, res) => {
    res.send(req.data);
  });
};
