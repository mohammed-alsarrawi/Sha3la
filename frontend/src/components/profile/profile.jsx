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
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg">جاري تحميل البيانات...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        rtl
      />
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">الملف الشخصي</h1>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                تعديل
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={preview || user.avatar}
                  alt="Avatar"
                  className="h-32 w-32 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src = "/default-avatar.png";
                  }}
                />
                {editMode && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      تغيير الصورة
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-grow">
              {editMode ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* الاسم */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
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
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* الايميل (غير قابل للتعديل) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      disabled
                      className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-md"
                    />
                  </div>

                  {/* رقم الهاتف */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* تغيير كلمة المرور */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      كلمة المرور الجديدة (اختياري)
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      تأكيد كلمة المرور
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* أزرار الحفظ / إلغاء */}
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                      حفظ
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <p>
                    <strong>الاسم:</strong> {user.name}
                  </p>
                  <p>
                    <strong>البريد الإلكتروني:</strong> {user.email}
                  </p>
                  <p>
                    <strong>رقم الهاتف:</strong> {user.phone}
                  </p>
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
