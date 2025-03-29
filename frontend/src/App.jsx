// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar"; 
import Home from "./components/home/Home"; 
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import OrderGasCylinders from "./components/services/OrderGasCylinders";
import HeatingSystem from "./components/services/HeatingSystem";
import RegisterAgency from "./components/RegisterAgency/RegisterAgency";


function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
