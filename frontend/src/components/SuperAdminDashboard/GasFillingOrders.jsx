// src/components/GasFillingOrders.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const GasFillingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/gas-filling-orders",
        {
          withCredentials: true,
        }
      );
      setOrders(res.data.orders);
      setLoading(false);
    } catch (err) {
      setError("حدث خطأ أثناء جلب طلبات تعبئة تنكات الغاز");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/gas-filling-orders/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert("حدث خطأ في تحديث الحالة");
    }
  };

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-right">
        طلبات تعبئة تنكات الغاز
      </h1>
      {loading && <p>جاري تحميل الطلبات...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && orders.length > 0 ? (
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">الاسم</th>
              <th className="border p-3">الهاتف</th>
              <th className="border p-3">البريد الإلكتروني</th>
              <th className="border p-3">العنوان</th>
              <th className="border p-3">الكمية</th>
              <th className="border p-3">التاريخ</th>
              <th className="border p-3">الفترة</th>
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
                <td className="border p-3">{order.address}</td>
                <td className="border p-3">{order.quantity}</td>
                <td className="border p-3">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="border p-3">{order.timePreference}</td>
                <td className="border p-3">{order.status}</td>
                <td className="border p-3">
                  <button
                    onClick={() => updateStatus(order._id, "قيد التنفيذ")}
                    className="bg-orange-500 text-white px-2 py-1 rounded text-sm mr-1"
                  >
                    تنفيذ
                  </button>
                  <button
                    onClick={() => updateStatus(order._id, "منتهي")}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm mr-1"
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

export default GasFillingOrders;
