// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Route to store payment information
router.post("/store-payment", paymentController.storePayment);

module.exports = router;
