import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
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
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch user data and orders on load or page change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user profile
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

        // Fetch paginated orders
        const { data: ordersData } = await axios.get(
          `http://localhost:5000/api/orders/me?page=${page}&limit=${limit}`,
          { withCredentials: true }
        );
        setOrders(ordersData.orders);
        setTotalPages(Math.ceil(ordersData.total / limit));
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
  }, [navigate, page, limit]);

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

  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        withCredentials: true,
      });
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
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Helpers for status styles and progress
  const getStatusColor = (status) => {
    switch (status) {
      case "قيد الانتظار":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "تمت الموافقة":
        return "bg-green-100 text-green-800 border border-green-200";
      case "قيد التنفيذ":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "تم التوصيل":
        return "bg-indigo-100 text-indigo-800 border border-indigo-200";
      case "ملغي":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case "قيد الانتظار":
        return 25;
      case "تمت الموافقة":
        return 50;
      case "قيد التنفيذ":
        return 75;
      case "تم التوصيل":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-center" autoClose={3000} rtl />

      <div className="max-w-4xl mx-auto">
        {/* Header with tabs */}
        <div className="bg-white rounded-t-2xl shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-end">
            <div className="container mx-auto px-6 flex items-center relative h-20">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <img
                  src={preview || `http://localhost:5000${user.avatar}`}
                  alt="Avatar"
                  className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {editMode && (
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-2 right-2 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white cursor-pointer shadow-md hover:bg-blue-700 transition duration-200"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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

              <nav className="flex space-x-6 text-white font-semibold mt-16 ml-12">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-3 px-6 ${
                    activeTab === "profile"
                      ? "border-b-4 border-white"
                      : "text-blue-200 hover:text-white"
                  }`}
                >
                  الملف الشخصي
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`py-3 px-6 ${
                    activeTab === "orders"
                      ? "border-b-4 border-white"
                      : "text-blue-200 hover:text-white"
                  } relative`}
                >
                  الطلبات
                  <span className="absolute -top-1 -right-4 inline-flex items-center justify-center h-6 w-6 rounded-full bg-white text-indigo-700 font-bold text-sm">
                    {orders.length}
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8 pt-16 min-h-[400px]">
          {activeTab === "profile" ? (
            <div className="max-w-lg mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  معلوماتك الشخصية
                </h2>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    aria-label="تعديل البيانات"
                  >
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    تعديل
                  </button>
                )}
              </div>

              {/* Edit form */}
              {editMode ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
                    يمكنك تعديل بياناتك وتغيير كلمة المرور هنا.
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">
                      الاسم
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">
                      البريد الإلكتروني (غير قابل للتعديل)
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-3 border bg-gray-100 text-gray-500 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Password Section */}
                  <div className="border-t border-gray-300 pt-6 space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1 font-medium">
                        كلمة المرور الجديدة (اختياري)
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1 font-medium">
                        تأكيد كلمة المرور
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setPassword("");
                        setConfirmPassword("");
                        setSelectedFile(null);
                        setPreview("");
                      }}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      حفظ التغييرات
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* User info display */}
                  <div className="bg-gray-50 rounded-lg p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">الاسم</p>
                        <p className="font-semibold text-gray-800">
                          {user.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          البريد الإلكتروني
                        </p>
                        <p className="font-semibold text-gray-800">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">رقم الهاتف</p>
                        <p className="font-semibold text-gray-800">
                          {user.phone || "لم يتم تحديد رقم الهاتف"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick links */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition"
                    >
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
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      طلباتي
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition">
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      طلب جديد
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
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
                  طلباتك
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  طلب جديد
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
                  <div className="flex justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 text-blue-400"
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
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    لا توجد طلبات
                  </h3>
                  <p className="text-gray-500 mb-6">
                    لم تقم بأي طلبات حتى الآن.
                  </p>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    طلب جديد
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="p-5 hover:bg-gray-50 transition"
                      >
                        {/* Order header */}
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
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
                            <div>
                              <span className="font-semibold text-lg text-gray-800">
                                طلب #{order._id.slice(-6)}
                              </span>
                              <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString(
                                  "ar-EG",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* Progress bar */}
                        {[
                          "قيد الانتظار",
                          "تمت الموافقة",
                          "قيد التنفيذ",
                          "تم التوصيل",
                        ].includes(order.status) && (
                          <div className="mb-5">
                            <div className="flex justify-between text-xs text-gray-500 mb-1 px-1">
                              <span>تأكيد الطلب</span>
                              <span>تمت الموافقة</span>
                              <span>قيد التنفيذ</span>
                              <span>تم التوصيل</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                style={{
                                  width: `${getStatusProgress(order.status)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Order details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
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
                            <div>
                              <p className="text-sm text-gray-500">العنوان</p>
                              <p className="text-gray-700 font-medium">
                                {order.address}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                              />
                            </svg>
                            <div>
                              <p className="text-sm text-gray-500">الكمية</p>
                              <p className="text-gray-700 font-medium">
                                {order.quantity} أسطوانة
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Notes if any */}
                        {order.notes && (
                          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-400 mt-1"
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
                            <div>
                              <p className="text-sm text-blue-600 font-semibold mb-1">
                                ملاحظات
                              </p>
                              <p className="text-gray-700 text-sm">
                                {order.notes}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                          {order.status === "قيد الانتظار" && (
                            <button
                              onClick={() => cancelOrder(order._id)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              إلغاء الطلب
                            </button>
                          )}

                          {order.status === "تم التوصيل" && (
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 text-sm rounded-lg hover:bg-green-100 transition">
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
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              تقييم الخدمة
                            </button>
                          )}

                          {/* يمكنك إضافة أزرار أخرى مثل "تفاصيل الطلب" هنا */}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center py-6 border-t border-gray-200">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPage(Math.max(1, page - 1))}
                          disabled={page === 1}
                          className={`h-10 w-10 flex items-center justify-center rounded-lg ${
                            page === 1
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          aria-label="الصفحة السابقة"
                        >
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
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>

                        {Array.from({ length: totalPages }).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setPage(idx + 1)}
                            className={`h-10 w-10 flex items-center justify-center rounded-lg ${
                              page === idx + 1
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            aria-current={page === idx + 1 ? "page" : undefined}
                            aria-label={`الصفحة ${idx + 1}`}
                          >
                            {idx + 1}
                          </button>
                        ))}

                        <button
                          onClick={() =>
                            setPage(Math.min(totalPages, page + 1))
                          }
                          disabled={page === totalPages}
                          className={`h-10 w-10 flex items-center justify-center rounded-lg ${
                            page === totalPages
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          aria-label="الصفحة التالية"
                        >
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
