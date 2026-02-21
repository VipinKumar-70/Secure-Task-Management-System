const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");

router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to dashboard",
  });
});

module.exports = router;