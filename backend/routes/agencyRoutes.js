// routes/agencyRoutes.js
const express = require("express");
const router = express.Router();
const { registerAgency } = require("../controllers/agencyController");
const upload = require("../middlewares/upload");

router.post("/register", upload.single("licenseImage"), registerAgency);

module.exports = router;

