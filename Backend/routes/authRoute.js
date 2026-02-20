const express = require("express");
const router = express.Router();
const userModel = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", (req, res) => {
  res.json({
    sucess: true,
    message: "Register route working",
  });
});

module.exports = router;
