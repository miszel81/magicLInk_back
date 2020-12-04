const cookieSession = require("cookie-session");
const keys = require("../config/keys");

module.exports = (app) => {
  app.use(
    cookieSession({
      // secure: true,
      name: "session",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey],
    })
  );
};
