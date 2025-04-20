// backend/controllers/userController.js
const User = require("../models/User");
const bcrypt = require('bcryptjs');
// GET /api/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res
      .status(500)
      .json({ message: "حدث خطأ أثناء جلب المستخدمين", error: err.message });
  }
};

// PUT /api/users/:id/role
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "المستخدم غير موجود" });
    res.status(200).json({ message: "تم تحديث الدور", user: updated });
  } catch (err) {
    console.error("Error updating role:", err);
    res
      .status(500)
      .json({ message: "حدث خطأ أثناء تحديث الدور", error: err.message });
  }
};

// DELETE /api/users/:id  (soft‑delete example below)
exports.deleteUser = async (req, res) => {
  try {
    // Soft‑delete by flipping isApproved = false (or add `isDeleted` flag)
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });
    res.status(200).json({ message: "تم تعطيل المستخدم", user });
  } catch (err) {
    console.error("Error deleting user:", err);
    res
      .status(500)
      .json({ message: "حدث خطأ أثناء حذف المستخدم", error: err.message });
  }
};


exports.updateMe = async (req, res) => {
  try {
    const updates = {};
    const allowed = ["name", "phone", "password"];
    // إضافة avatar إذا وُجد
    if (req.file) {
      updates.avatar = `/uploads/${req.file.filename}`;
      // تأكد أنّك تستخدم express.static("public") في server.js
    }
    allowed.forEach((field) => {
      if (req.body[field] != null) updates[field] = req.body[field];
    });
    // تجزئة الباسوورد إن تم تغييره
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }
    const updated = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");
    res.status(200).json({ message: "تم التحديث بنجاح", user: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في التحديث", error: err.message });
  }
};


// GET /api/users/me
exports.getMe = async (req, res) => {
  try {
    const me = await User.findById(req.user.id).select("-password");
    if (!me) return res.status(404).json({ message: "المستخدم غير موجود" });
    res.status(200).json({ user: me });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في جلب البيانات", error: err.message });
  }
};

// PUT /api/users/me
exports.updateMe = async (req, res) => {
  try {
    const updates = {};
    const allowed = ["name", "email", "phone", "password"];
    allowed.forEach((field) => {
      if (req.body[field] != null) updates[field] = req.body[field];
    });

    // if updating password, hash it
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "تم التحديث بنجاح", user: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في التحديث", error: err.message });
  }
};