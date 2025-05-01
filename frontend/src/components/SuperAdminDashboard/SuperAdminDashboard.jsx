// SuperAdminDashboard.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// استيراد المكونات الفرعية (تأكد من صحة المسارات)
import AgencyRequests from "./AgencyRequests"; // صفحة إدارة طلبات تسجيل الوكالات
import HeatingOrders from "./HeatingOrders"; // صفحة إدارة طلبات تركيب التدفئة
import GasFillingOrders from "./GasFillingOrders"; // صفحة إدارة طلبات تعبئة تنكات الغاز
import UserManagement from "./UserManagement"; // صفحة إدارة المستخدمين
import StatsDashboard from "./StatsDashboard"; // صفحة عرض الإحصائيات

const SuperAdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* الشريط الجانبي */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">لوحة الإدارة</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/SuperAdminDashboard/agency-requests"
                className="hover:underline"
              >
                طلبات تسجيل الوكالات
              </Link>
            </li>
            <li>
              <Link
                to="/SuperAdminDashboard/heating-orders"
                className="hover:underline"
              >
                طلبات تركيب التدفئة
              </Link>
            </li>
            <li>
              <Link
                to="/SuperAdminDashboard/gas-filling-orders"
                className="hover:underline"
              >
                طلبات تعبئة تنكات الغاز
              </Link>
            </li>
            <li>
              <Link
                to="/SuperAdminDashboard/user-management"
                className="hover:underline"
              >
                إدارة المستخدمين
              </Link>
            </li>
            <li>
              <Link to="/SuperAdminDashboard/stats" className="hover:underline">
                الإحصائيات
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6">
        <Routes>
          {/* الصفحة الافتراضية عند الدخول */}
          <Route
            index
            element={
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">
                  مرحباً بكم في لوحة الإدارة 
                </h1>
                <p className="text-gray-700">
                  يمكنك من خلال هذه اللوحة متابعة طلبات الخدمات، إدارة
                  المستخدمين، وعرض الإحصائيات العامة.
                </p>
              </div>
            }
          />
          {/* المسارات النسبية داخل لوحة الإدارة */}
          <Route path="agency-requests" element={<AgencyRequests />} />
          <Route path="heating-orders" element={<HeatingOrders />} />
          <Route path="gas-filling-orders" element={<GasFillingOrders />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="stats" element={<StatsDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
