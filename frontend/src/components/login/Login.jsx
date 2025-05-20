// src/components/login/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../../assets/logo.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password, rememberMe },
        { withCredentials: true }
      );
      toast.success(res.data.message || "تم تسجيل الدخول بنجاح", {
        position: "top-center",
        autoClose: 2000,
        rtl: true,
      });
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول", {
        position: "top-center",
        autoClose: 4000,
        rtl: true,
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
            src="https://plus.unsplash.com/premium_photo-1661964131234-fda88ca041c5?q=80&w=2071"
            alt="Gas Ordering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 opacity-75 flex flex-col items-center justify-center p-8 text-white">
            <h2 className="text-4xl font-bold mb-4">مرحباً بعودتك!</h2>
            <p className="text-xl mb-6 text-center">
              أدخل بياناتك للمتابعة والحصول على أسرع خدمة توصيل غاز.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full ml-2 bg-white/20 flex items-center justify-center mr-2">
                  ✓
                </span>
                <span>تسجيل آمن وسريع</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full ml-2 bg-white/20 flex items-center justify-center mr-2">
                  ✓
                </span>
                <span>تتبع الطلب بسهولة</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full ml-2 bg-white/20 flex items-center justify-center mr-2">
                  ✓
                </span>
                <span>دعم عملاء 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <div className="relative w-36 h-36 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 opacity-80"></div>
              <div className="relative z-10 bg-white rounded-full p-5 shadow-lg">
                <img
                  src={logo}
                  alt="الشعار"
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              تسجيل الدخول
            </h1>
            <p className="text-gray-600">أدخل بريدك الإلكتروني وكلمة المرور</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني"
                required
                autoComplete="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="mr-2 text-sm text-gray-700">تذكرني</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              style={{ backgroundColor: "#1E56A0" }}
            >
              {loading ? (
                <span className="inline-flex items-center">
                  <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  جاري تسجيل الدخول...
                </span>
              ) : (
                "تسجيل الدخول"
              )}
            </button>

            <p className="text-center text-gray-600">
              ليس لديك حساب بالفعل؟{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                سجل هنا
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
