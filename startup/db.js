const mongoose = require("mongoose");
const keys = require("../config/keys");

module.exports = () => {
  mongoose.connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};
