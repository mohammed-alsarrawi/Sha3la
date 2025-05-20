// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const { createMessage } = require("../controllers/contactController");

// POST request لإنشاء رسالة
router.post("/contact", createMessage);

module.exports = router;
