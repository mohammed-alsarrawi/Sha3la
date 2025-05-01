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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
const [page, setPage] = useState(1);
const [limit] = useState(3); // or whatever default page size you like
const [totalPages, setTotalPages] = useState(1);

  // Fetch user data and orders on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1) Fetch user profile
        const { data: userData } = await axios.get(
          "http://localhost:5000/api/users/me",
          { withCredentials: true }
        );
        setUser({
          name: userData.user.name,
          email: userData.user.email,
          phone: userData.user.phone || "",
          avatar: userData.user.avatar || "/default-avatar.png",
        });

        // 2) Fetch user orders
        const { data: ordersData } = await axios.get(
          "http://localhost:5000/api/orders/me",
          { withCredentials: true }
        );
        setOrders(ordersData.orders);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("يرجى تسجيل الدخول أولاً");
          navigate("/login");
        } else {
          toast.error("فشل في جلب البيانات");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Preview selected image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const fr = new FileReader();
    fr.onload = () => setPreview(fr.result);
    fr.readAsDataURL(file);
  };

  // Save profile changes
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

  // بعد تعريف useState و useEffect
  const cancelOrder = async (orderId) => {
    try {
      // أرسل DELETE إلى الباك إند
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        withCredentials: true,
      });
      // حدّث الـ state بإلغاء الطلب محلياً
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "ملغي" } : o))
      );
      toast.success("تم إلغاء الطلب بنجاح");
    } catch (err) {
      console.error("Error canceling order:", err);
      toast.error("حدث خطأ أثناء إلغاء الطلب");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-center" autoClose={3000} rtl />

      {/* User Card */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:max-w-2xl transform transition duration-300 hover:shadow-xl">
        <div className="h-24 bg-gradient-to-r from-blue-700 to-blue-900"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-6 -mt-12">
            {/* Avatar */}
            <div className="flex-shrink-0 relative">
              <img
                src={preview || `http://localhost:5000${user.avatar}`}
                alt="Avatar"
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {editMode && (
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 bg-blue-700 rounded-full text-white cursor-pointer shadow-md hover:bg-blue-800 transition-duration-200"
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
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* User Information */}
            <div className="flex-grow pt-5 md:pt-10">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  الملف الشخصي
                </h1>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition shadow-sm flex items-center"
                  >
                    تعديل
                  </button>
                )}
              </div>

              {editMode ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
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
                      className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Email (not editable) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="mt-1 block w-full px-4 py-2 border bg-gray-100 rounded-lg"
                    />
                  </div>

                  {/* Phone */}
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
                      className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      كلمة المرور الجديدة (اختياري)
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      تأكيد كلمة المرور
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setPassword("");
                        setConfirmPassword("");
                        setSelectedFile(null);
                        setPreview("");
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                    >
                      حفظ
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <p>
                    <span className="font-medium">الاسم:</span> {user.name}
                  </p>
                  <p>
                    <span className="font-medium">البريد الإلكتروني:</span>{" "}
                    {user.email}
                  </p>
                  <p>
                    <span className="font-medium">رقم الهاتف:</span>{" "}
                    {user.phone || "لا يوجد"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-md mx-auto mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              طلباتك السابقة والحالية
            </h2>
            <span className="bg-blue bg-opacity-20 px-3 py-1 rounded-full text-sm">
              {orders.length} طلب
            </span>
          </div>
        </div>

        {/* Orders Content */}
        <div className="p-4">
          {orders.length === 0 ? (
            <div className="py-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-300 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p className="text-gray-500 text-lg">لا توجد طلبات حتى الآن.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                طلب جديد
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {orders.map((o) => (
                <div
                  key={o._id}
                  className="py-4 transition-all hover:bg-gray-50 rounded-lg"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 ml-2">
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
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                          />
                        </svg>
                      </span>
                      <span className="font-medium text-gray-800">
                        #{o._id.slice(-6)}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        o.status === "قيد الانتظار"
                          ? "bg-gray-100 text-gray-800 border border-gray-200"
                          : o.status === "تمت الموافقة"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : o.status === "قيد التنفيذ"
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div>
                      <span className="text-gray-500">الكمية:</span>
                      <span className="font-medium mr-1">
                        {o.quantity} أسطوانة
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="text-gray-500">التاريخ:</span>
                      <span className="font-medium mr-1">
                        {new Date(o.createdAt).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 ml-1 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-gray-700">{o.address}</p>
                  </div>

                  {/* Notes (if any) */}
                  {o.notes && (
                    <div className="flex items-start mt-2 bg-gray-50 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 ml-1 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      <p className="text-gray-600 text-sm">{o.notes}</p>
                    </div>
                  )}

                  {/* Delivery progress (conditional) */}
                  {o.status === "قيد التنفيذ" && (
                    <div className="mt-3 mb-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>تأكيد الطلب</span>
                        <span>التحضير</span>
                        <span>التوصيل</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: "66%" }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Order time info */}
                  <div className="mt-3 text-xs text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {new Date(o.createdAt).toLocaleString("ar-EG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>

                  {/* Order Actions */}
                  <div className="mt-3 flex justify-end">
                    {o.status === "قيد الانتظار" && (
                      <button
                        onClick={() => cancelOrder(o._id)} // ← هنا ربط الدالة
                        className="text-red-600 text-sm hover:text-red-800 flex items-center mr-4"
                      >
                        {/* أيقونة سلة المهملات */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1" /* ... */
                        >
                          {/* …paths… */}
                        </svg>
                        إلغاء الطلب
                      </button>
                    )}

                    {o.status === "تم التوصيل" && (
                      <button className="text-green-600 text-sm hover:text-green-800 flex items-center mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                        تقييم الخدمة
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default Profile;
