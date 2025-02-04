import React from 'react'

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from '../lib/createClient';
import { FaStar } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { Button, notification } from 'antd';
import { CheckCircleOutlined } from "@ant-design/icons";


const CartDetails = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [totalComments, setTotalComments] = useState(0);
    const navigate = useNavigate();

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commentImage, setCommentImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();

            if (error) console.error(error);
            else setProduct(data);
        };

        const fetchComments = async () => {
            const { data, count, error } = await supabase
                .from("comments")
                .select("*", { count: "exact" })
                .eq("product_id", id)
                .order("created_at", { ascending: false });

            if (error) console.error(error);
            else {
                setComments(data);
                setTotalComments(count);
            }
        };

        fetchProduct();
        fetchComments();
    }, [id]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        if (!product || !product.id) {
            console.error("Error: Product data is missing");
            return;
        }

        let imageUrl = null;

        if (commentImage) {
            const file = commentImage;
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `comments/${fileName}`;

            const { data: imageData, error: imageError } = await supabase
                .storage
                .from("images")
                .upload(filePath, file);

            if (imageError) {
                console.error("Error uploading image:", imageError);
                return;
            }

            const { data: publicUrlData } = supabase
                .storage
                .from("images")
                .getPublicUrl(filePath);

            imageUrl = publicUrlData.publicUrl;
        }

        const { data, error } = await supabase
            .from("comments")
            .insert([
                {
                    product_id: product.id,
                    user_name: "Anonymous",
                    comment: newComment,
                    image_url: imageUrl,
                },
            ])
            .select("*");

        if (error) {
            console.error("Error adding comment:", error);
            return;
        }

        setComments([data[0], ...comments]);
        setNewComment("");
        setCommentImage(null);
    };

    if (!product) return <p>Loading...</p>;



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
        <div className="max-w-5xl mx-auto p-6">

            {/* Back Button */}
            <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded transition-all duration-300 hover:bg-blue-600" onClick={() => navigate(-1)}>
                ← Back
            </button>




            {/* Product Details */}
            {/* <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto my-8 transition-all duration-300 hover:shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    Product Image
                    <div className="relative group">
                        <img
                            src={product.image_url || "https://via.placeholder.com/300"}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    Product Information
                    <div className="space-y-4">
                        <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-green-600 text-2xl font-semibold">${product.price}</p>

                        Product Details
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Category:</strong> {product?.category}</p>
                            <p><strong>Weight:</strong> {product?.weight}</p>
                            <p><strong>Unit:</strong> {product?.unit}</p>
                            <p><strong>Build Date:</strong> {product?.buildDate}</p>
                            <p><strong>Expire Date:</strong> {product?.expireDate}</p>
                        </div>

                        Reviews
                        <div className="flex items-center text-gray-600 mt-4">
                            <FaStar className="text-yellow-500 mr-2" />
                            <span>{product?.reviews || 0} Reviews</span>
                        </div>

                        Add to Cart Button
                        <div className="mt-4">
                            <button
                                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
            <div class="font-[sans-serif] p-4">
                <div class="xl:max-w-screen-xl lg:max-w-screen-lg max-w-xl mx-auto">
                    <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-8 max-lg:gap-12 max-sm:gap-8">
                        <div class="w-full lg:sticky top-0 lg:col-span-3">
                            <div class="flex flex-row gap-2">

                                {/* Product Image Section */}
                                <div className="relative flex-1 group">
                                    {/* Main Product Image */}
                                    <img
                                        src={product.image_url || "https://via.placeholder.com/300"}
                                        alt="Product"
                                        className="w-full aspect-[750/710] object-top object-cover rounded transition-all duration-300 group-hover:scale-110 group-hover:cursor-zoom-in"
                                    />

                                    {/* Full View on Hover (Zoomed-In Effect) */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center">

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="w-full lg:col-span-2">
                            <div>
                                <h3 class="text-lg font-bold text-gray-800">{product.category} | {product.name}</h3>
                                <div class="flex items-center space-x-1 mt-2">
                                    <svg class="w-4 h-4 fill-purple-800" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <svg class="w-4 h-4 fill-purple-800" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <svg class="w-4 h-4 fill-purple-800" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <svg class="w-4 h-4 fill-purple-800" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    <svg class="w-4 h-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>

                                    <p class="text-sm text-gray-800 !ml-3">4.0 (150)</p>
                                </div>
                                <div class="flex items-center flex-wrap gap-4 mt-6">
                                    <h4 class="text-gray-800 text-2xl font-bold">${product.price}</h4>
                                    <p class="text-gray-500 text-lg"><strike>${(product.price) - (product.price - 1)}</strike> <span class="text-sm ml-1.5">Tax included</span></p>
                                </div>
                            </div>

                            {/* <hr class="my-6 border-gray-300" /> */}

                            {/* <div>
              <h3 class="text-lg font-bold text-gray-800">Sizes</h3>
              <div class="flex flex-wrap gap-4 mt-4">
                <button type="button" class="w-10 h-9 border border-gray-300 hover:border-purple-600 text-gray-800 text-sm flex items-center justify-center shrink-0">SM</button>
                <button type="button" class="w-10 h-9 border border-purple-600 hover:border-purple-600 text-purple-800 text-sm flex items-center justify-center shrink-0">MD</button>
                <button type="button" class="w-10 h-9 border border-gray-300 hover:border-purple-600 text-gray-800 text-sm flex items-center justify-center shrink-0">LG</button>
                <button type="button" class="w-10 h-9 border border-gray-300 hover:border-purple-600 text-gray-800 text-sm flex items-center justify-center shrink-0">XL</button>
              </div>

              <div class="mt-6">
                <h3 class="text-lg font-bold text-gray-800">Colors</h3>
                <div class="flex flex-wrap gap-4 mt-4">
                  <button type="button" class="w-10 h-9 bg-gray-600 border border-transparent hover:border-purple-600 text-gray-800 text-sm flex items-center justify-center shrink-0"></button>
                  <button type="button" class="w-10 h-9 bg-black border border-purple-600 hover:border-purple-600 text-purple-800 text-sm flex items-center justify-center shrink-0"></button>
                  <button type="button" class="w-10 h-9 bg-blue-600 border border-transparent hover:border-purple-600 text-gray-800 text-sm flex items-center justify-center shrink-0"></button>
                  <button type="button" class="w-10 h-9 bg-purple-600 border border-transparent hover:border-purple-600 text-gray-800 text-sm flex items-center justify-center shrink-0"></button>
                </div>
              </div>
            </div> */}

                            <hr class="my-6 border-gray-300" />
                            <div className="w-full p-6 bg-white rounded-lg shadow-md">
                                {/* Left and Right Sections */}
                                <div className="w-full flex flex-col sm:flex-row gap-6">
                                    {/* Left Section */}
                                    <div className="w-full sm:w-1/2">
                                        {/* Product Category */}
                                        <p className="text-sm text-gray-500 uppercase font-semibold mb-2">
                                            Category: {product.category}
                                        </p>

                                        {/* Product Weight and Unit */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-semibold">Weight:</span> {product.weight}
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                <span className="font-semibold">Unit:</span> {product.unit}
                                            </p>
                                        </div>

                                        {/* Stock Information */}
                                        <p className="text-sm text-gray-700 mb-4">
                                            <span className="font-semibold">Stock:</span>{" "}
                                            <span
                                                className={`${product.stock > 0 ? "text-green-600" : "text-red-600"
                                                    } font-semibold`}
                                            >
                                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                            </span>
                                        </p>

                                        {/* Build and Expire Dates */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-semibold">Build Date:</span> {product.buildDate}
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                <span className="font-semibold">Expire Date:</span> {product.expireDate}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Section */}
                                    <div className="w-full sm:w-1/2">
                                        {/* Description */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {product.description}
                                            </p>
                                        </div>

                                        {/* Ingredients */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredients</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {product.ingredients}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-6 flex flex-wrap gap-4">
                                    <button
                                        type="button"
                                        className="flex-1 px-4 py-3 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg transition duration-200"
                                    >
                                        Add to Wishlist
                                    </button>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        type="button"
                                        className="flex-1 px-4 py-3 border border-purple-600 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition duration-200"
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                {/* Divider */}
                                <hr className="my-6 border-gray-300" />
                            </div>

                            <div>
                                <h3 class="text-lg font-bold text-gray-800">Select Delivery Location</h3>
                                <p class="text-gray-500 text-sm mt-1">Enter the pincode of your area to check product availability.</p>
                                <div class='flex items-center gap-2 mt-4 max-w-sm'>
                                    <input type='number'
                                        placeholder='Enter pincode' class='bg-gray-100 px-4 py-2.5 text-sm w-full border border-gray-300 outline-0' />
                                    <button type='button' class='border border-purple-600 outline-0 bg-purple-600 hover:bg-purple-700 text-white  px-4 py-2.5 text-sm'>Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-12 bg-gray-100 px-6 py-12">
                    <div class="xl:max-w-screen-xl max-w-screen-lg mx-auto">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="space-y-6">
                                <h3 class="text-lg font-bold text-gray-800">PRODUCT INFORMATION</h3>

                                <div>
                                    <h3 class="text-gray-800 text-sm font-bold">Material:</h3>
                                    <p class="text-sm text-gray-500 mt-2">100% Organic Food</p>
                                </div>

                                <div>
                                    <h3 class="text-gray-800 text-sm font-bold">Care Guidelines:</h3>
                                    <p class="text-sm text-gray-500 mt-2"> Ideal storage temperature is around 18-22°C (64-72°F).</p>
                                </div>

                                <div>
                                    <h3 class="text-gray-800 text-sm font-bold">Features:</h3>
                                    <ul class="list-disc pl-5 mt-2 space-y-2 text-sm text-gray-500">
                                        <li>Taste & Flavor</li>
                                        <li>Ingredients</li>
                                        <li>Texture</li>
                                        <li>Health & Wellness Features</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="space-y-6">
                                <h3 class="text-lg font-bold text-gray-800">SHIPPING & RETURNS</h3>

                                <div class="space-y-4">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <p class="text-gray-800 text-sm font-bold mb-2">Standard Shipping</p>
                                            <p class="text-gray-500 text-sm">Delivery in 3-5 business days</p>
                                        </div>
                                        <span class="text-gray-500 text-sm">${(product.price) - (product.price - 1)}</span>
                                    </div>

                                    <div class="flex justify-between items-start">
                                        <div>
                                            <p class="text-gray-800 text-sm font-bold mb-2">Expedited Shipping</p>
                                            <p class="text-gray-500 text-sm">Delivery in 1-2 business days</p>
                                        </div>
                                        <span class="text-gray-500 text-sm">${(product.price) - (product.price - 3)}</span>
                                    </div>

                                    <div class="flex justify-between items-start">
                                        <div>
                                            <p class="text-gray-800 text-sm font-bold mb-2">Pickup Option</p>
                                            <p class="text-gray-500 text-sm">Available within 24 hours</p>
                                        </div>
                                        <span class="text-gray-500 text-sm">FREE</span>
                                    </div>
                                </div>

                                <div class="space-y-4 bg-gray-50 rounded-lg shadow-md max-w-lg mx-auto">
                                    <p class="text-sm text-gray-700"># Return Policy: If you're selling confectionery products online, customers might need to return items. This text explains the return process, which is crucial for customer satisfaction.</p>
                                    <p class="text-sm text-gray-700"># Processing Fee: If there’s a small fee associated with returns (like the $3 processing fee mentioned), customers should be aware of it upfront. <span class="underline text-blue-600 cursor-pointer hover:text-blue-800">Learn more</span>.</p>
                                    <p class="text-sm text-gray-700"># Online Returns: Clearly stating that online orders must be returned online (and not in-store) helps manage expectations and provides a streamlined process for returns.</p>
                                    <p class="text-sm text-gray-700"># Sustainability: The mention of using electronic return labels aligns well with sustainability efforts, which is a positive selling point for environmentally-conscious customers. <span class="underline text-blue-600 cursor-pointer hover:text-blue-800">Read more</span>.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Comment Section */}
            <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
                <h3 class="text-lg sm:text-xl font-bold text-gray-800">Customer Reviews ({totalComments})</h3>

                {/* Comment Input */}
                <div className="mt-4 flex items-start space-x-4">
                    <img
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            placeholder="Add a public comment..."
                            rows="3"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="mt-2 flex items-center justify-between">
                            <label className="cursor-pointer text-blue-500 hover:text-blue-600 flex items-center space-x-2">
                                <FiImage size={20} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setCommentImage(e.target.files[0])}
                                />
                            </label>
                            <button
                                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50"
                                disabled={!newComment.trim()}
                                onClick={handleAddComment}
                            >
                                Comment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Display Comments */}
                <div className="mt-6 space-y-6">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="flex flex-col md:flex-row items-start space-x-4 p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-all duration-300"
                        >
                            {/* Profile Picture */}
                            <img
                                src={comment.image_url || "https://via.placeholder.com/40"}
                                alt="User"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            {/* Comment Content */}
                            <div className="flex-1 mt-3 md:mt-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-gray-900">{comment.user_name}</p>
                                    <p className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>
                            </div>

                            {/* Comment Image */}
                            <div className="ml-auto mt-3 md:mt-0">
                                {comment.image_url ? (
                                    <button onClick={() => setSelectedImage(comment.image_url)}>
                                        <img
                                            src={comment.image_url}
                                            alt="Comment"
                                            className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"
                                        />
                                    </button>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No image uploaded</p>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Image Modal for Full View */}
                    {selectedImage && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                            onClick={() => setSelectedImage(null)}
                        >
                            <div className="bg-white p-4 rounded-lg shadow-lg relative">
                                <button
                                    className="absolute top-4 right-4 text-gray-700 text-lg font-bold"
                                    onClick={() => setSelectedImage(null)}
                                >
                                    ✖
                                </button>
                                <img
                                    src={selectedImage}
                                    alt="Full Image"
                                    className="max-w-full max-h-[80vh] rounded-lg"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default CartDetails