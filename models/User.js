const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  issuer: String,
  email: String,
  lastLogingAt: String,
});

mongoose.model("users", userSchema);
