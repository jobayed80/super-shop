import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUser, FaShoppingCart, FaHome, FaBox, FaShoppingBag, FaListAlt, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get current route location

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Menu items with icons
  const menuItems = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/products", name: "Products", icon: <FaBox /> },
    { path: "/cart", name: "Cart", icon: <FaShoppingBag /> },
    { path: "/orders", name: "Orders", icon: <FaListAlt /> },
    { path: "/user-signin", name: "My Account", icon: <FaUserCircle /> },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Super Shop</h1>

          {/* Desktop and Tablet Menu */}
          <ul className="hidden lg:flex gap-6">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`hover:text-gray-200 flex items-center gap-2 ${location.pathname === item.path ? "font-bold" : ""}`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-white rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              className="py-2 px-4 text-gray-800 focus:outline-none"
            />
            <button className="bg-blue-500 p-2 hover:bg-blue-600">
              <FaSearch className="text-white" />
            </button>
          </div>

          {/* Icons */}
          <ul className="hidden lg:flex gap-4 items-center">
            <li><FaUser className="text-xl hover:text-gray-200 cursor-pointer" /></li>
            <li><FaShoppingCart className="text-xl hover:text-gray-200 cursor-pointer" /></li>
          </ul>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden text-2xl focus:outline-none">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-purple-600 to-blue-600 text-white shadow-lg z-50"
          >
            <div className="p-4">
              <button onClick={toggleMenu} className="text-2xl focus:outline-none mb-4">
                <FaTimes />
              </button>

              <ul className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={closeMenu}
                      className={`hover:text-gray-200 flex items-center gap-2 ${location.pathname === item.path ? "font-bold" : ""}`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Search Bar */}
              <div className="mt-4 flex items-center bg-white rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="py-2 px-4 text-gray-800 focus:outline-none flex-grow"
                />
                <button className="bg-blue-500 p-2 hover:bg-blue-600">
                  <FaSearch className="text-white" />
                </button>
              </div>

              {/* Mobile Icons */}
              <ul className="mt-4 flex gap-4">
                <li><FaUser className="text-xl hover:text-gray-200 cursor-pointer" /></li>
                <li><FaShoppingCart className="text-xl hover:text-gray-200 cursor-pointer" /></li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;