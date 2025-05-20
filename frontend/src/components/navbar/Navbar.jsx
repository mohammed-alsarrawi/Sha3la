import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const servicesRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users/me", {
        withCredentials: true,
      });
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location]);

  // Auto-redirect admin users to SuperAdminDashboard
  useEffect(() => {
    if (user && user.role === "admin") {
      // Only redirect if not already on admin dashboard or login page
      if (
        location.pathname !== "/SuperAdminDashboard" &&
        location.pathname !== "/login"
      ) {
        navigate("/SuperAdminDashboard", { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Active link styles
  const activeLinkClass = "text-blue-600 font-bold";
  const normalLinkClass =
    "text-gray-700 hover:text-blue-600 transition-colors duration-200";

  const isActive = (path) => {
    return location.pathname === path ? activeLinkClass : normalLinkClass;
  };

  return (
    <header dir="rtl" className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
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
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center space-x-8 space-x-reverse">
            <li>
              <Link
                to="/"
                className={`font-semibold ${isActive(
                  "/"
                )} transition-all duration-200 pb-1 border-b-2 ${
                  location.pathname === "/"
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
              >
                الصفحة الرئيسية
              </Link>
            </li>

            {/* Services Dropdown */}
            <li className="relative" ref={servicesRef}>
              <button
                className={`font-semibold ${normalLinkClass} flex items-center group`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                خدماتنا
                <svg
                  className={`w-4 h-4 mr-1 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {servicesOpen && (
                <ul className="absolute bg-white shadow-lg rounded-md mt-2 right-0 w-56 text-right border border-gray-100 py-1 overflow-hidden transition-all duration-200 ease-in-out">
                  <li>
                    <Link
                      to="/order-gas"
                      className="block px-4 py-3 hover:bg-blue-50 transition-colors duration-150"
                      onClick={() => setServicesOpen(false)}
                    >
                      طلب اسطوانات الغاز
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/HeatingSystem"
                      className="block px-4 py-3 hover:bg-blue-50 transition-colors duration-150"
                      onClick={() => setServicesOpen(false)}
                    >
                      أنظمة التدفئة المركزية
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/GasFilling"
                      className="block px-4 py-3 hover:bg-blue-50 transition-colors duration-150"
                      onClick={() => setServicesOpen(false)}
                    >
                      تعبئة خزانات الغاز
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Other links */}
            {!user && (
              <li>
                <Link
                  to="/agency"
                  className={`font-semibold ${isActive(
                    "/agency"
                  )} transition-all duration-200 pb-1 border-b-2 ${
                    location.pathname === "/agency"
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  سجل كوكالة
                </Link>
              </li>
            )}

            {user?.role === "user" && (
              <li>
                <Link
                  to="/agency"
                  className={`font-semibold ${isActive(
                    "/agency"
                  )} transition-all duration-200 pb-1 border-b-2 ${
                    location.pathname === "/agency"
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  سجل كوكالة
                </Link>
              </li>
            )}

            {user?.role === "agency" && (
              <li>
                <Link
                  to="/dashboard"
                  className={`font-semibold ${isActive(
                    "/dashboard"
                  )} transition-all duration-200 pb-1 border-b-2 ${
                    location.pathname === "/dashboard"
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  لوحة الوكالة
                </Link>
              </li>
            )}

            {user?.role === "admin" && (
              <li>
                <Link
                  to="/SuperAdminDashboard"
                  className={`font-semibold ${isActive(
                    "/SuperAdminDashboard"
                  )} transition-all duration-200 pb-1 border-b-2 ${
                    location.pathname === "/SuperAdminDashboard"
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  لوحة المدير
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/about"
                className={`font-semibold ${isActive(
                  "/about"
                )} ml-7 transition-all duration-200 pb-1 border-b-2 ${
                  location.pathname === "/about"
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
              >
                عن الشركة
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`font-semibold ${isActive(
                  "/contact"
                )} transition-all duration-200 pb-1 border-b-2 ${
                  location.pathname === "/contact"
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
              >
                تواصل معنا
              </Link>
            </li>
          </ul>
        </nav>

        {/* User actions */}
        <div className="hidden md:flex items-center space-x-3 space-x-reverse">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow"
              >
                التسجيل
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 space-x-reverse px-6 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="relative ml-4">
                  <img
                    src={
                      user.avatar
                        ? `http://localhost:5000${user.avatar}`
                        : "/default-avatar.png"
                    }
                    alt="Avatar"
                    className="w-9 h-9 rounded-full border object-cover"
                  />
                  <span className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <span className="font-medium text-gray-800">{user.name}</span>
              </button>

              {dropdownOpen && (
                <ul className="absolute mt-2 bg-white shadow-xl rounded-md w-48 text-right right-0 border border-gray-100 overflow-hidden z-50">
                  <li className="border-b border-gray-100 px-4 py-3">
                    <span className="block text-sm text-gray-500">مرحبًا!</span>
                    <span className="block text-sm font-semibold truncate">
                      {user.name}
                    </span>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 hover:bg-blue-50 transition-colors duration-150"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      ملفي الشخصي
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-right flex items-center px-4 py-3 hover:bg-red-50 text-red-600 transition-colors duration-150"
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
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      تسجيل الخروج
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t border-gray-200 py-2 px-4 shadow-inner"
        >
          <ul className="space-y-3 py-2">
            <li>
              <Link
                to="/"
                className={`block py-2 px-1 ${isActive("/")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                الصفحة الرئيسية
              </Link>
            </li>

            {/* Mobile Services Dropdown */}
            <li className="border-b border-gray-100 pb-2">
              <button
                className="flex items-center justify-between w-full py-2 px-1 text-gray-700"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>خدماتنا</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {servicesOpen && (
                <ul className="mt-2 mr-4 space-y-1 border-r-2 border-gray-100 pr-2">
                  <li>
                    <Link
                      to="/order-gas"
                      className="block py-2 text-gray-600 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      طلب اسطوانات الغاز
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/HeatingSystem"
                      className="block py-2 text-gray-600 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      أنظمة التدفئة المركزية
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/GasFilling"
                      className="block py-2 text-gray-600 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      تعبئة خزانات الغاز
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Other Mobile Links */}
            {!user && (
              <li>
                <Link
                  to="/agency"
                  className={`block py-2 px-1 ${isActive("/agency")}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  سجل كوكالة
                </Link>
              </li>
            )}

            {user?.role === "user" && (
              <li>
                <Link
                  to="/agency"
                  className={`block py-2 px-1 ${isActive("/agency")}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  سجل كوكالة
                </Link>
              </li>
            )}

            {user?.role === "agency" && (
              <li>
                <Link
                  to="/dashboard"
                  className={`block py-2 px-1 ${isActive("/dashboard")}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  لوحة الوكالة
                </Link>
              </li>
            )}

            {user?.role === "admin" && (
              <li>
                <Link
                  to="/SuperAdminDashboard"
                  className={`block py-2 px-1 ${isActive(
                    "/SuperAdminDashboard"
                  )}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  لوحة المدير
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/about"
                className={`block py-2 px-1 ${isActive("/about")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                عن الشركة
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block py-2 px-1 ${isActive("/contact")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                تواصل معنا
              </Link>
            </li>

            {/* Mobile User Actions */}
            <div className="pt-4 border-t border-gray-100">
              {!user ? (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="block w-full py-2 text-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    التسجيل
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 space-x-reverse p-2 bg-gray-50 rounded-lg">
                    <img
                      src={
                        user.avatar
                          ? `http://localhost:5000${user.avatar}`
                          : "/default-avatar.png"
                      }
                      alt="Avatar"
                      className="w-10 h-10 rounded-full border object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block w-full py-2 text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ملفي الشخصي
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full py-2 text-center text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
