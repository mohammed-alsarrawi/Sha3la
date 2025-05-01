// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// صفحات ومكونات
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import OrderGasCylinders from "./components/services/OrderGasCylinders";
import HeatingSystem from "./components/services/HeatingSystem";
import RegisterAgency from "./components/RegisterAgency/RegisterAgency";
import GasFilling from "./components/services/GasFilling";
import Dashboard from "./components/dashboard/Dashboard";
import SuperAdminDashboard from "./components/SuperAdminDashboard/SuperAdminDashboard";
import Profile from "./components/profile/profile";
import Logout from "./components/logout/Loguot";

import axios from "axios";
axios.defaults.withCredentials = true;

// لفحص المسار الحالي واختبار الإخفاء
const Layout = ({ children }) => {
  const location = useLocation(); // :contentReference[oaicite:2]{index=2}
  // مصفوفة المسارات التي نريد إخفاء Navbar/Footer عليها
  const hiddenPaths = [
    "/login",
    "/register",
    "/Dashboard",
    "/SuperAdminDashboard",
  ];

  // إذا بدأ pathname بأي مسار من hiddenPaths، نخفي Nav وFooter
  const hideNavFooter = hiddenPaths.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(path + "/") // :contentReference[oaicite:3]{index=3}
  );

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        rtl
      />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order-gas" element={<OrderGasCylinders />} />
          <Route path="/agency" element={<RegisterAgency />} />
          <Route path="/HeatingSystem" element={<HeatingSystem />} />
          <Route path="/GasFilling" element={<GasFilling />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route
            path="/SuperAdminDashboard/*"
            element={<SuperAdminDashboard />}
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
