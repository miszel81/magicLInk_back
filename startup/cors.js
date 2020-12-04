const cors = require("cors");

module.exports = (app) => {
  //FOR DEVELOPMENT
  app.use(
    cors({
      credentials: true,
      exposedHeaders: "centent-type, session, Set-Cookie",
      origin: "http://localhost:3000",
    })
  );
};
