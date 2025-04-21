// backend/routes/userRoutes.js
const express = require("express");
const {
  getUsers,
  updateUserRole,
  deleteUser,
  getMe,
  updateMe,
} = require("../controllers/userController");
const { protect, authorize } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");           // ← هنا
const router = express.Router();

// admin endpoints...
router.get("/users", protect, authorize("agency", "admin"), getUsers);
router.put(
  "/users/:id/role",
  protect,
  authorize("agency", "admin"),
  updateUserRole
);
router.delete(
  "/users/:id",
  protect,
  authorize("agency", "admin"),
  deleteUser
);
router.put(
  "/users/me",
  protect,
  upload.single("avatar"), // multer الآن معرفة
  updateMe
);


// ────────── PROFILE ──────────
router.get("/users/me", protect, getMe);
router.put("/users/me", protect, updateMe);

module.exports = router;
