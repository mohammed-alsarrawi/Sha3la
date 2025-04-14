// AgencyRequests.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AgencyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/agency-requests", {
        withCredentials: true,
      });
      setRequests(res.data.requests);
      setLoading(false);
    } catch (err) {
      setError("حدث خطأ أثناء جلب طلبات الوكالات");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/agency-requests/${id}`,
        { status: newStatus },
        {
          withCredentials: true,
        }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (err) {
      alert("حدث خطأ أثناء تحديث حالة الطلب");
    }
  };

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-right">
        طلبات تسجيل الوكالات
      </h1>
      {loading && <p>جاري تحميل الطلبات...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">اسم الوكالة</th>
              <th className="border p-3">رقم الهاتف</th>
              <th className="border p-3">البريد الإلكتروني</th>
              <th className="border p-3">العنوان</th>
              <th className="border p-3">الموقع</th>
              <th className="border p-3">الحالة</th>
              <th className="border p-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="text-center">
                <td className="border p-3">{req.agencyName}</td>
                <td className="border p-3">{req.phoneNumber}</td>
                <td className="border p-3">{req.email}</td>
                <td className="border p-3">{req.address}</td>
                <td className="border p-3">{req.location}</td>
                <td className="border p-3">{req.status}</td>
                <td className="border p-3">
                  <button
                    onClick={() => updateStatus(req._id, "مقبولة")}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    قبول
                  </button>
                  <button
                    onClick={() => updateStatus(req._id, "مرفوضة")}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  >
                    رفض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AgencyRequests;
