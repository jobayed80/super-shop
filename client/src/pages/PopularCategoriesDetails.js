import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/createClient";
import { FiMenu, FiCoffee, FiGift, FiShoppingBag, FiPieChart, FiStar, IoArrowBack } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { GrFormNextLink } from "react-icons/gr";
import { motion } from "framer-motion";
import { Button, notification } from 'antd';
import { CheckCircleOutlined } from "@ant-design/icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { SmileOutlined } from "@ant-design/icons";

const categories = [
    { name: "Cakes" },
    { name: "Chocolates" },
    { name: "Pastries" },
    { name: "Candy" },
    { name: "Cupcakes" },
    { name: "Breads" },
    { name: "Muffins" },
    { name: "Donuts" },
    { name: "Brownies" },
    { name: "Pies Tarts" },
    { name: "Fudge" },
];

const PopularCategoriesDetails = () => {

      const [api, contextHolder] = notification.useNotification();
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(categoryName || "");
    const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth >= 768);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = window.innerWidth >= 768 ? 7 : 3;

    useEffect(() => {
        if (categoryName) {
            setSelectedCategory(categoryName);
            fetchProducts(categoryName);
        }
    }, [categoryName]);

    const fetchProducts = async (category) => {
        setLoading(true);
        const { data, error } = await supabase.from("products").select("*").eq("category", category);
        if (error) {
            setError(error.message);
        } else {
            setProducts(data);
        }
        setLoading(false);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        navigate(`/category/${category}`);
    };

    const handleNext = () => {
        if (startIndex + itemsPerPage < categories.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };



    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // Product already exists in the cart
            api.open({
                message: 'Product Already in Cart',
                description: `"${product.name}" is already in your shopping cart.`,
                placement: "bottomLeft",
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                style: {
                    backgroundColor: "#fff3cd", // Light yellow background for warning
                    color: "#856404", // Dark yellow text color
                    borderRadius: "8px", // Rounded corners
                    border: "1px solid #ffeeba", // Border color
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    padding: "16px", // Padding for better spacing
                    maxWidth: "400px", // Maximum width for desktop screens
                    width: "600px", // Responsive width for smaller screens
                },
            });
        } else {
            // Add product to the cart
            cart.push({ ...product, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));

            // Show success notification
            api.open({
                message: "Product Added to Cart!",
                description: `"${product.name}" has been successfully added to your shopping cart.`,
                placement: "bottomLeft",
                duration: 4,
                icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
                style: {
                    backgroundColor: "#f6ffed",
                    color: "#000",
                    borderRadius: "8px",
                    border: "1px solid #b7eb8f",
                },
            });
        }
    };



    return (
        <div className="bg-gradient-to-r from-white via-gray-200 to-gray-300">

            {contextHolder} {/* Add this line to render the notification context */}
            <div className=" min-h-screen p-6 pt-24 container mx-auto">
                {/* Top Section */}
                <motion.div className="text-center mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-16">Popular Categories</h1>
                    <p className="text-lg md:text-xl text-gray-600">Discover delicious treats from various categories and enjoy your shopping experience!</p>
                </motion.div>

                {/* Category Navigation */}
                <div className="flex items-center justify-center gap-4 my-10 flex-wrap">
                    <button onClick={handlePrev} className="px-2 py-1 bg-green-600 text-white rounded-lg disabled:opacity-50 text-lg" disabled={startIndex === 0}><IoArrowBackOutline></IoArrowBackOutline></button>
                    <div className="flex gap-2 overflow-x-auto flex-wrap">
                        {categories.slice(startIndex, startIndex + itemsPerPage).map(({ name }) => (
                            <div key={name} className={`px-2 py-2 text-sm md:text-lg flex items-center gap-3 shadow-sm rounded-lg cursor-pointer ${selectedCategory === name ? "bg-green-600 text-white" : "hover:bg-gray-100"}`} onClick={() => handleCategoryClick(name)}>
                                {name}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleNext} className="px-2 py-1 bg-green-600 text-white rounded-lg disabled:opacity-50 text-lg" disabled={startIndex + itemsPerPage >= categories.length}><GrFormNextLink></GrFormNextLink></button>
                </div>

                {/* Products Section */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    {loading ? (
                        <p className="text-center text-gray-600 text-xl">Loading products...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <motion.div key={product.id} whileHover={{ scale: 1.05 }} className="bg-white shadow-lg rounded-2xl p-6 group hover:shadow-xl transition-all">
                                    <LazyLoadImage src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer" onClick={() => navigate(`/product-details/${product.id}`)} />
                                    <h2 className="text-xl font-semibold">{product.name}</h2>
                                    <p className="text-sm text-gray-600">Category: {product.category}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-green-600 font-semibold">${product.price}</p>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }} className="bg-green-600 px-6 py-3 text-white rounded-lg hover:bg-green-400 text-sm">Add to Cart</button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Bottom Section */}
                <motion.div className="mt-12 p-10 text-center bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 rounded-lg shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <h2 className="text-2xl md:text-3xl font-semibold text-black">Thank You for Visiting!</h2>
                    <p className="text-lg md:text-xl text-gray-700">We hope you enjoy shopping with us and discover your new favorite treats. Don’t miss out on the best deals!</p>
                    <Button type="primary" size="large" className="mt-6 bg-green-600" icon={<CheckCircleOutlined />} onClick={() => notification.success({ message: 'Happy Shopping!' })}>
                        <Link to={"/products"}>Start Shopping</Link>
                    </Button>
                </motion.div>

                {/* Additional Content */}
                <motion.div className="mt-20 text-center text-gray-800">
                    <h2 className="text-xl font-semibold">Explore More of Our Treats</h2>
                    <p className="mt-4 text-lg">We have an ever-expanding range of delicious products waiting for you. Keep exploring to find your next favorite treat!</p>
                </motion.div>
            </div>

        </div>
    );
};

export default PopularCategoriesDetails;
