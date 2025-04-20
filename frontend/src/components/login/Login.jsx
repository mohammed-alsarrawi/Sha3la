import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  // حالات الحقول
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password, rememberMe },
        { withCredentials: true }
      );

      toast.success(response.data.message || "تم تسجيل الدخول بنجاح", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        rtl: true,
      });

      // بعد إغلاق التنبيه، نعيد التوجيه للصفحة الرئيسية
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          rtl: true,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="font-[sans-serif]"
      style={{ backgroundColor: "#F6F6F6" }}
      dir="rtl"
    >
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div
            className="p-8 rounded-2xl shadow-lg"
            style={{
              backgroundColor: "#FFFFFF",
              borderTop: "8px solid #163172",
            }}
          >
            <img src={logo} alt="Logo" className="mx-auto mb-6 w-32" />
            <h2
              className="text-center text-2xl font-bold mb-6"
              style={{ color: "#163172" }}
            >
              تسجيل الدخول
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* البريد الإلكتروني */}
              <div>
                <label
                  className="text-sm mb-2 block"
                  style={{ color: "#163172" }}
                >
                  البريد الإلكتروني
                </label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-sm px-4 py-3 rounded-md outline-none transition-colors"
                  style={{
                    border: "1px solid #D6E4F0",
                    backgroundColor: "#F6F6F6",
                    color: "#163172",
                  }}
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>

              {/* كلمة المرور */}
              <div>
                <label
                  className="text-sm mb-2 block"
                  style={{ color: "#163172" }}
                >
                  كلمة المرور
                </label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-sm px-4 py-3 rounded-md outline-none transition-colors"
                  style={{
                    border: "1px solid #D6E4F0",
                    backgroundColor: "#F6F6F6",
                    color: "#163172",
                  }}
                  placeholder="أدخل كلمة المرور"
                />
              </div>

              {/* تذكرني */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="mr-2 text-sm" style={{ color: "#163172" }}>
                    تذكرني
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold"
                  style={{ color: "#1E56A0" }}
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>

              {/* زر تسجيل الدخول */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white transition-all hover:shadow-lg"
                style={{
                  backgroundColor: "#1E56A0",
                  boxShadow: "0 4px 6px rgba(30, 86, 160, 0.25)",
                }}
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

              {/* رابط التسجيل */}
              <p
                className="mt-6 text-center text-sm"
                style={{ color: "#163172" }}
              >
                ليس لديك حساب؟{" "}
                <Link
                  to="/register"
                  className="font-semibold hover:underline"
                  style={{ color: "#1E56A0" }}
                >
                  سجل هنا
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
