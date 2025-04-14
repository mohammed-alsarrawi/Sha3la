// backend/routes/agencyRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerAgency,
  getAgencyRequests,
  updateAgencyStatus,
} = require("../controllers/agencyController");
const { protect, authorize } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

// تسجيل وكالة جديدة (POST)
router.post("/agency/register", upload.single("licenseImage"), registerAgency);

// إدارة طلبات تسجيل الوكالات – (GET)
router.get("/agency-requests", protect, authorize("admin"), getAgencyRequests);

// تحديث حالة طلب تسجيل الوكالات – (PUT)
router.put(
  "/agency-requests/:id",
  protect,
  authorize("admin"),
  updateAgencyStatus
);

module.exports = router;
