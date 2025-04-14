// backend/routes/heatingServiceRequestRoutes.js
const express = require("express");
const router = express.Router();
const {
  createServiceRequest,
  getServiceRequests,
  updateServiceRequest,
  deleteServiceRequest,
} = require("../controllers/HeatingServiceRequestController");
const { protect } = require("../middlewares/authMiddleware"); // أو بدون حماية إن كنت لا تحتاج

// تعريف POST لإنشاء طلب خدمة جديد
router.post("/heating-service-requests", protect, createServiceRequest);

// تعريف GET لجلب جميع الطلبات (اختياري)
router.get("/heating-service-requests", protect, getServiceRequests);

// تعريف PUT لتحديث حالة الطلب (اختياري)
router.put("/heating-service-requests/:id", protect, updateServiceRequest);

// تعريف DELETE لحذف الطلب (اختياري)
router.delete("/heating-service-requests/:id", protect, deleteServiceRequest);

module.exports = router;
