const express = require("express");
const { protect, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

// روت للمستخدم المسجل
router.get("/me", protect, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});

// روت خاص بالأدمن
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome admin!", user: req.user });
});

module.exports = router;
