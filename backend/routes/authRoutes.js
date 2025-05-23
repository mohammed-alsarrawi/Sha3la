// routes/authRoutes.js
const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const router = express.Router();

// تعريف الراوتات
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);


module.exports = router;
