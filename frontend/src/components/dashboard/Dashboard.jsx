import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const fetchOrders = async () => {
   try {
     setLoading(true);
     const res = await axios.get("http://localhost:5000/api/orders", {
       withCredentials: true, // تأكد من إرسال الكوكيز مع الطلب
     });
     setOrders(res.data.orders);
     setLoading(false);
   } catch (err) {
     setError("حدث خطأ أثناء جلب الطلبات");
     setLoading(false);
   }
 };




  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
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
    } catch (err) {
      alert("خطأ في تحديث الحالة");
    }
  };

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-blue-800 text-right mb-6">
        لوحة إدارة الطلبات
      </h1>
      {loading && <p className="text-center">جاري تحميل الطلبات...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-right">الاسم</th>
                <th className="border border-gray-300 p-3 text-right">
                  الهاتف
                </th>
                <th className="border border-gray-300 p-3 text-right">
                  البريد الإلكتروني
                </th>
                <th className="border border-gray-300 p-3 text-right">
                  الكمية
                </th>
                <th className="border border-gray-300 p-3 text-right">
                  العنوان
                </th>
                <th className="border border-gray-300 p-3 text-right">
                  الموقع
                </th>
                <th className="border border-gray-300 p-3 text-right">
                  الحالة
                </th>
                <th className="border border-gray-300 p-3 text-right">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-3 text-right">
                    {order.fullName}
                  </td>
                  <td className="border border-gray-200 p-3 text-right">
                    {order.phone}
                  </td>
                  <td className="border border-gray-200 p-3 text-right">
                    {order.email}
                  </td>
                  <td className="border border-gray-200 p-3 text-right">
                    {order.quantity}
                  </td>
                  <td className="border border-gray-200 p-3 text-right">
                    {order.address}
                  </td>
                  <td className="border border-gray-200 p-3 text-right">
                    {order.location}
                  </td>
                  <td className="border border-gray-200 p-3 text-right">
                    {order.status}
                  </td>
                  <td className="border border-gray-200 p-3 text-right">
                    <button
                      onClick={() => updateStatus(order._id, "تمت الموافقة")}
                      className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                    >
                      اعتماد
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "قيد التنفيذ")}
                      className="bg-orange-600 text-white px-2 py-1 rounded text-sm mx-2"
                    >
                      تنفيذ
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "منتهي")}
                      className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                    >
                      إنهاء
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    لا توجد طلبات حالياً.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
