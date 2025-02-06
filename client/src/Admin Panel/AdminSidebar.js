import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaChartLine,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const AdminSidebar = ({isAdmin, setIsAdmin}) => {
  const navigate = useNavigate();
  
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if the current route matches the link
  const isActive = (path) => location.pathname === path;

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false);
    }
  };




  // Handle Logout Function
  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Remove admin session
    navigate("/"); // Redirect to home page (or login page)
    window.location.reload(); // Refresh page to reset state
  };


  return (
    <>
      {/* Mobile Menu Icon */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-white bg-blue-600 rounded-lg focus:outline-none"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40`}
      >
        {/* Top Section - User Profile */}
        <div className="p-5 text-center border-b border-gray-700">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-700 flex items-center justify-center">
            <img
              src="https://via.placeholder.com/150" // Replace with your profile image URL
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </div>
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-sm text-gray-400">Admin</p>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="flex-grow p-3 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                onClick={handleLinkClick}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive("/admin/dashboard")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <MdDashboard className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/product-management"
                onClick={handleLinkClick}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive("/admin/product-management")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaBox className="mr-3" />
                Product Management
              </Link>
            </li>
            <li>
              <Link
                to="/admin/sales-report"
                onClick={handleLinkClick}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive("/admin/sales-report")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaChartLine className="mr-3" />
                Sales Report
              </Link>
            </li>
            <li>
              <Link
                to="/admin/customers"
                onClick={handleLinkClick}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive("/admin/customers")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaUsers className="mr-3" />
                Customers
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                onClick={handleLinkClick}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive("/admin/settings")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaCog className="mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom Section - Logout */}
        <div className="p-3 border-t border-gray-700">
          <Link
           
            onClick={handleLogout}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              isActive("/admin/logout")
                ? "bg-red-600 text-white"
                : "hover:bg-gray-700"
            }`}
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;