const express = require("express");

require("./startup/db")();
const app = express();
require("./startup/cors")(app);
require("./startup/cookieSession")(app);
require("./startup/passport")(app);
require("./startup/routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log(`Connected to Mongo, Listening on PORT ${PORT}, Happy Hacking!`);
