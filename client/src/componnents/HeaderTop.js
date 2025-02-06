import { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { useNavigate , useLocation } from "react-router-dom"
import { Sun, Moon, Monitor, Store, Book, Users, Settings, LogOut } from "lucide-react";
import { Button, Modal, Input, Alert } from 'antd';
import { supabase } from "../lib/createClient";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";



const bottomNavigation = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/products" },
    { title: "Cart", link: "/cart" },
    { title: "Orders", link: "/orders" },
    { title: "My Account", link: "/user-signin" },
    { title: "About Us", link: "/#" },
    { title: "Contact Us", link: "/#" },
];


const HeaderTop = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

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





    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsNavbarVisible(false);
            } else {
                setIsNavbarVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const [menuOpen, setMenuOpen] = useState(false);




    return (

        <>
            <div className="flex flex-col min-h-screen bg-gradient-to-r from-white via-gray-200 to-gray-400">
                {/* Hero Section */}
                <div className="flex-grow container mx-auto flex flex-col lg:flex-row items-center justify-between p-8 ">
            {/* Left Side: Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                    Sweeten Your Day <br />
                    With Our <br />
                    <span className="text-pink-500">Delicious Treats!</span>
                </h1>
                <button className="mt-6 px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300 font-semibold">
                    Shop Now
                </button>
                <p className="mt-6 text-gray-600 text-lg">
                    Explore our wide range of handcrafted candies, chocolates, and desserts. Perfect for every occasion!
                </p>
            </div>

            {/* Right Side: Image with Overlay on Mobile */}
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center p-6 relative">
                <img
                    // src="https://www.slazzer.com/downloads/dc3dda21-e3f2-11ef-a897-b347d7ab6478/image_prev_ui.png"
                    src="https://img.freepik.com/free-photo/top-view-collection-isolated-breakfast-muffins_23-2148297930.jpg?uid=R170429557&ga=GA1.1.453133905.1736260813&semt=ais_hybrid"
                    alt="Confectionary Hero"
                    className="w-96 h-auto transform hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center lg:hidden bg-black bg-opacity-50 text-white p-4 text-center text-xl font-semibold">
                    Sweeten Your Day With Our Delicious Treats!
                </div>
            </div>
        </div>
            </div>

            {/* Admin Login Modal */}
            {/* <Modal
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
            </Modal> */}


        </>
    )
}

export default HeaderTop