import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import logo from "../../assets/logo.png"; // تأكد من مسار الصورة

function Login() {
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

      Swal.fire({
        icon: "success",
        title: "تم تسجيل الدخول بنجاح",
        text: response.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول",
      });
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
            <h2
              className="text-center text-2xl font-bold mb-6"
              style={{ color: "#163172" }}
            >
              تسجيل الدخول
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* اسم المستخدم */}
              <div>
                <label
                  className="text-sm mb-2 block"
                  style={{ color: "#163172" }}
                >
                  اسم المستخدم
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-sm px-4 py-3 rounded-md outline-none transition-colors"
                    style={{
                      border: "1px solid #D6E4F0",
                      backgroundColor: "#F6F6F6",
                      color: "#163172",
                    }}
                    placeholder="أدخل اسم المستخدم"
                  />
                </div>
              </div>

              {/* كلمة المرور */}
              <div>
                <label
                  className="text-sm mb-2 block"
                  style={{ color: "#163172" }}
                >
                  كلمة المرور
                </label>
                <div className="relative flex items-center">
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
              </div>

              {/* تذكرني */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 border-gray-300 rounded"
                    style={{
                      accentColor: "#1E56A0",
                    }}
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label
                    htmlFor="remember-me"
                    className="mr-3 block text-sm"
                    style={{ color: "#163172" }}
                  >
                    تذكرني
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="hover:underline font-semibold"
                    style={{ color: "#1E56A0" }}
                  >
                    نسيت كلمة المرور؟
                  </a>
                </div>
              </div>

              {/* زر تسجيل الدخول */}
              <div className="!mt-8">
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
              </div>

              {/* رابط التسجيل */}
              <div
                className="mt-8 p-4 rounded-lg text-center"
                style={{ backgroundColor: "#D6E4F0" }}
              >
                <p className="text-sm" style={{ color: "#163172" }}>
                  ليس لديك حساب؟{" "}
                  <a
                    href="#"
                    className="hover:underline font-semibold"
                    style={{ color: "#1E56A0" }}
                  >
                    سجل هنا
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
