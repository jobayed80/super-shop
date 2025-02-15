import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from '../lib/createClient';
import { FaStar } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { Button, notification } from 'antd';
import { CheckCircleOutlined } from "@ant-design/icons";
import ProfileLogo from '../assets/profile.png'

const CartDetails = () => {


    const [email, setEmail] = useState("");

    const checkEmail = async (e) => {
       
        const { data: session } = await supabase.auth.getSession();
        if (session?.session) {
            const { user } = session.session;
            if (user?.email_confirmed_at) {
                setEmail(user.email); // Store user information in the state
                console.log(user.email)
            
            } else {
                alert("Email is not verified. Redirecting to login...");
            }
        } else {
        
        }
    }

    useEffect(() => {
        checkEmail()
    }, []);






    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [totalComments, setTotalComments] = useState(0);
    const navigate = useNavigate();

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commentImage, setCommentImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);


    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (product && product.category) {
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .eq("category", product.category) // Fetch products with the same category
                    .neq("id", product.id); // Exclude the current product

                if (error) console.error(error);
                else setRelatedProducts(data);
            }
        };

        fetchRelatedProducts();
    }, [product]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 2 >= relatedProducts.length ? 0 : prevIndex + 2
        );
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 2 < 0 ? relatedProducts.length - 2 : prevIndex - 2
        );
    };


    const handleProductDetails = () => {
        // Navigate to Product Details Page
        navigate(`/product-details/${product.id}`);
        
    };




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
                    user_name: email,
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

    const [api, contextHolder] = notification.useNotification();
    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            api.open({
                message: "Product Already in Cart",
                description: `"${product.name}" is already in your shopping cart.`,
                placement: "bottomLeft",
                duration: 4,
                style: {
                    backgroundColor: "#fff3cd",
                    color: "#856404",
                    borderRadius: "8px",
                    border: "1px solid #ffeeba",
                    
                },
            });
        } else {
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

    if (!product) return <p>Loading...</p>;



    

    return (
        <div className="min-h-screen bg-gradient-to-r from-white via-gray-200 to-gray-400 pt-24">

            {contextHolder} {/* Add this line to render the notification context */}


            {/* Product Details */}
            <div className="font-[sans-serif] p-4  rounded-lg shadow-sm max-w-4xl mx-auto mt-2">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-8 max-lg:gap-12 max-sm:gap-8">
                    {/* Product Image Section */}
                    <div className="w-full lg:sticky top-0 lg:col-span-3">
                        <div className="relative flex-1 group">
                            <img
                                src={product.image_url || "https://via.placeholder.com/300"}
                                alt="Product"
                                className="w-full aspect-[750/710] object-top object-cover rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:cursor-zoom-in"
                            />
                        </div>
                    </div>

                    {/* Product Information Section */}
                    <div className="w-full lg:col-span-2">
                        <div>
                            {/* Best Seller Badge */}
                            <div className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                                🏆 Best Seller
                            </div>

                            <h3 className="text-lg font-bold text-gray-800">{product.category} | {product.name}</h3>

                            {/* Discount Tag */}
                            <div className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full ml-2">
                                🔥 20% OFF
                            </div>

                            {/* Rating Section */}
                            <div className="flex items-center space-x-1 mt-2">
                                <FaStar className="text-yellow-500" />
                                <p className="text-sm text-gray-800 !ml-3">4.0 (150)</p>
                            </div>

                            {/* Price Section */}
                            <div className="flex items-center flex-wrap gap-4 mt-6">
                                <h4 className="text-gray-800 text-2xl font-bold">৳{product.price}</h4>
                                <p className="text-gray-500 text-lg">
                                    <strike>৳{(product.price) - (product.price - 1)}</strike>{" "}
                                    <span className="text-sm ml-1.5">Tax included</span>
                                </p>
                            </div>

                            {/* Free Shipping Banner */}
                            <div className="mt-4 bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-lg">
                                🚚 Free Shipping on orders over $50
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="mt-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Product Details</h3>
                            <div className="text-sm text-gray-700 space-y-2">
                                <p><strong>Weight:</strong> {product.weight}</p>
                                <p><strong>Unit:</strong> {product.unit}</p>
                                <p><strong>Build Date:</strong> {product.buildDate}</p>
                                <p><strong>Expire Date:</strong> {product.expireDate}</p>

                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="mt-6">
                            <button
                                className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Why Buy From Us? Section */}
            <div className="mt-8  p-6 rounded-lg shadow-sm container mx-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Why Buy From Us?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl text-blue-600 mb-2">🚚</div>
                        <p className="text-sm text-gray-700">Fast & Free Shipping</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl text-green-600 mb-2">💳</div>
                        <p className="text-sm text-gray-700">Secure Payments</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl text-purple-600 mb-2">🔄</div>
                        <p className="text-sm text-gray-700">30-Day Returns</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl text-yellow-600 mb-2">🌟</div>
                        <p className="text-sm text-gray-700">5-Star Rated</p>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {/* Related Products Section */}
            <div className="mt-12 mx-auto relative container">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Related Products</h3>

                {/* Navigation Buttons */}
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2  p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 z-10"
                    onClick={handlePrevious}
                >
                    ←
                </button>
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2  p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 z-10"
                    onClick={handleNext}
                >
                    →
                </button>

                {/* Product Grid */}
                <div onClick={() => handleProductDetails()} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
                    {relatedProducts
                        .slice(currentIndex, currentIndex + 4) // Show only 4 products at a time
                        .map((product) => (
                            <div
                                key={product.id}
                                className=" p-4 rounded-lg shadow-lg hover:shadow-lg transition-all duration-300 group"
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden rounded-lg">
                                    <img
                                        src={product.image_url || "https://via.placeholder.com/300"}
                                        alt={product.name}
                                        className="w-full h-40 object-cover rounded-lg transform group-hover:scale-105 transition-all duration-300"
                                    />
                                    {/* Quick Add to Cart Button */}
                                    <button
                                        className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-md hover:bg-gray-100 transition-all duration-300"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        + Add to Cart
                                    </button>
                                </div>

                                {/* Product Details */}
                                <div className="mt-4">
                                    {/* Product Name */}
                                    <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>

                                    {/* Rating and Reviews */}
                                    <div className="flex items-center space-x-1 mt-2">
                                        <FaStar className="text-green-500" />
                                        <FaStar className="text-green-500" />
                                        <FaStar className="text-green-500" />
                                        <FaStar className="text-green-500" />
                                        <FaStar className="text-gray-300" />
                                        <p className="text-sm text-green-600 ml-2">(150 reviews)</p>
                                    </div>

                                    {/* Price */}
                                    <p className="text-lg font-bold text-gray-800 mt-2">৳{product.price}</p>

                                    {/* Discount and Savings */}
                                    <div className="flex items-center space-x-2 mt-1">
                                        <p className="text-sm text-gray-500 line-through">৳15.99</p>
                                        <p className="text-sm text-green-600 font-semibold">Save 20%</p>
                                    </div>

                            


                                    {/* Add to Cart Button */}
                                    <button
                                        className="w-full mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>


            {/* Comment Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-white via-gray-200 to-gray-300 shadow-sm rounded-lg container mx-auto">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Customer Reviews ({totalComments})</h3>

                {/* Comment Input */}
                <div className="mt-4 flex items-start space-x-4 ">
                    <img
                        src={ProfileLogo}
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover bg-green-800"
                    />
                    <div className="flex-1">
                        <textarea
                            className="w-full bg-gradient-to-r from-white via-gray-200 p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
                                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50"
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
                            className="flex flex-col md:flex-row items-start space-x-4 p-4  shadow-md rounded-lg hover:shadow-xl transition-all duration-300"
                        >
                            {/* Profile Picture */}
                            <img
                                src={ProfileLogo || "https://via.placeholder.com/40"}
                                alt="User"
                                className="w-12 h-12 rounded-full object-cover bg-green-800"
                            />

                            {/* Comment Content */}
                            <div className="flex-1 mt-3 md:mt-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-gray-500 ">{comment.user_name}</p>
                                    <p className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
                                </div>
                                <p className="text-md text-gray-700 mt-1">{comment.comment}</p>
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
                </div>
            </div>

        
        </div>
    );
};

export default CartDetails;