const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  age: Number,
  email: String,
});

module.exports = mongoose.model("user", userSchema);
