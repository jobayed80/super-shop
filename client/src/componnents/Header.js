import { useEffect, useState, useRef } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";


import { useNavigate } from "react-router-dom"
import { FiShoppingBag, FiStar, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import { logo } from "../assets";

import Loading from "./Loading";
import ProductCard from "./ProductCard";
import { supabase } from "../lib/createClient";
import { Button, Modal, Input, Alert } from 'antd';
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import { FaHome, FaShoppingCart, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";




const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
  const bottomNavigation = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/products" },
    // { title: "Cart", link: "/cart" },
    { title: "Cart", link: "/cart" },
    { title: "Orders", link: "/orders" },
    { title: "My Account", link: "/user-signin" },

    // { title: "Blog", link: "/blog" },
    // { title: "Sample", link: "/sample" },
  ];
  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const handleLogout = () => {
    
    navigate("/");
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


  // Search user by email
  const handleSearch = async () => {

    try {
      const { data, error } = await supabase
        .from("users")
        .select("name, profileImage") // Select the columns you need
        .eq("email", storeEmail)
        .single();

      if (error) throw error;

      // Populate the form fields with the fetched data
      setName(data.name);
      // setStoreEmail(data.storeEmail);
      if (data.profileImage) {
        // Generate a public URL for the image
        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(data.profileImage);
        setProfileImage(publicUrlData.publicUrl || null);
      } else {
        setProfileImage(null);
      }
    } catch (error) {
      console.error("Error fetching user: ", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleSearch()
  })

  // Handle user logout from supabase
  const handleLogoutSupabase = async () => {
    try {
      await supabase.auth.signOut(); // Clear the session

      alert("You have successfully logged out.");
      navigate("/user-signin"); // Redirect to the login page
    } catch (error) {

    }
  };



  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const changeTheme = (mode) => setTheme(mode);


  return (
    <div className="w-full bg-whiteText md:sticky md:top-0 z-50">
      <div className="max-w-screen-xl mx-auto h-20 flex items-center justify-between px-4 lg:px-0">
        {/* Logo */}
        <Link to={"/"}>
          <img src="" alt="logo" className="w-44" />
        </Link>
        {/* SearchBar */}
        <div className="hidden md:inline-flex max-w-3xl w-full relative">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Search products..."
            className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-darkText sm:text-sm px-4 py-2"
          />
          {searchText ? (
            <IoClose
              onClick={() => setSearchText("")}
              className="absolute top-2.5 right-4 text-xl hover:text-red-500 cursor-pointer duration-200"
            />
          ) : (
            <IoSearchOutline className="absolute top-2.5 right-4 text-xl" />
          )}
        </div>


        {/* Search product will go here */}
        {searchText && (
          <div className="absolute left-0 top-20 w-full mx-auto max-h-[500px] px-10 py-5 bg-white z-20 overflow-y-scroll text-black shadow-lg shadow-skyText scrollbar-hide">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {filteredProducts?.map((item: ProductProps) => (
                  <ProductCard
                    key={item?._id}
                    item={item}
                    setSearchText={setSearchText}
                  />
                ))}
              </div>
            ) : (
              <div className="py-10 bg-gray-50 w-full flex items-center justify-center border border-gray-600 rounded-md">
                <p className="text-xl font-normal">
                  Nothing matches with your search keywords{" "}
                  <span className="underline underline-offset-2 decoration-[1px] text-red-500 font-semibold">{`(${searchText})`}</span>
                </p>
                . Please try again
              </div>
            )}
          </div>
        )}

        {/* Menubar */}
        <div className="flex items-center gap-x-6 ">

        <div className="relative inline-block text-left">
      <button onClick={toggleDropdown} className="flex items-center space-x-2">
        <img
          src="https://cdn.dribbble.com/userupload/16446497/file/original-7015e2af048f5a617357ff0ca9a6d10b.png?resize=1024x768&vertical=center"
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
  
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-4 border-b dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-white">Devon Lane</p>
            <p className="text-sm text-gray-500">info@example.com</p>
          </div>
          <div className="flex justify-around p-3 border-b dark:border-gray-700">
            <button onClick={() => changeTheme("light")} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
              <LucideIcons.Sun size={20} />
            </button>
            <button onClick={() => changeTheme("dark")} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
              <LucideIcons.Moon size={20} />
            </button>
            <button onClick={() => changeTheme("system")} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
              <LucideIcons.Monitor size={20} />
            </button>
          </div>
          <ul className="p-2">
            <Link to={'/user-information'} className="flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <LucideIcons.Store size={18} /> <span>Profile</span>
            </Link>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <LucideIcons.Book size={18} /> <span>Documentation</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <LucideIcons.Users size={18} /> <span>Affiliate</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <LucideIcons.Settings size={18} /> <span>Settings</span>
            </li>
          </ul>
          <div className="border-t dark:border-gray-700">
            <button className="w-full flex items-center space-x-2 p-3 hover:bg-gray-200 dark:hover:bg-gray-700">
              <LucideIcons.LogOut size={18} /> <span>Log Out</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
          <button
            onClick={() => setModal2Open(true)}
            className="text-sm px-4 py-2 bg-gray-400 text-white rounded hover:bg-blue-600 duration-200"
          >
            Admin
          </button>
        </div>
      </div>





      <div className="w-full bg-darkText text-whiteText">
        {/* Navbar */}
        <nav className="bg-gray-900 shadow-lg py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center h-16">

              {/* Desktop Menu */}
              <div className="hidden md:flex md:items-center md:space-x-6">
                {bottomNavigation.map(({ title, link }) => {
                  // const isActive = location.pathname === link;
                  return (
                    <Link
                      to={link}
                      key={title}
                      // className={`uppercase text-sm font-semibold text-white/90 hover:text-white duration-200 relative overflow-hidden group ${isActive ? "text-yellow-500" : ""}`}
                    >
                      {title}
                      {/* <span className={`inline-flex w-full h-[1px] bg-white absolute bottom-0 left-0 transform ${isActive ? "translate-x-0" : "-translate-x-[105%]"} group-hover:translate-x-0 duration-300`} /> */}
                    </Link>
                  );
                })}
              </div>

              {/* Hamburger Menu for Mobile */}
              <div className="absolute -top-79  right-0 p-4 md:hidden">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </button>
              </div>

            </div>
          </div>


          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 z-50 bg-gray-800 w-[200px]"
              initial={{ opacity: 0, x: "-100%" }} // Start off-screen
              animate={{ opacity: 1, x: 0 }} // Slide in from left
              exit={{ opacity: 0, x: "-100%" }} // Slide out to left
              transition={{ duration: 0.3 }} // Set animation duration
            >
              <div className="flex flex-col space-y-4 pt-12 px-6">
                {bottomNavigation.map(({ title, link }, index) => {
                  // const isActive = location.pathname === link;
                  return (
                    <Link
                      to={link}
                      key={title}
                      onClick={() => setIsMenuOpen(false)} // Close menu on click
                      // className={`flex items-center space-x-4 text-white text-lg font-semibold hover:text-yellow-500 ${isActive ? "text-yellow-500" : ""}`}
                    >
                      {/* Render icon based on the menu item */}
                      {index === 0 && <FaHome />}
                      {index === 1 && <FaShoppingCart />}
                      {index === 2 && <FaInfoCircle />}
                      {index === 3 && <FaShoppingCart />}
                      {index === 4 && <FaShoppingCart />}
                      {index === 5 && <FaShoppingCart />}
                      {index === 6 && <FaShoppingCart />}
                      {index === 7 && <FaShoppingCart />}
                      <span>{title}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}

        </nav>

        {/* Admin Login Modal */}
        <Modal
          title={
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-center"
            >
              Admin Panel
            </motion.div>
          }
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
          maskClosable={false}
          keyboard={false}
          footer={null}
          bodyStyle={{ padding: "24px", borderRadius: "8px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <p className="text-lg font-semibold text-gray-600">Welcome to the Admin Panel</p>
              <p className="text-sm text-gray-500">Please log in with your credentials to access the dashboard.</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4 max-w-md mx-auto">
              {erroMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm font-medium text-center"
                >
                  {erroMsg}
                </motion.p>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  id="email"
                  type="text"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  value={emailAdmin}
                  onChange={(e) => setEmailAdmin(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  value={passAdmin}
                  onChange={(e) => setAdminPass(e.target.value)}
                />
              </div>

              <Button
                type="primary"
                className="w-full py-3 text-lg font-semibold bg-blue-500 border-none hover:bg-blue-600 rounded-lg"
                onClick={handleAdminLogin}
              >
                Login
              </Button>
            </form>
          </motion.div>
        </Modal>
      </div>


    </div>
  );
};

export default Header;
