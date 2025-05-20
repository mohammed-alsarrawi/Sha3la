// controllers/contactController.js
const ContactMessage = require("../models/ContactMessage");

exports.createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    // حفظ الرسالة في قاعدة البيانات
    await newMessage.save();

    res.status(200).json({
      success: true,
      message: "تم إرسال الرسالة بنجاح",
    });
  } catch (err) {
    console.error("Error saving contact message:", err);
    res.status(500).json({
      success: false,
      message: "حدث خطأ، حاول مرة أخرى.",
    });
  }
};
