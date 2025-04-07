const express = require("express");
const router = express.Router();
const serviceRequestController = require("../controllers/HeatingServiceRequestController");

// إنشاء طلب خدمة جديد
router.post("/", serviceRequestController.createServiceRequest);

// استرجاع جميع الطلبات
router.get("/", serviceRequestController.getServiceRequests);

module.exports = router;
