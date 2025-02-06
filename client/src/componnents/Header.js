import { useEffect, useState, useRef } from "react";


import { useNavigate, useLocation } from "react-router-dom"
import { FiShoppingBag, FiStar, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import { logo } from "../assets";

import Loading from "./Loading";
import ProductCard from "./ProductCard";
import { supabase } from "../lib/createClient";
import { Button, Modal, Input, Alert } from 'antd';
import * as LucideIcons from "lucide-react";
import { FaHome, FaShoppingCart, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { Sun, Moon, Monitor, Store, Book, Users, Settings, LogOut } from "lucide-react";
import HeaderTop from "./HeaderTop";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";




const Header = () => {

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState("johndoe@example.com");
  const [user, setUser] = useState(null);
  const bottomNavigation = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/products" },
    // { title: "Cart", link: "/cart" },
    { title: "Cart", link: "/cart" },
    { title: "Orders", link: "/orders" },
    { title: "My Account", link: "/user-signin" },
    { title: "About Us", link: "/about" },
    { title: "Contact Us", link: "/contact" },

    // { title: "Blog", link: "/blog" },
    // { title: "Sample", link: "/sample" },
  ];
  // Ref to detect clicks outside the dropdown
  const dropdownRef = useRef(null);
  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
   // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Close dropdown when a menu item is clicked
  const closeDropdownOnSelect = () => {
    setIsDropdownOpen(false); // Close dropdown when selecting a menu item
  };


  


  const navigate = useNavigate();
  // thsi used for email and profile picture and name collect
  const [storeEmail, setStoreEmail] = useState("")
  const [profileImage, setProfileImage] = useState("");

  const [modal2Open, setModal2Open] = useState(false);
  const [emailAdmin, setEmailAdmin] = useState("")
  const [passAdmin, setAdminPass] = useState("")
  const [erroMsg, setErrorMsg] = useState("")


  const [name, setName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);




  useEffect(() => {
    const filtered = products.filter((item: ProductProps) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText]);




  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // login('/admin')
    setErrorMsg("");

    try {
      // Query the `users` table to check if name and number exist
      const { data, error } = await supabase
        .from("admin")
        .select("*")
        .eq("email", emailAdmin)
        .eq("password", passAdmin)
        .single();

      if (error || !data) {
        // If the query fails, show a specific error based on the conditions
        if (error?.message.includes("No rows found") || !data) {
          // Case: Email and password don't match
          setErrorMsg("Invalid email or password. Please try again.");
        } else {
          // Any other Supabase-specific error
          setErrorMsg(`Unexpected error: ${error.message}`);
        }
      } else {
        // Successful login, redirect to the admin page
        localStorage.setItem("adminEmail", emailAdmin);
        localStorage.setItem("adminPassword", passAdmin)
        navigate("/admin");
      }
    } catch (err) {
      // If a general error occurs, show a notification
      if (err.message.includes("network")) {
        setErrorMsg("Network issue detected. Please check your connection.");
      } else {
        setErrorMsg("An unexpected error occurred. Please contact the authorities.");
      }
      setErrorMsg("An unexpected error occurred. Please try again.");
    }
  };
  // eta hocce jokhn admin login korben tokhn email and pass store hoyetader local device e
  useEffect(() => {
    // Check if email and password are stored in localStorage
    const savedEmail = localStorage.getItem("adminEmail");
    const savedPassword = localStorage.getItem("adminPassword");

    if (savedEmail) setEmailAdmin(savedEmail);
    if (savedPassword) setAdminPass(savedPassword);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // Log out the user
    
      navigate("/"); // Redirect to login page or home page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };


  // First useEffect: Check if the user is logged in and if the email is verified
  useEffect(() => {
    const checkSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session?.session) {
        const { user } = session.session;
        if (user?.email_confirmed_at) {
          setStoreEmail(user.email); // Store user information in the state
        } else {
          // setError("Please verify your email before accessing this page.");
          // // navigate('/user-signin')
        }
      }
    };
    checkSession();
  }, []); // Runs once when the component mounts





  return (
    <div >


      {/* <HeaderTop></HeaderTop> */}
      <div className="flex flex-col">
        {/* Navbar */}
        <nav className="w-full bg-gradient-to-r from-white via-gray-100 to-gray-200 shadow-md p-4 fixed top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold text-gray-900">Sweet Delights</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {bottomNavigation.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  {item.title}
                </a>
              ))}
            </div>

            {/* Icons Section */}
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer" />
              <User onClick={toggleDropdown} className="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer" />
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
                        <div className="cursor-pointer hover:bg-white hover:text-gray-900 rounded px-3 py-2 text-sm"><Link to={"/user-information"}>Profile</Link></div>
                        <div className="cursor-pointer hover:bg-white hover:text-gray-900 rounded px-3 py-2 text-sm">Settings</div>
                        <div className="cursor-pointer hover:bg-white hover:text-gray-900 rounded px-3 py-2 text-sm">Customer</div>
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

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
              </button>
            </div>

            
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4 md:hidden"
              >

                {bottomNavigation.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    className="text-gray-700 hover:text-gray-900 transition"
                  >
                    {item.title}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>





    </div>
  );
};

export default Header;
