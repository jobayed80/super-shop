import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiShoppingBag, FiStar, FiUser, FiLogOut, FiSettings, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShoppingCart } from "lucide-react";
import { supabase } from "../lib/createClient";
import { FiHome, FiShoppingCart, FiInfo, FiPhone } from "react-icons/fi"; // Import the icons

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("johndoe@example.com");
  const [name, setName] = useState("jobayed");


  const bottomNavigation = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/products" },
    { title: "Cart", link: "/cart" },
    { title: "Orders", link: "/orders" },
    { title: "My Account", link: "/user-signin" },
    { title: "About Us", link: "/about" },
    { title: "Contact Us", link: "/contact" },
  ];

  // Ref to detect clicks outside the dropdown
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when a menu item is clicked
  const closeDropdownOnSelect = () => setIsDropdownOpen(false);




  // State for email and profile picture
  const [storeEmail, setStoreEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-white via-gray-100 to-gray-200 shadow-md p-4 fixed top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-900">Sweet Delights</div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center justify-center gap-3">
            <User
              onClick={toggleDropdown}
              className="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer"
            />
            <FiMenu
              onClick={handleMenuToggle}
              className="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer"
            />

          </div>

          <div className="hidden md:flex space-x-6">
            {bottomNavigation.map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className={`text-gray-800 font-semibold transition-all duration-200 ease-in-out 
            ${location.pathname === item.link ? "text-green-600 font-semibold" : "hover:text-green-600"}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
          {/* Search Bar (Centered on mobile and desktop) */}
          <div className="hidden md:block w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 border border-gray-300 rounded-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>


          {/* Icons Section */}
          <div className="flex items-center space-x-4 hidden md:flex">
            <User
              onClick={toggleDropdown}
              className="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer"
            />
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer" />
          </div>

          <div className="flex items-center space-x-4 ">
            {/* User Icon */}
            <div className="relative">

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 top-8 w-64 bg-gradient-to-r from-white via-gray-200 to-gray-400 rounded-md shadow-lg mt-5"
                  >
                    {/* Profile Info */}
                    <div className="flex items-center space-x-4 my-3 ml-2">
                      <img
                        src="https://img.freepik.com/free-vector/cake-factory-banner-template_23-2148861831.jpg"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-semibold">{name}</div>
                        <div className="text-sm">{email}</div>
                      </div>
                    </div>
                    <hr className="border-gray-400 mb-3" />
                    {/* Menu Items */}
                    <div className="space-y-2">
                      <div onClick={closeDropdownOnSelect} className="cursor-pointer hover:bg-white hover:text-gray-900 rounded px-3 py-2 text-sm"><Link to={"/user-information"}>Profile</Link></div>
                      <div onClick={closeDropdownOnSelect} className="cursor-pointer hover:bg-white hover:text-gray-900 rounded px-3 py-2 text-sm">Settings</div>
                      <div onClick={closeDropdownOnSelect} className="cursor-pointer hover:bg-white hover:text-gray-900 rounded px-3 py-2 text-sm">Customer</div>
                      <hr className="bg-red-200"></hr>
                      <div
                        className="cursor-pointer hover:bg-white hover:text-gray-900 rounded px-3 py-2 text-sm"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>




        </div>

        {/* Mobile Menu (Appears when the menu icon is clicked) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-0 right-0 bg-gradient-to-r from-gray-400 via-white-500 to-gray-600 w-2/4 h-screen shadow-2xl shadow-green-500 p-4 md:hidden rounded-xl"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
            >
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-gra-600">Sweet Delights</div>
                <FiX
                  onClick={handleMenuToggle}
                  className="w-6 h-6 text-gra-600 cursor-pointer"
                />
              </div>
              <hr className="border-t-2 border-white my-4" />

              <div className="mt-4">
                {bottomNavigation.map((item, index) => (
                  <Link
                    key={item.title}
                    to={item.link}
                    className={`flex items-center space-x-2 py-2 text-gray-700 hover:text-green-900 transition duration-300 ${location.pathname === item.link ? 'bg-green-500 text-gray-800' : ''}`}
                    onClick={handleMenuToggle}
                  >
                    {/* Add corresponding icons */}
                    {item.title === "Home" && <FiHome />}
                    {item.title === "Shop" && <FiShoppingCart />}
                    {item.title === "Cart" && <FiShoppingCart />}
                    {item.title === "Orders" && <FiShoppingCart />}
                    {item.title === "My Account" && <FiUser />}
                    {item.title === "About Us" && <FiInfo />}
                    {item.title === "Contact Us" && <FiPhone />}

                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Header;
