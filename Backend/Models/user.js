const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  age: Number,
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("user", userSchema);
