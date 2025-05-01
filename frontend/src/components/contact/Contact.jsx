// src/components/contact/Contact.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // simple client‑side validation
    if (!form.name || !form.email || !form.message) {
      return Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "يرجى ملء الحقول المطلوبة",
      });
    }

    try {
      setLoading(true);
      // adjust URL to your backend endpoint
      await axios.post("http://localhost:5000/api/contact", form, {
        withCredentials: true,
      });
      Swal.fire({
        icon: "success",
        title: "تم الإرسال",
        text: "شكرًا لتواصلك معنا، سنرد عليك قريبًا.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "فشل الإرسال",
        text: err.response?.data?.message || "حدث خطأ، حاول مرة أخرى.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">تواصل معنا</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          نحن هنا لخدمتك! سواء كان لديك سؤال، اقتراح أو تريد دعمًا، أخبرنا بما
          تحتاج.
        </p>
      </section>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Info + Map */}
        <div className="space-y-8">
          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">
                الهاتف
              </h3>
              <p className="text-gray-700">078-1234567</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">
                البريد الإلكتروني
              </h3>
              <p className="text-gray-700">info@gascompany.com</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">
                العنوان
              </h3>
              <p className="text-gray-700">شارع الصناعة، عمان، الأردن</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">
                ساعات العمل
              </h3>
              <p className="text-gray-700">السبت – الخميس: 8ص – 6م</p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden">
            {/* Replace src with your map embed URL */}
            <iframe
              title="company-location"
              src="https://maps.google.com/maps?q=Amman%20Industrial%20Street&amp;output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                الاسم<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                placeholder="أدخل اسمك"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                البريد الإلكتروني<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                الموضوع
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                placeholder="عنوان رسالتك"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                الرسالة<span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                placeholder="كيف يمكننا مساعدتك؟"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-lg transition ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "جاري الإرسال..." : "إرسال"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
