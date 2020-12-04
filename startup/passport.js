const passport = require("passport");
require("../models/User");
require("../services/passport");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
