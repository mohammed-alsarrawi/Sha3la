// src/components/StatsDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const StatsDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/stats", {
        withCredentials: true,
      });
      setStats(res.data);
      setLoading(false);
    } catch (err) {
      setError("حدث خطأ أثناء جلب الإحصائيات");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        الإحصائيات العامة
      </h1>
      {loading && <p>جاري تحميل الإحصائيات...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-100 rounded shadow text-center">
            <h2 className="text-2xl font-bold">{stats.totalAgencies || 0}</h2>
            <p>إجمالي الوكالات</p>
          </div>
          <div className="p-4 bg-blue-100 rounded shadow text-center">
            <h2 className="text-2xl font-bold">{stats.agencyAccepted || 0}</h2>
            <p>الوكالات المقبولة</p>
          </div>
          <div className="p-4 bg-blue-100 rounded shadow text-center">
            <h2 className="text-2xl font-bold">{stats.totalGasOrders || 0}</h2>
            <p>إجمالي طلبات الغاز</p>
          </div>
          <div className="p-4 bg-blue-100 rounded shadow text-center">
            <h2 className="text-2xl font-bold">{stats.totalHeatingOrders || 0}</h2>
            <p>طلبات تركيب التدفئة</p>
          </div>
          <div className="p-4 bg-blue-100 rounded shadow text-center">
            <h2 className="text-2xl font-bold">{stats.totalGasFillingOrders || 0}</h2>
            <p>طلبات تعبئة تنكات الغاز</p>
          </div>
          <div className="p-4 bg-blue-100 rounded shadow text-center">
            <h2 className="text-2xl font-bold">{stats.totalUsers || 0}</h2>
            <p>إجمالي المستخدمين</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;