import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Pages and components
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

// Stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Axios configuration
import axios from "axios";
axios.defaults.withCredentials = true;

// Stripe configuration
const stripePromise = loadStripe("your-publishable-key-from-stripe");

// Layout للصفحات العادية (مع Navbar و Footer)
const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

// Layout لصفحات الادمن (بدون Navbar و Footer)
const AdminLayout = ({ children }) => {
  return <main>{children}</main>;
};

// Wrapper لتحديد أي Layout يستخدم بناءً على المسار
const LayoutSelector = ({ children }) => {
  const location = useLocation();

  // تحقق إذا كان المسار يبدأ بـ /SuperAdminDashboard
  const isAdminPath = location.pathname.startsWith("/SuperAdminDashboard");

  return isAdminPath ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <DefaultLayout>{children}</DefaultLayout>
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
      <LayoutSelector>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Wrap OrderGasCylinders with Elements */}
          <Route
            path="/order-gas"
            element={
              <Elements stripe={stripePromise}>
                <OrderGasCylinders />
              </Elements>
            }
          />

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
      </LayoutSelector>
    </Router>
  );
}

export default App;
