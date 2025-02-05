import React, { useEffect, useState } from "react";
import { supabase } from '../lib/createClient';
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiInfo , FiStar } from "react-icons/fi";
import { Button, notification } from 'antd';
import { CheckCircleOutlined, SmileOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Import Ant Design styles
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage

const TopProduct = () => {
  const [api, contextHolder] = notification.useNotification();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(12); // Default for desktop
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    handleResize(); // Set initial value based on screen size
    window.addEventListener("resize", handleResize); // Listen for screen size changes

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      setProductsPerPage(4); // Mobile (e.g., <640px)
    } else if (screenWidth < 1024) {
      setProductsPerPage(8); // Tablet (e.g., 640px - 1024px)
    } else {
      setProductsPerPage(8); // Desktop (1024px and above)
    }
  };

  const fetchData = async () => {
    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false }); // Fetch in descending order based on 'id';
    if (error) {
      console.error(error);
    } else {
      setProducts(data);
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

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleProductDetails = (id) => {
    // Save Scroll Position
    localStorage.setItem("scrollPosition", window.scrollY.toString());

    // Navigate to Product Details Page
    navigate(`/product-details/${id}`);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);


  return (
    <div className="container mx-auto mt-12 p-4 bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen">
      {contextHolder} {/* Add this line to render the notification context */}


      {/* Product Grid */}
      <div className="flex flex-col items-center justify-center p-8 bg-white">
        {/* Main Title with Gradient Text */}
        <h1 className="text-xl bg-gradient-to-b">
          A Brush of Perfection
        </h1>

        {/* Subtitle or Tagline */}
        <h2 className="mt-2 text-2xl font-medium font-extrabold ">
          Confectionary Creations
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-xl text-center text-gray-700 text-lg">
          Indulge in our collection of artisanal sweets, where every treat is crafted with passion and precision.
        
        </p>
      </div>
      <hr></hr>

      


      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {currentProducts.map((product) => (
    <div
      key={product.id}
      className="bg-white shadow-xl rounded-2xl p-4 relative group hover:shadow-2xl transition-all border border-gray-200 hover:border-gray-300"
    >
      <div className="relative">
        <LazyLoadImage
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => handleProductDetails(product.id)}
        />
        {/* Hover Icons */}
        <div onClick={() => handleProductDetails(product.id)} className="absolute inset-0 bg-red-800  opacity-0 group-hover:opacity-100 flex justify-end items-start p-4 transition-all">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            className="p-2 bg-red-300 rounded-full shadow-lg  mr-2 transition-all"
            title="Add to Cart"
          >
            <FiShoppingCart className="text-blue-600" size={20} />
          </button>
          <button
            className="p-2 bg-red-400 rounded-full shadow-lg mr-2 transition-all"
            title="Add to Wishlist"
          >
            <FiHeart className="text-red-500" size={20} />
          </button>
        </div>
      </div>
      <div onClick={() => handleProductDetails(product.id)}>
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <FiStar
                key={i}
                className={ratingValue <= (product.rating || 0) ? "text-red-400" : "text-red-300"}
                size={20}
              />
            );
          })}
        </div>
        {/* <p className="text-gray-700 mt-2 text-sm">{product.description}</p> */}
      </div>
      <div className="flex items-center justify-between mt-3">
        <p className="text-green-600 font-semibold pt-5">${product.price}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
          className="bg-blue-600 px-4 py-2 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  ))}
</div>

      


    {/* Pagination Controls */}
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 transition-all"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 transition-all"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
  );
};

export default TopProduct;