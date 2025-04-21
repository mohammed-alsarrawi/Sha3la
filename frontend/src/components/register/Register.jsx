// src/components/register/Register.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // for client‑side routing :contentReference[oaicite:2]{index=2}
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";

function Register() {
  const navigate = useNavigate(); // useNavigate hook for redirects :contentReference[oaicite:3]{index=3}

  // Form field states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "كلمتا المرور غير متطابقتين",
      });
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        { name: fullName, email, phone, password, role: "user" },
        { withCredentials: true }
      );

      await Swal.fire({
        icon: "success",
        title: "نجاح",
        text: "تم تسجيل المستخدم بنجاح",
      });

      // Redirect to home page after successful registration
      navigate("/"); // navigate to “/” :contentReference[oaicite:4]{index=4}
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: error.response?.data?.message || "حدث خطأ أثناء التسجيل",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      }}
      dir="rtl"
      lang="ar"
    >
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1661964131234-fda88ca041c5?q=80&w=2071"
            alt="Gas Ordering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 opacity-75 flex flex-col items-center justify-center p-8 text-white">
            <h2 className="text-4xl font-bold mb-4">مرحباً بك!</h2>
            <p className="text-xl mb-6 text-center">
              خدمة توصيل الغاز الأسرع والأكثر موثوقية في المنطقة.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full ml-2 bg-white/20 flex items-center justify-center mr-2">
                  ✓
                </span>
                <span>توصيل سريع خلال ساعة</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full ml-2 bg-white/20 flex items-center justify-center mr-2">
                  ✓
                </span>
                <span>أسعار تنافسية وشفافة</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full ml-2 bg-white/20 flex items-center justify-center mr-2">
                  ✓
                </span>
                <span>خدمة عملاء على مدار الساعة</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <div className="relative w-45 h-45 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 opacity-80"></div>
              <div className="relative z-10 bg-white rounded-full p-5 shadow-lg">
                <img
                  src={logo}
                  alt="الشعار"
                  className="w-30 h-30 object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold" style={{ color: "#1E56A0" }}>
              إنشاء حسابك
            </h1>
            <p className="text-gray-600 mt-2">
              انضم إلينا لتجربة طلب الغاز بسهولة وسرعة.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                الاسم الكامل
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                رقم الهاتف
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="أدخل رقم الهاتف"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            {/* Password / Confirm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2 text-gray-700">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أنشئ كلمة مرور"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="أكد كلمة مرورك"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>
            {/* Terms */}
            <div dir="rtl" className="text-right">
              {/* Checkbox مع الرابط */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  className="ml-2"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  أوافق على{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline font-medium"
                    onClick={() => setShowModal(true)}
                  >
                    الشروط والأحكام
                  </button>
                </label>
              </div>

              {/* Modal */}
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[80vh] relative">
                    <h2 className="text-xl font-bold mb-4 text-blue-800 text-center">
                      الشروط والأحكام
                    </h2>

                    <div className="text-sm text-gray-700 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                      <p>
                        باستخدامك لهذا الموقع فإنك توافق على شروط الاستخدام،
                        وتشمل ما يلي:
                      </p>
                      <ul className="list-disc pr-4 space-y-2">
                        <li>عدم استخدام المنصة لأي غرض غير قانوني.</li>
                        <li>توفير معلومات صحيحة عند التسجيل والطلب.</li>
                        <li>
                          تلتزم المنصة بحماية بيانات المستخدم ضمن حدود الاستخدام
                          العادل.
                        </li>
                        <li>
                          تحتفظ المنصة بحق تعديل الشروط في أي وقت وسيتم إعلامك
                          بذلك.
                        </li>
                        <li>جميع الحقوق محفوظة © شعلة لخدمات الغاز.</li>
                      </ul>
                    </div>

                    {/* إغلاق */}
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        إغلاق
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition"
              style={{
                backgroundColor: "#1E56A0",
                boxShadow: "0 4px 6px rgba(30,86,160,0.25)",
              }}
            >
              {loading ? (
                <span className="inline-flex items-center">
                  <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  جاري الإنشاء...
                </span>
              ) : (
                "إنشاء حساب"
              )}
            </button>
            {/* Login Link */}
            <p className="text-center mt-6 text-gray-600">
              هل لديك حساب بالفعل؟{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                تسجيل الدخول
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
