'use strict';
import Authentication from "./controllers/authentication";
import passportService from "./services/passport";
import passport from "passport";


// Constants defined to protect routes
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });
const o2Auth = passport.authenticate("local", {session: false});

// Routes used on server side for API
export default app => {
  app.get("/playlist", requireAuth);
  app.post("/login", requireLogin, Authentication.login);
  app.post("/register", Authentication.register);
}
