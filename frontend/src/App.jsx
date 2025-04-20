// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar"; 
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
      <Navbar />
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
    </Router>
  );
}

export default App;
