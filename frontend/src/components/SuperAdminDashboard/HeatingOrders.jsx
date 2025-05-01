import React, { useState, useEffect } from "react";
import axios from "axios";

const HeatingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/heating-service-requests",
        {
          withCredentials: true,
        }
      );

      if (res.data && Array.isArray(res.data.requests)) {
        setOrders(res.data.requests);
      } else {
        setOrders([]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching heating orders:", err);
      setError("حدث خطأ أثناء جلب طلبات تركيب التدفئة");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/heating-service-requests/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert("حدث خطأ في تحديث حالة الطلب");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "منتهي":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            منتهي
          </span>
        );
      case "قيد التنفيذ":
        return (
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
            قيد التنفيذ
          </span>
        );
      case "مرفوض":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            مرفوض
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            جديد
          </span>
        );
    }
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ar-EG", options);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                طلبات تركيب التدفئة المركزية
              </h1>
              <div className="mt-3 sm:mt-0 flex space-x-2 space-x-reverse">
                <select
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">جميع الطلبات</option>
                  <option value="منتهي">منتهي</option>
                  <option value="قيد التنفيذ">قيد التنفيذ</option>
                  <option value="مرفوض">مرفوض</option>
                  <option value="جديد">جديد</option>
                </select>
                <button
                  onClick={fetchOrders}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  تحديث
                </button>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-50 p-4 m-4 rounded-md">
              <div className="flex">
                <div className="mr-3 flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                لا توجد طلبات
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                لم يتم العثور على طلبات تركيب التدفئة المركزية
              </p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && filteredOrders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      العميل
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      معلومات الخدمة
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      التواريخ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الرسالة
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الحالة
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.phone}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.serviceType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="text-gray-900 font-medium">
                            التاريخ المطلوب:
                          </div>
                          <div className="text-gray-500">
                            {formatDate(order.requestedDate)}
                          </div>
                        </div>
                        <div className="text-sm mt-2">
                          <div className="text-gray-900 font-medium">
                            تاريخ الطلب:
                          </div>
                          <div className="text-gray-500">
                            {formatDate(order.createdAt)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs overflow-hidden text-ellipsis">
                          {order.message || "—"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {order.status !== "قيد التنفيذ" && (
                          <button
                            onClick={() =>
                              updateStatus(order._id, "قيد التنفيذ")
                            }
                            className="text-orange-600 hover:text-orange-900 ml-4"
                          >
                            تنفيذ
                          </button>
                        )}
                        {order.status !== "منتهي" && (
                          <button
                            onClick={() => updateStatus(order._id, "منتهي")}
                            className="text-green-600 hover:text-green-900 ml-4"
                          >
                            إنهاء
                          </button>
                        )}
                        {order.status !== "مرفوض" && (
                          <button
                            onClick={() => updateStatus(order._id, "مرفوض")}
                            className="text-red-600 hover:text-red-900"
                          >
                            رفض
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeatingOrders;
