import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/createClient";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { notification } from 'antd';
import { CheckCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { FiMenu, FiCoffee, FiGift, FiShoppingBag, FiPieChart, FiStar } from "react-icons/fi";
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Slider from "react-slick"; // For carousel
import { IoArrowBackOutline } from "react-icons/io5";
import { GrFormNextLink } from "react-icons/gr";

const Product: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Default state is false (hidden menu)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  // Categories with icons
  const categories = [
    { name: "All", icon: FiCoffee }, // Added All category
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

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth >= 768);
      if (window.innerWidth < 768) {
        setItemsPerPage(4); // Mobile devices
      } else {
        setItemsPerPage(8); // Tablets and desktops
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleCategoryClick = (category) => {
  //   setSelectedCategory(category);
  //   fetchData(category);
  //   if (category === "All") {
  //     // Show all products when "All" is selected
  //     setProducts(products);
  //   } else {
  //     // Filter products based on selected category
  //     const filteredProducts = products.filter((product) => product.category === category);
  //     setProducts(filteredProducts);
  //   }
  // };

  const handleProductDetails = (id) => {
    localStorage.setItem("scrollPosition", window.scrollY.toString());
    navigate(`/product-details/${id}`);
  };


  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [categoriesPerPage, setCategoriesPerPage] = useState(10); // Default for desktop


  useEffect(() => {
    const updateCategoriesPerPage = () => {
      if (window.innerWidth < 640) {
        setCategoriesPerPage(4); // Mobile
      } else if (window.innerWidth < 1024) {
        setCategoriesPerPage(6); // Tablets
      } else {
        setCategoriesPerPage(10); // Desktop
      }
    };

    updateCategoriesPerPage();
    window.addEventListener("resize", updateCategoriesPerPage);
    return () => window.removeEventListener("resize", updateCategoriesPerPage);
  }, []);

  const nextCategoryPage = () => {
    if (currentCategoryIndex + categoriesPerPage < categories.length) {
      setCurrentCategoryIndex(currentCategoryIndex + categoriesPerPage);
    }
  };

  const prevCategoryPage = () => {
    if (currentCategoryIndex - categoriesPerPage >= 0) {
      setCurrentCategoryIndex(currentCategoryIndex - categoriesPerPage);
    }
  };



  const openNotification = () => {
    api.open({
      message: 'Notification Title',
      description: 'This is the content of the notification.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      api.open({
        message: 'Product Already in Cart',
        description: `"${product.name}" is already in your shopping cart.`,
        placement: "bottomLeft",
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        style: {
          backgroundColor: "#fff3cd",
          color: "#856404",
          borderRadius: "8px",
          border: "1px solid #ffeeba",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          maxWidth: "400px",
          width: "600px",
        },
      });
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
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



    const [startIndex, setStartIndex] = useState(0);
  
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

  return (

    <div className=" bg-gradient-to-r from-white via-gray-200 to-gray-400">
      <div className="container mx-auto py-10 ">
        {contextHolder} {/* for notification */}

        {/* Top Section with an Enhanced Announcement Banner */}
        <div className="mt-20 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-center py-4 text-white font-extrabold text-lg md:text-xl lg:text-2xl shadow-lg animate-pulse relative">
          <p className="px-4">
            🎉 Huge Sale! Get <span className="text-black bg-white px-2 py-1 rounded-md">20% OFF</span> on all items. Limited time offer! 🚀
          </p>
          <p className="text-sm md:text-base mt-1">Use code <span className="bg-black text-yellow-300 px-2 py-1 rounded-md">SWEET20</span> at checkout! Offer valid till <span className="underline">February 28th</span>. 🛍️</p>
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white animate-bounce">
            🍩
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white animate-bounce">
            🎂
          </div>
        </div>




        {/* Animated Side Menu */}
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

        <hr className="text-3xl mt-2"></hr>


        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">

          {/* Product Display */}
          <div>
            <h2 className="text-2xl font-bold mb-4 mt-10">
              {selectedCategory ? `Category: ${selectedCategory}` : "All Products"}
            </h2>
            {/* Product Cards will go here */}
          </div>
        </div>




        {/* Main Product Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            currentItems.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all"
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
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-green-600 font-semibold mt-5">${product.price}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination Section */}
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

        {/* Bottom Section: About and Contact */}
        <footer className="mt-12 bg-gradient-to-r from-white via-gray-200 to-gray-400 border-1 rounded-xl py-6">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">About Sweet Delights</h2>
            <p className="text-lg mb-4">
              Sweet Delights is your one-stop destination for the finest confectionery. We take pride in delivering the most delicious, freshly made cakes, chocolates, and other sweets. Our treats are crafted with love and only the best ingredients.
            </p>
            <p className="text-lg mb-4">
              Contact us at: <a href="mailto:support@sweetdelights.com" className="text-blue-500">support@sweetdelights.com</a>
            </p>
          </div>
        </footer>

        {/* Extra Bottom Banner */}
        <div className="bg-blue-400 rounded-lg text-center py-4 text-white font-bold">
          <p>🍬 Free shipping on orders over $50! 🍬</p>
        </div>
      </div>

    </div>
  );
};

export default Product;
