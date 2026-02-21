const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const Task = require("../Models/task");

// GET all tasks
router.get("/task", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// POST create task
router.post("/task", authMiddleware, async (req, res) => {
  try {
    const task = await Task.create({
      user: req.user.id,
      text: req.body.text,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});

// PUT edit task
router.put("/task/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { text: req.body.text },
      { new: true },
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
});

// DELETE task
router.delete("/task/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;