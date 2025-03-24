import React from "react";
import { Link } from "react-router-dom"; // استيراد Link من React Router
import logo from "../../assets/logo.png"; // تأكد من مسار الصورة

function Navbar() {
  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-36 max-sm:w-9" />
        </Link>

        {/* Navbar Links */}
        <div id="collapseMenu" className="max-lg:hidden lg:!block">
          <ul className="lg:flex gap-x-8 max-lg:space-y-4 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li>
              <Link
                to="/home"
                className="hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]"
              >
                Home
              </Link>
            </li>
            <li className="relative group">
              <Link
                to="/services"
                className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
              >
                Services
              </Link>
              <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-md top-full w-48 space-y-2 py-2">
                <li>
                  <Link
                    to="/gas-cylinders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Order Gas Cylinders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/heating-maintenance"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Heating System
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tank-refill"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Tank Refilling
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
              >
                Register as Agency
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-6">
          <button className="hidden lg:block px-4 py-2 text-sm rounded-full font-bold text-gray-500 border-2 bg-transparent hover:bg-gray-50 transition-all ease-in-out duration-300">
            Login
          </button>
          <button className="hidden lg:block px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
            Sign Up
          </button>

          {/* User Dropdown (when logged in) */}
          <div className="relative hidden lg:flex items-center">
            <img
              id="userAvatar"
              src="/images/client.jpg"
              alt="User Avatar"
              className="w-12 h-14 rounded-full cursor-pointer"
            />
            <ul
              id="userDropdown"
              className="absolute hidden bg-white shadow-lg rounded-md top-full mt-1 w-48 space-y-2 py-2 right-0"
            >
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button id="toggleOpen" className="lg:hidden">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
