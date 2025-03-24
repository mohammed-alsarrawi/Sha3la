import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";

function Register() {
  // Field states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Form submission handler using axios and SweetAlert2
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "كلمتا المرور غير متطابقتين",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        { name: fullName, email, password, role: "user" },
        { withCredentials: true }
      );
      Swal.fire({
        icon: "success",
        title: "نجاح",
        text: "تم تسجيل المستخدم بنجاح",
      });
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
        {/* Left Side - Image & Info */}
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1661964131234-fda88ca041c5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Gas Ordering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 opacity-75 flex flex-col items-center justify-center p-8 text-white">
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
        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <div className="relative w-45 h-45 rounded-full flex items-center justify-center mx-auto mb-4">
              {/* Gradient overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 opacity-80"></div>
              {/* Logo container */}
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
            <div className="flex items-center">
              <input
                type="checkbox"
                required
                id="terms"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="mr-2 text-sm text-gray-700">
                أوافق على{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-medium"
                >
                  الشروط والأحكام
                </a>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              style={{
                backgroundColor: "#1E56A0",
                boxShadow: "0 4px 6px rgba(30, 86, 160, 0.25)",
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
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">أو</span>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <button
                type="button"
                className="py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <span className="mr-2">oogle</span>
                <span className="text-red-500 font-bold">G</span>
              </button>
            </div>
            <p className="text-center mt-6 text-gray-600">
              هل لديك حساب بالفعل؟{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                تسجيل الدخول
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
