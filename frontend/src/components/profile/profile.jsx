// src/components/profile/Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "/default-avatar.png",
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  // جلب بيانات المستخدم عند التحميل
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/users/me", {
          withCredentials: true,
        });
        setUser({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone || "",
          avatar: data.user.avatar || "/default-avatar.png",
        });
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("يرجى تسجيل الدخول أولاً");
          navigate("/login");
        } else {
          toast.error("فشل في جلب بيانات المستخدم");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  // معاينة الصورة المختارة
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const fr = new FileReader();
    fr.onload = () => setPreview(fr.result);
    fr.readAsDataURL(file);
  };

  // حفظ التعديلات
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("phone", user.phone);
    if (password) formData.append("password", password);
    if (selectedFile) formData.append("avatar", selectedFile);

    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/users/me",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUser((u) => ({
        ...u,
        name: data.user.name,
        phone: data.user.phone,
        avatar: data.user.avatar || u.avatar,
      }));
      toast.success("تم تحديث البيانات بنجاح");
      setEditMode(false);
      setPassword("");
      setConfirmPassword("");
      setSelectedFile(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "حدث خطأ أثناء التحديث");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-[#1E56A0] border-t-[#D6E4F0] animate-spin"></div>
          <span className="text-lg font-medium text-[#163172]">
            جاري تحميل البيانات...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        rtl
      />
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:max-w-2xl transform transition duration-300 hover:shadow-xl">
        <div className="h-24 bg-gradient-to-r from-[#1E56A0] to-[#163172]"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-6 -mt-12">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={preview || `http://localhost:5000${user.avatar}`}
                  alt="Avatar"
                  className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {editMode && (
                  <div className="absolute bottom-0 right-0">
                    <label
                      htmlFor="avatar-upload"
                      className="flex items-center justify-center w-8 h-8 bg-[#1E56A0] rounded-full text-white cursor-pointer shadow-md hover:bg-[#163172] transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-grow pt-5 md:pt-10">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-[#163172]">
                  الملف الشخصي
                </h1>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-[#1E56A0] text-white rounded-md hover:bg-[#163172] transition duration-200 shadow-sm flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    تعديل
                  </button>
                )}
              </div>

              {editMode ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* الاسم */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      required
                      className="block w-full px-4 py-3 border border-[#D6E4F0] rounded-lg focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent transition duration-200"
                    />
                  </div>

                  {/* الايميل (غير قابل للتعديل) */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      البريد الإلكتروني
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#D6E4F0] bg-[#F6F6F6] text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        disabled
                        className="block w-full rounded-r-lg px-4 py-3 border border-[#D6E4F0] bg-[#F6F6F6] text-gray-500"
                      />
                    </div>
                  </div>

                  {/* رقم الهاتف */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      رقم الهاتف
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#D6E4F0] bg-[#F6F6F6] text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={user.phone}
                        onChange={(e) =>
                          setUser({ ...user, phone: e.target.value })
                        }
                        className="block w-full rounded-r-lg px-4 py-3 border border-[#D6E4F0] focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent transition duration-200"
                      />
                    </div>
                  </div>

                  {/* تغيير كلمة المرور */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      كلمة المرور الجديدة (اختياري)
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#D6E4F0] bg-[#F6F6F6] text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-r-lg px-4 py-3 border border-[#D6E4F0] focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent transition duration-200"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      تأكيد كلمة المرور
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#D6E4F0] bg-[#F6F6F6] text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </span>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full rounded-r-lg px-4 py-3 border border-[#D6E4F0] focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent transition duration-200"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {/* أزرار الحفظ / إلغاء */}
                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setPassword("");
                        setConfirmPassword("");
                        setSelectedFile(null);
                        setPreview("");
                      }}
                      className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 shadow-sm"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#1E56A0] text-white rounded-lg hover:bg-[#163172] transition duration-200 shadow-sm"
                    >
                      حفظ التغييرات
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-5 mt-4">
                  <div className="flex items-center p-3 rounded-lg bg-[#F6F6F6]">
                    <div className="w-10 h-10 rounded-full bg-[#D6E4F0] flex items-center justify-center text-[#1E56A0]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <div className="text-xs text-gray-500">الاسم</div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 rounded-lg bg-[#F6F6F6]">
                    <div className="w-10 h-10 rounded-full bg-[#D6E4F0] flex items-center justify-center text-[#1E56A0]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <div className="text-xs text-gray-500">
                        البريد الإلكتروني
                      </div>
                      <div className="font-medium">{user.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 rounded-lg bg-[#F6F6F6]">
                    <div className="w-10 h-10 rounded-full bg-[#D6E4F0] flex items-center justify-center text-[#1E56A0]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <div className="text-xs text-gray-500">رقم الهاتف</div>
                      <div className="font-medium">
                        {user.phone || "لا يوجد"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
