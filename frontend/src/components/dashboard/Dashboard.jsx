import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/orders", {
        withCredentials: true,
      });
      setOrders(res.data.orders);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("حدث خطأ أثناء جلب الطلبات");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status: newStatus },
        {
          withCredentials: true,
        }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
      setLoading(false);
    } catch (err) {
      console.error("Error updating status:", err);
      setError("خطأ في تحديث الحالة");
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    // Filter by status
    if (filter !== "all" && order.status !== filter) return false;

    // Search functionality
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.name?.toLowerCase().includes(searchLower) ||
        order.phone?.toLowerCase().includes(searchLower) ||
        order.email?.toLowerCase().includes(searchLower) ||
        order.address?.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "تمت الموافقة":
        return "bg-green-100 text-green-800";
      case "قيد التنفيذ":
        return "bg-orange-100 text-orange-800";
      case "منتهي":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="bg-gray-50 rounded-lg p-8 mx-auto max-w-md">
        <svg
          className="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          لا توجد طلبات
        </h3>
        <p className="mt-2 text-gray-500">
          لم يتم العثور على طلبات متطابقة مع معايير البحث الحالية
        </p>
        <button
          onClick={() => {
            setFilter("all");
            setSearchTerm("");
          }}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          عرض جميع الطلبات
        </button>
      </div>
    </div>
  );

  const renderLoadingState = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      <span className="mr-3 text-lg font-medium text-blue-700">
        جاري تحميل الطلبات...
      </span>
    </div>
  );

  const renderErrorState = () => (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 my-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
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
        <div className="mr-3">
          <h3 className="text-sm font-medium text-red-800">حدث خطأ</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error}</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={fetchOrders}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                لوحة إدارة الطلبات
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {filteredOrders.length === 0
                  ? "لا توجد طلبات حالياً"
                  : `إجمالي الطلبات: ${filteredOrders.length}`}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">جميع الطلبات</option>
                <option value="تمت الموافقة">تمت الموافقة</option>
                <option value="قيد التنفيذ">قيد التنفيذ</option>
                <option value="منتهي">منتهي</option>
              </select>

              {/* Refresh Button */}
              <button
                onClick={fetchOrders}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                تحديث
              </button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            renderLoadingState()
          ) : error ? (
            renderErrorState()
          ) : filteredOrders.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الاسم والتواصل
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      تفاصيل الطلب
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      العنوان
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
                      إجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="font-medium">{order.name}</div>
                        <div className="text-gray-500">{order.phone}</div>
                        <div className="text-gray-500">{order.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>
                          <span className="font-medium">الكمية:</span>{" "}
                          {order.quantity}
                        </div>
                        {order.notes && (
                          <div className="mt-1">
                            <span className="font-medium">ملاحظات:</span>{" "}
                            {order.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>{order.address}</div>
                        {order.location && (
                          <div className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer mt-1 text-xs">
                            عرض الموقع
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() =>
                              updateStatus(order._id, "تمت الموافقة")
                            }
                            className={`inline-flex items-center justify-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 ${
                              order.status === "تمت الموافقة"
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={order.status === "تمت الموافقة"}
                          >
                            اعتماد
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(order._id, "قيد التنفيذ")
                            }
                            className={`inline-flex items-center justify-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 ${
                              order.status === "قيد التنفيذ"
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={order.status === "قيد التنفيذ"}
                          >
                            تنفيذ
                          </button>
                          <button
                            onClick={() => updateStatus(order._id, "منتهي")}
                            className={`inline-flex items-center justify-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 ${
                              order.status === "منتهي"
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={order.status === "منتهي"}
                          >
                            إنهاء
                          </button>
                        </div>
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

export default Dashboard;
