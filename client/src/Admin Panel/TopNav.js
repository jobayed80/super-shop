import React, { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

const TopNav = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      {/* Left Section - Brand Logo and Additional Links */}
      <div className="flex items-center space-x-8">
        {/* Brand Logo */}
        <div className="text-xl font-bold">AdminPanel</div>

        {/* Additional Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-gray-200 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-gray-200 transition-colors">
            Reports
          </a>
          <a href="#" className="hover:text-gray-200 transition-colors">
            Analytics
          </a>
        </div>
      </div>

      {/* Middle Section - Search Bar */}
      <div className="flex-grow max-w-md mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-200" />
        </div>
      </div>

      {/* Right Section - Icons and Profile Dropdown */}
      <div className="flex items-center space-x-6">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-gray-200 hover:text-white transition-colors"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <FaBell className="text-gray-200 hover:text-white transition-colors" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FaUserCircle className="text-gray-200 hover:text-white transition-colors" />
            <span className="text-gray-200 hover:text-white">John Doe</span>
            <FaChevronDown
              className={`text-gray-200 transition-transform ${
                isProfileDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-800 dark:text-white">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  admin@example.com
                </p>
              </div>
              <ul className="py-2">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FaUserCircle className="inline mr-2" />
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FaCog className="inline mr-2" />
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;