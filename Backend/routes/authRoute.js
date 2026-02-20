const express = require("express");
const router = express.Router();
const userModel = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, email, age, password } = req.body;

  const createUser = await userModel.create({
    username,
    email,
    age,
    password,
  });

  console.log(createUser);

  res.json({
    success: true,
    message: "User Registered successfully.",
  });
});

module.exports = router;
