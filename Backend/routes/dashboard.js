const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const userModel = require("../Models/user");

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
module.exports = router;
