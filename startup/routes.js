const authRoutes = require("../routes/authRoutes");
const bodyParser = require("body-parser");

module.exports = (app) => {
  app.use(bodyParser.json({ limit: "10kb" }));

  app.use("/api/auth", authRoutes);
};
