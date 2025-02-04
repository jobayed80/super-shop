
import React, { useEffect, useState } from "react";
import { supabase } from '../lib/createClient';
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiInfo } from "react-icons/fi";
import { Button, notification } from 'antd';
import { CheckCircleOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Import Ant Design styles
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage




const TopProduct = () => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [productsPerPage, setProductsPerPage] = useState(12); // Default for desktop
    const navigate = useNavigate();
    // const url = "https://galaxy-shop-server-user.onrender.com"

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
            setProductsPerPage(12); // Desktop (1024px and above)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
            // If the product is already in the cart, show a warning notification
            notification.warning({
                message: "Product Already in Cart",
                description: `${product.name} is already in your shopping cart.`,
                placement: "bottomLeft",
                duration: 4,
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
            // If the product is not in the cart, add it
            cart.push({ ...product, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));
            openNotification(product.name);
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


    // this is used for notification
    const openNotification = (productName) => {
        notification.open({
            message: (
                <div className="animate-fadeIn">
                    Product Added to Cart!
                </div>
            ),
            description: (
                <div className="animate-fadeIn">
                    "{productName}" has been successfully added to your shopping cart. Continue shopping or proceed to checkout.
                </div>
            ),
            icon: (
                <CheckCircleOutlined
                    className="animate-spin"
                    style={{ color: "#000", fontSize: "20px" }}
                />
            ),
            placement: "bottomLeft",
            style: {
                backgroundColor: "#DFE3EE", // RGB teal  background
                color: "#ffffff", // White text for message and description
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)", // Box shadow
                borderRadius: "10px", // Rounded corners
                border: "none",
            },
            duration: 4, // Auto-close after 4 seconds
            onClick: () => {
                console.log(`${productName} notification clicked!`);
            },
        });
    };




    return (
        <div className="p-4">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-2xl p-4 relative group hover:shadow-xl transition-all"
            // onClick={() => handleProductDetails(product.id)}
          >
            <div className="relative">
              <LazyLoadImage
                onClick={() => handleProductDetails(product.id)}
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
                // onClick={() => handleProductDetails(product.id)}
              />
              {/* Hover Icons */}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex justify-end items-start p-4 transition-all">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200 mr-2"
                  title="Add to Cart"
                >
                  <FiShoppingCart className="text-gray-700" size={20} />
                </button>
                <button
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200 mr-2"
                  title="Add to Wishlist"
                >
                  <FiHeart className="text-gray-700" size={20} />
                </button>
                <button
                  onClick={() => handleImageClick(product)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
                  title="Product Details"
                >
                  <FiInfo className="text-gray-700" size={20} />
                </button>
              </div>
            </div>
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
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

     
    </div>
    )
}

export default TopProduct