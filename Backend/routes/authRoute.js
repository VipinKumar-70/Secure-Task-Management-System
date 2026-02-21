const express = require("express");
const router = express.Router();
const userModel = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { username, email, dob, password } = req.body;

    const dobDate = new Date(dob);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters and include uppercase, lowercase, number, and special character.",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist.",
      });
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const createUser = await userModel.create({
          username,
          email,
          dob: dobDate,
          password: hash,
        });

        console.log(createUser);
        res.status(201).json({
          success: true,
          message: "User Registered successfully.",
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (!result) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      if (result) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });
        return res.status(200).json({
          success: true,
          message: "Login successful",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
