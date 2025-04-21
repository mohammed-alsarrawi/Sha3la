const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      isApproved: role === "agency" ? false : true,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }); 
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    if (user.role === "agency" && !user.isApproved) {
      return res
        .status(403)
        .json({ message: "لم يتم الموافقة على حساب الوكالة بعد" });
    }

    // إنشاء التوكن
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // إرسال التوكن في الكوكيز
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 أيام
    });

    // إرسال الرد
    res.status(200).json({
      message: "تم تسجيل الدخول بنجاح",
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "حدث خطأ في الخادم", error: error.message });
  }
};

const logout = (req, res) => {
  // نمسح الكوكيز اللي اسمه "token"
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  // نرجّع رسالة نجاح
  return res.status(200).json({ message: "تم تسجيل الخروج بنجاح" });
};



module.exports = { register, login ,logout};
