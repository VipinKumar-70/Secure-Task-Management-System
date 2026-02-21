const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("user", userSchema);
