// backend/routes/statsRoutes.js
const express = require("express");
const router = express.Router();
const StatsController = require("../controllers/StatsController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.get(
  "/stats",
  protect,
  authorize("super-admin", "admin"),
  StatsController.getStats
);

module.exports = router;
