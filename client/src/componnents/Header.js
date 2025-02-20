import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiShoppingBag, FiStar, FiUser, FiLogOut, FiSettings, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShoppingCart } from "lucide-react";
import { supabase } from "../lib/createClient";
import { FiHome, FiShoppingCart, FiInfo, FiPhone } from "react-icons/fi"; // Import the icons
import { Modal, Button } from 'antd';
import Adminlogo from '../assets/admin-logo.png';

const Header = ({ isAdmin, setIsAdmin }) => {


  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // State for user dropdow
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



  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen); // Toggle dropdow

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

    // Close dropdown when a menu item is clicked for mobile
    const closeDropdownOnSelectMobile = () => setIsUserDropdownOpen(false);

    const handleProfileMobile = () =>{
      navigate('./user-information')
      closeDropdownOnSelectMobile()
    }
    const handleLogout = async () => {
      try {
        await supabase.auth.signOut();
        navigate("/user-signin");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
      closeDropdownOnSelectMobile()
    };
  

 
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when a menu item is clicked for mobile
    const closeDropdownOnSelectDesktop = () => setDropdownOpen(false);
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target )) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    const handleProfileDesktop = () =>{
      navigate('./user-information')
      closeDropdownOnSelectDesktop()
    }
    const handleLogoutDesktop = async () => {
      try {
        await supabase.auth.signOut();
        navigate("/user-signin");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
      closeDropdownOnSelectDesktop()
    };



  // State for email and profile picture
  const [storeEmail, setStoreEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");



  // Handle admin login
  // const handleAdminLogin = () => {
  //   setIsAdmin(true);
  //   localStorage.setItem('isAdmin', 'true'); // Store admin state
  //   navigate('/admin');  // Redirect to admin panel
  // };



  const [modal2Open, setModal2Open] = useState(false);
  const [emailAdmin, setEmailAdmin] = useState("")
  const [passAdmin, setAdminPass] = useState("")
  const [erroMsg, setErrorMsg] = useState("")

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
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true'); // Store admin state
        navigate('/admin');  // Redirect to admin panel
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




  return (
    <div>
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-white via-gray-500 to-gray-200 shadow-md p-8 fixed top-0 z-50">


        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div class="text-xl font-bold text-green-600 animate-bounce "><Link to={'/'}>Galaxy Shop</Link></div>

          <div>
            {/* Mobile Menu Icon */}
            <div className="md:hidden flex items-center justify-center gap-2">
              {/* User Icon with Dropdown */}
              <div className="relative">
                <User
                  onClick={toggleUserDropdown}
                  className="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer text-green-600"
                />
                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    <ul className="py-2">
                      <li>
                        
                        <a
                        onClick={handleProfileMobile}
                          // to={'./user-information'}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Profile
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handleLogout}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Admin Button */}
              <button onClick={() => setModal2Open(true)}>
                <img className="w-8 h-8" src={Adminlogo} alt="Admin Logo" />
              </button>

              {/* Menu Toggle Button */}
              <FiMenu
                onClick={handleMenuToggle}
                className="w-6 h-6 text-green-700 hover:text-gray-900 cursor-pointer"
              />
            </div>
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




          {/* Icons Section */}
          <div className="flex items-center space-x-4 hidden md:flex relative">
            {/* User Icon & Dropdown */}
            <div  className="relative">
              <User
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer text-green-600"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 transition-opacity duration-200">
                  <ul className="text-sm text-gray-700">
                    <li onClick={handleProfileDesktop} className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                    <li onClick={handleLogoutDesktop} className="p-2 hover:bg-gray-100 cursor-pointer text-red-500">Logout</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Shopping Cart Icon */}
            <ShoppingCart className="w-6 h-6 text-green-600 hover:text-gray-900 cursor-pointer" />

            {/* Admin Logo */}
            <button onClick={() => setModal2Open(true)}>
              <img className="w-10 h-10" src={Adminlogo} alt="Admin Logo" />
            </button>
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
  );
};

export default Header;
