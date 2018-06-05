import Authentication from "./controllers/authentication";
import passportService from "./services/passport";
import passport from "passport";
import Playlist from "./controllers/youtube";

// Constants defined to protect routes
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

// Routes used on server side for API
export default app => {
  app.get("/playlist", Playlist, (req, res) => {
    res.send("Welcome!");
  });
  app.post("/login", requireLogin, Authentication.login);
  app.post("/register", Authentication.register);
}
