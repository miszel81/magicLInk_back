const express = require("express");
const passport = require("passport");
const router = express.Router();
const { Magic } = require("@magic-sdk/admin");
const keys = require("../config/keys");

const magic = new Magic(keys.MAGIC_SECRET_KEY);

router.post("/login/callback", passport.authenticate("magic"), (req, res) => {
  if (req.user) {
    res.status(200).end("User is logged in");
  } else {
    return res.status(401).end("Could not log user");
  }
});

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

router.post("/logout", async (req, res) => {
  if (req.isAuthenticated()) {
    await magic.users.logoutByIssuer(req.user.issuer);
    req.logout();
    return res.status(200).end();
  } else {
    return res.status(401).end("user is not logged in");
  }
});

module.exports = router;
