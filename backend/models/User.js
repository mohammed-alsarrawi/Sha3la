const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true }, // Added phone number
    password: String,
    role: { type: String, enum: ["admin", "agency", "user"], default: "user" },
    isApproved: { type: Boolean, default: false },
    avatar: { type: String, default: "/default-avatar.png" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
