// src/components/HeatingOrders.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const HeatingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/heating-service-requests",
        {
          withCredentials: true,
        }
      );
      console.log("Heating orders response:", res.data);
      // تأكد من أن res.data.requests موجودة ومصفوفة
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

  // للعرض في الـ console تأكد من أن state يتم تحديثه بالشكل الصحيح.
  console.log("Orders state:", orders);

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

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-right">
        طلبات تركيب التدفئة المركزية
      </h1>
      {loading && <p>جاري تحميل الطلبات...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && orders && orders.length > 0 ? (
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">الاسم</th>
              <th className="border p-3">الهاتف</th>
              <th className="border p-3">البريد</th>
              <th className="border p-3">نوع الخدمة</th>
              <th className="border p-3">التاريخ المطلوب</th>
              <th className="border p-3">الرسالة</th>
              <th className="border p-3">تاريخ الطلب</th>
              <th className="border p-3">الحالة</th>
              <th className="border p-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border p-3">{order.fullName}</td>
                <td className="border p-3">{order.phone}</td>
                <td className="border p-3">{order.email}</td>
                <td className="border p-3">{order.serviceType}</td>
                <td className="border p-3">
                  {new Date(order.requestedDate).toLocaleDateString("ar-EG")}
                </td>
                <td className="border p-3">{order.message || "—"}</td>
                <td className="border p-3">
                  {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                </td>
                <td className="border p-3">{order.status}</td>
                <td className="border p-3 space-x-1">
                  <button
                    onClick={() => updateStatus(order._id, "قيد التنفيذ")}
                    className="bg-orange-500 text-white px-2 py-1 rounded text-sm"
                  >
                    تنفيذ
                  </button>
                  <button
                    onClick={() => updateStatus(order._id, "منتهي")}
                    className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                  >
                    إنهاء
                  </button>
                  <button
                    onClick={() => updateStatus(order._id, "مرفوض")}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    رفض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="text-center">لا توجد طلبات حالياً</p>
      )}
    </div>
  );
};

export default HeatingOrders;
