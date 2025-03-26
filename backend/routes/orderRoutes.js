// routes/orderRoutes.js
const express = require("express");
const { createOrder } = require("../controllers/orderController"); // استيراد الكونترولر
const router = express.Router();

// مسار تقديم طلب أسطوانات الغاز
router.post("/order-gas", createOrder);

module.exports = router;
