import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import AgencyRequests from "./AgencyRequests";
import HeatingOrders from "./HeatingOrders";
import GasFillingOrders from "./GasFillingOrders";
import UserManagement from "./UserManagement";

// مكون الشريط الجانبي
const Sidebar = ({
  collapsed,
  toggleCollapse,
  navigationLinks,
  isActiveLink,
  handleLogout,
}) => {
  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col h-full`}
      dir="rtl"
    >
      {/* رأس الشريط الجانبي */}
      <div className="p-4 border-b border-slate-700 relative">
        {!collapsed && (
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-lg">
              <span className="text-xl">⚡</span>
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              لوحة التحكم
            </h2>
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
        >
          <svg
            className={`w-5 h-5 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* روابط التنقل */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navigationLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className={`group flex items-center ${
                  collapsed ? "p-3 justify-center" : "p-3 pl-4"
                } rounded-lg transition-all
                  ${
                    isActiveLink(link.path)
                      ? "bg-blue-600 shadow-md"
                      : "hover:bg-slate-700/50 text-slate-300 hover:text-white"
                  }`}
                title={collapsed ? link.label : ""}
              >
                <span className={`${!collapsed && "mr-3"} relative`}>
                  {link.icon}
                  {isActiveLink(link.path) && (
                    <span className="absolute -inset-1 bg-white/20 rounded-full blur-sm animate-pulse"></span>
                  )}
                </span>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-sm text-right">
                      {link.label}
                    </span>
                    {link.badge && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {link.badge > 99 ? "99+" : link.badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
                    {link.label}
                    {link.badge && (
                      <span className="bg-red-500 text-white text-xs px-1 rounded-full ml-1">
                        {link.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* قسم تسجيل الخروج */}
      <div className="p-3 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${
            collapsed ? "p-2 justify-center" : "p-2 pl-3"
          } bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg text-white text-sm transition-all`}
          title={collapsed ? "تسجيل الخروج" : ""}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {!collapsed && <span className="ml-2">تسجيل الخروج</span>}
        </button>
      </div>
    </aside>
  );
};

// مكون بطاقة الإحصائيات
const StatCard = ({ title, value, icon, color, subtitle }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow p-4 border-r-4 ${color} relative overflow-hidden`}
      dir="rtl"
    >
      <div className="absolute top-0 left-0 -mt-2 -ml-2 opacity-10 text-4xl">
        {icon}
      </div>
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">{title}</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {value !== undefined ? value.toLocaleString("ar-EG") : 0}
            </h2>
            {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
          </div>
          <div
            className={`rounded-full p-2 ${color
              .replace("border-r-", "bg-")
              .replace("500", "100")}`}
          >
            <div className={`text-${color.split("-")[1]}-600 text-xl`}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// مكون الصفحة الرئيسية للوحة التحكم
const DashboardHome = ({ stats, loading, error, fetchStats }) => {
  const statsCards = [
    {
      title: "إجمالي الوكالات",
      value: stats.totalAgencies,
      icon: "🏢",
      color: "border-r-blue-500",
      subtitle: "وكالة مسجلة",
    },
    {
      title: "الوكالات المقبولة",
      value: stats.agencyAccepted,
      icon: "✅",
      color: "border-r-green-500",
      subtitle: "وكالة معتمدة",
    },
    {
      title: "طلبات تركيب التدفئة",
      value: stats.totalHeatingOrders,
      icon: "🔥",
      color: "border-r-orange-500",
      subtitle: "طلب تركيب",
    },
    {
      title: "طلبات تعبئة الغاز",
      value: stats.totalGasFillingOrders,
      icon: "⛽",
      color: "border-r-cyan-500",
      subtitle: "طلب تعبئة",
    },
    {
      title: "إجمالي طلبات الغاز",
      value: stats.totalGasOrders,
      icon: "🛢️",
      color: "border-r-purple-500",
      subtitle: "طلب غاز",
    },
    {
      title: "إجمالي المستخدمين",
      value: stats.totalUsers,
      icon: "👥",
      color: "border-r-indigo-500",
      subtitle: "مستخدم مسجل",
    },
  ];

  return (
    <div className="p-6" dir="rtl">
      {/* العنوان الرئيسي */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">لوحة التحكم الرئيسية</h1>
            <p className="text-blue-100">عرض شامل لجميع البيانات والمقاييس</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-center">
              <div className="font-bold">
                {new Date().toLocaleDateString("ar-EG")}
              </div>
              <div className="text-sm opacity-80">
                {new Date().toLocaleDateString("ar-EG", { weekday: "long" })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* حالات التحميل والخطأ */}
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-right">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-full p-2 ml-3">
              <span className="text-red-500">⚠️</span>
            </div>
            <div>
              <h3 className="text-red-800 font-semibold">
                خطأ في تحميل البيانات
              </h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* شبكة الإحصائيات */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {statsCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>

          {/* الإجراءات السريعة */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">
              إجراءات سريعة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionLink
                to="/SuperAdminDashboard/agency-requests"
                icon="🏢"
                title="إدارة الوكالات"
                description="مراجعة طلبات تسجيل الوكالات"
                color="blue"
              />
              <QuickActionLink
                to="/SuperAdminDashboard/heating-orders"
                icon="🔥"
                title="طلبات التدفئة"
                description="متابعة طلبات تركيب التدفئة"
                color="orange"
              />
              <QuickActionLink
                to="/SuperAdminDashboard/gas-filling-orders"
                icon="⛽"
                title="تعبئة الغاز"
                description="إدارة طلبات تعبئة الغاز"
                color="cyan"
              />
              <QuickActionLink
                to="/SuperAdminDashboard/user-management"
                icon="👥"
                title="إدارة المستخدمين"
                description="إضافة وتعديل المستخدمين"
                color="indigo"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// مكون رابط الإجراء السريع
const QuickActionLink = ({ to, icon, title, description, color }) => {
  return (
    <Link
      to={to}
      className={`group p-4 bg-gradient-to-br from-${color}-50 to-${color}-100 hover:from-${color}-100 hover:to-${color}-200 rounded-lg transition-all border border-${color}-200 hover:border-${color}-300 text-right`}
      dir="rtl"
    >
      <div
        className={`text-${color}-600 text-3xl mb-3 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600 text-xs">{description}</p>
      <div
        className={`flex items-center mt-3 text-${color}-600 text-xs font-medium`}
      >
        <span>عرض التفاصيل</span>
        <svg
          className="w-3 h-3 ml-1 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
};

// المكون الرئيسي للوحة التحكم
const SuperAdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.error("خطأ في تسجيل الخروج:", err);
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("http://localhost:5000/api/stats", {
        withCredentials: true,
      });
      setStats(res.data);
    } catch (err) {
      setError("حدث خطأ أثناء جلب الإحصائيات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const isActiveLink = (path) => {
    if (
      path === "/SuperAdminDashboard" &&
      location.pathname === "/SuperAdminDashboard"
    ) {
      return true;
    }
    return location.pathname.includes(path) && path !== "/SuperAdminDashboard";
  };

  const navigationLinks = [
    {
      path: "/SuperAdminDashboard",
      label: "الصفحة الرئيسية",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      badge: null,
    },
    {
      path: "/SuperAdminDashboard/agency-requests",
      label: "طلبات تسجيل الوكالات",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      badge: stats.totalAgencies > 0 ? stats.totalAgencies : null,
    },
    {
      path: "/SuperAdminDashboard/heating-orders",
      label: "طلبات تركيب التدفئة",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
          />
        </svg>
      ),
      badge: stats.totalHeatingOrders > 0 ? stats.totalHeatingOrders : null,
    },
    {
      path: "/SuperAdminDashboard/gas-filling-orders",
      label: "طلبات تعبئة تنكات الغاز",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      badge:
        stats.totalGasFillingOrders > 0 ? stats.totalGasFillingOrders : null,
    },
    {
      path: "/SuperAdminDashboard/user-management",
      label: "إدارة المستخدمين",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      badge: stats.totalUsers > 0 ? stats.totalUsers : null,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden" dir="rtl">
      <Sidebar
        collapsed={sidebarCollapsed}
        toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        navigationLinks={navigationLinks}
        isActiveLink={isActiveLink}
        handleLogout={handleLogout}
      />

      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route
            index
            element={
              <DashboardHome
                stats={stats}
                loading={loading}
                error={error}
                fetchStats={fetchStats}
              />
            }
          />
          <Route path="agency-requests" element={<AgencyRequests />} />
          <Route path="heating-orders" element={<HeatingOrders />} />
          <Route path="gas-filling-orders" element={<GasFillingOrders />} />
          <Route path="user-management" element={<UserManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
