import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/createClient";
import { FiMenu, FiCoffee, FiGift, FiShoppingBag, FiPieChart, FiStar } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import Loading from "../componnents/Loading";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { notification } from 'antd';
import { CheckCircleOutlined, SmileOutlined } from "@ant-design/icons";


// Categories with icons
const categories = [
  { name: "Cakes", icon: FiCoffee },
  { name: "Chocolates", icon: FiGift },
  { name: "Pastries", icon: FiShoppingBag },
  { name: "Candy", icon: FiPieChart },
  { name: "Cupcakes", icon: FiStar },
  { name: "Breads", icon: FiShoppingBag },
  { name: "Muffins", icon: FiCoffee },
  { name: "Donuts", icon: FiGift },
  { name: "Brownies", icon: FiShoppingBag },
  { name: "Pies Tarts", icon: FiPieChart },
  { name: "Fudge", icon: FiStar },
];

const Product: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth >= 768);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage, setItemsPerPage] = useState(8); // Items per page
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const fetchData = async (category = "") => {
    setLoading(true);
    let query = supabase.from("products").select("*").order("id", { ascending: false });
    if (category) query = query.eq("category", category);

    const { data, error } = await query;
    if (error) {
      console.error(error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle screen resize for menu and items per page
  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth >= 768);

      // Adjust items per page based on screen size
      if (window.innerWidth < 768) {
        setItemsPerPage(4); // Mobile devices
      } else {
        setItemsPerPage(8); // Tablets and desktops
      }
    };

    // Call handleResize initially to set the correct values
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchData(category);
    if (window.innerWidth < 768) setIsMenuOpen(false);
  };

  const handleProductDetails = (id) => {
    localStorage.setItem("scrollPosition", window.scrollY.toString());
    navigate(`/product-details/${id}`);
  };



  const openNotification = () => {
    api.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  
 const handleAddToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
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


  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container flex h-screen max-w-screen-2xl mx-auto py-10 px-4 lg:px-0">
      {/* Animated Side Menu */}
      
      
      {contextHolder} {/* // this part used for notification */}


      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed z-20 bg-white shadow-lg w-64 p-4 md:relative md:flex md:flex-col h-full md:translate-x-0"
      >
        <div className="flex justify-between items-center md:hidden mb-4">
          <p className="text-xl font-bold">Categories</p>
          <button onClick={() => setIsMenuOpen(false)}>
            <IoClose size={24} />
          </button>
        </div>
        <ul className="space-y-2 border-2 rounded shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          {categories.map(({ name, icon: Icon }) => (
            <li
              key={name}
              className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all ${
                selectedCategory === name
                  ? "bg-blue-500 text-white font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleCategoryClick(name)}
            >
              <Icon size={20} />
              {name}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Menu Button for Small Screens */}
        <button
          className="md:hidden p-2 bg-blue-500 text-white rounded-lg mb-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FiMenu size={20} />
        </button>

        {loading ? (
          <Loading />
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {selectedCategory ? `Category: ${selectedCategory}` : "All Products"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white shadow-lg rounded-2xl p-4 group hover:shadow-xl transition-all"
                >
                  <LazyLoadImage
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    onClick={() => handleProductDetails(product.id)}
                  />
                  <div onClick={() => handleProductDetails(product.id)}>
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="text-sm text-gray-600">Category: {product.category}</p>
                    <p className="text-gray-700 mt-2">Description: {product.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-green-600 font-semibold mt-2">${product.price}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
                className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;