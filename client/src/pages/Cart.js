
import React, { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import { FaStar } from "react-icons/fa"; // For the review icon
import { supabase } from "../lib/createClient";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import { Button, notification } from 'antd';
import { CheckCircleOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Import Ant Design styles

import { loadStripe } from '@stripe/stripe-js';




const Cart = () => {

    const backendUrl = 'https://super-shop-main-server.onrender.com'; // Hardcoded variable
    // const backendUrl = 'http://localhost:8006'; // Hardcoded variable

    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const updateQuantity = (id, increment) => {
        const updatedCart = cart.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + increment) }
                : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const [subtotalProduct, setSubtotalProduct] = useState("")
    const [discountProduct, setdiscountProduct] = useState("")
    const [taxProduct, setTaxProduct] = useState("")
    const [totalProduct, setTotalProduct] = useState("")

    const calculateTotal = () => {
        const subtotal = cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const discount = subtotal * 0.1; // Example: 10% discount
        const tax = subtotal * 0.15; // Example: 15% tax
        const total = subtotal - discount + tax;
        return { subtotal, discount, tax, total };
    };

    const { subtotal, discount, tax, total } = calculateTotal();

    const removeItem = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    console.log("cart", cart)

    // sending data in email
    const [email, setEmail] = useState(""); // User's email
    const [isSending, setIsSending] = useState(false);

    const EmailNotification = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Sending data successfully in email"
        });
    }

    console.log("Email amrt anme" + email)


    const handleSendEmail = async () => {
        setIsSending(true);
        try {
            const response = await fetch(`${backendUrl}/send-cart-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    cart,
                    subtotal,
                    discount,
                    tax,
                    total,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                // alert("✅ Cart details sent successfully!");
                EmailNotification()
                console.log("Cart email sent:", result);
            } else {
                throw new Error(result.error || "Failed to send email");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert("❌ Failed to send email. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    // this is used for notification
    const openNotification = (productName) => {
        notification.open({
            message: (
                <div className="animate-fadeIn text-xl text-red-600">
                    Hi users, please log in to continue.
                </div>
            ),
            description: (
                <div className="animate-fadeIn">
                    You need to be logged in to add products to your shopping cart. Please log in and try again.
                </div>
            ),
            icon: (
                <CheckCircleOutlined
                    className="animate-spin"
                    style={{ color: "#000", fontSize: "20px" }}
                />
            ),
            placement: "topRight",
            style: {
                backgroundColor: "#FFFFCC", // RGB teal  background
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


    const handlePaymentStripe = async (e) => {
        const stripe = await loadStripe('pk_test_51QdIzkAicQTaZ1Qv1Ahkx4hPLKYXWvyTIgLhbupaTvS1spD10aurF561vplKMX0oNOHhZnTxLKg0yilH6Q3A9vbZ00GJZXACdE');
        const body = {
            products: cart
        }

        const headers = {
            "Content-Type": "application/json"
        }

        const response = await fetch(`${backendUrl}/create-checkout-session`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })

        const session = await response.json();
        const result = stripe?.redirectToCheckout({
            sessionId: session.id
        })

        if (result.error) {
            alert("Error during checkout:", result.error.message);
        } else {
            // Insert cart data into Supabase after successful checkout
            try {
                const { data, error } = await supabase
                    .from('cart_data')
                    .insert(
                        cart.map(item => ({
                            email: email,
                            product_id: item.id,
                            product_name: item.name,
                            quantity: item.quantity,
                            price: item.price,
                            image_url: item.image_url,
                            created_at: new Date().toISOString()
                        }))
                    );

                if (error) {
                    throw error;
                }

                console.log("Checkout cart data inserted into Supabase:", data);
                EmailNotification(); // Notify user of successful email and checkout
            } catch (error) {
                console.error("Error inserting checkout cart data into Supabase:", error);
            }
        }

    }




    const handlePayment = async (e) => {
        e.preventDefault();
        const { data: session } = await supabase.auth.getSession();
        if (session?.session) {
            const { user } = session.session;
            if (user?.email_confirmed_at) {
                setEmail(user.email); // Store user information in the state
                // navigate("user/signin")
                handleSendEmail()  //this function Email send data
                handlePaymentStripe() //this function used payment gateway

            } else {
                alert("Email is not verified. Redirecting to login...");
            }
        } else {
            openNotification()
            navigate("/user-signin");
        }
    }


    // const handleSubmitFunction = async (e) => {
    //     const { data: session } = await supabase.auth.getSession();
    //     if (session?.session) {
    //       const { user } = session.session;
    //       if (user?.email_confirmed_at) {
    //         setEmail(user.email); // Store user information in the state
    //         // navigate("user/signin")
    //         // alert("email is verified")
    //         handlePayment()

    //       } else {
    //         alert("Email is not verified. Redirecting to login...");
    //       }
    //     } else {

    //       navigate("/user-signin");
    //     }
    // }


    // ekhane supabase theke email collect kora hoice
    const getUserSession = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error("Error getting session:", error.message);
            return null;
        }

        if (data.session) {
            console.log("User Email:", data.session.user.email);
            return setEmail(data.session.user.email);
        }

        return null;
    };

    useEffect(() => {
        getUserSession();
    }, []);


    //  User login check and store email data




    // SSlcommerze
    // const handleSSLCommerzPayment = async () => {
    //     const customer = {
    //       name: "John Doe",
    //       email: "john@example.com",
    //       phone: "01712345678",
    //       address: "Dhaka, Bangladesh",
    //     };

    //     const response = await fetch("http://localhost:8000/initiate-sslcommerz", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ products: cart, customer }),
    //     });

    //     const data = await response.json();
    //     if (data.url) {
    //       window.location.href = data.url; // Redirect to SSLCommerz Gateway URL
    //     } else {
    //       alert("Failed to initiate payment.");
    //     }
    //   };






    return (

        <div className="bg-gradient-to-r from-white via-gray-200 to-gray-400">
            <div className=" container flex flex-col lg:flex-row p-8 gap-10 max-w-screen-2xl mx-auto py-10 px-4 lg:px-10 mt-20">
                {/* Left Side: Cart Items */}
                <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-8 ">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
                        Your Cart
                    </h2>
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-start justify-between p-6 bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 space-x-6"
                        >
                            <div className="flex justify-center items-center cursor-pointer" onClick={() => openModal(item)}>
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-24 h-24 sm:w-48 sm:h-48 object-cover rounded-xl border-2 border-gray-300 shadow-md"
                                />
                            </div>

                            <div onClick={() => openModal(item)} className="flex-1 space-y-3">
                                <h3 className="text-2xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200">
                                    {item.name}
                                </h3>
                                <h1 className="text-gray-600 text-sm">Category: {item.category}</h1>
                                <p className="text-gray-600 text-sm">Price: ${item.price}</p>
                                <p className="text-gray-600 text-sm">Weight: {item.weight}</p>
                                <p className="text-gray-600 text-sm">Unit: {item.unit}</p>
                                {/* <p className="text-gray-600 text-sm">Build date: {item.buildDate}</p>
                            <p className="text-gray-600 text-sm">Expire date: {item.expireDate}</p> */}

                                <div className="flex items-center text-gray-600">
                                    <FaStar className="text-yellow-500 mr-2" />
                                    <FaStar className="text-yellow-500 mr-2" />
                                    <FaStar className="text-yellow-500 mr-2" />
                                    <FaStar className="text-yellow-500 mr-2" />

                                    {/* <span>{item.reviews || 0} Reviews</span> */}
                                </div>

                                {/* Stock Status */}
                                <div className={`text-sm ${item.stock > 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                                    {item.stock > 0 ? `${item.stock} in stock` : 'Out of Stock'}

                                </div>
                                {/* <p className="text-gray-700 text-sm">{item.description}</p>
                            <p className="text-gray-700 text-sm">{item.ingredients}</p> */}

                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-full transition-colors duration-200 hover:bg-red-600"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-full transition-colors duration-200 hover:bg-green-600"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="mt-4 p-3 text-red-500 hover:text-red-600"
                                >
                                    <HiTrash size={24} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: Summary and Payment */}
                <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 space-y-6">
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-4 border-blue-600 pb-2">
                        Order Summary
                    </h2>

                    {/* Order Details */}
                    <div className="space-y-4">
                        <p className="flex justify-between text-md md:text-lg text-gray-700">
                            Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span>
                        </p>
                        <p className="flex justify-between text-md md:text-lg text-gray-700">
                            Discount: <span className="font-semibold text-red-500">-${discount.toFixed(2)}</span>
                        </p>
                        <p className="flex justify-between text-md md:text-lg text-gray-700">
                            Tax: <span className="font-semibold text-green-500">+${tax.toFixed(2)}</span>
                        </p>
                    </div>

                    <hr className="my-4 border-gray-300" />

                    {/* Total */}
                    <p className="flex justify-between text-lg md:text-xl font-bold text-gray-900">
                        Total: <span>${total.toFixed(2)}</span>
                    </p>
                    <hr className="my-4 border-gray-300" />

                    {/* Payment Method */}
                    <div className="space-y-6">

                        <button
                            onClick={handlePayment}
                            className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full font-semibold transition-transform transform hover:scale-105 hover:shadow-lg duration-200"
                        >
                            Proceed to Payment
                        </button>
                    </div>

                    {/* Help Link */}
                    <p className="text-sm text-gray-500 mt-6">
                        Need help? <a href="/help" className="text-blue-600 font-semibold hover:underline">Contact Support</a>
                    </p>
                </div>


                {/* Modal: Product Details */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-xl max-w-4xl w-full space-y-6 shadow-xl">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-semibold">{selectedProduct?.name}</h3>
                                <button onClick={closeModal} className="text-xl text-red-500">X</button>
                            </div>
                            <img
                                src={selectedProduct?.image_url}
                                alt={selectedProduct?.name}
                                className="w-full h-96 object-cover rounded-xl border-2 border-gray-300 shadow-md"
                            />
                            <div className="space-y-4">
                                <p><strong>Category:</strong> {selectedProduct?.category}</p>
                                <p><strong>Price:</strong> ${selectedProduct?.price}</p>
                                <p><strong>Weight:</strong> {selectedProduct?.weight}</p>
                                <p><strong>Unit:</strong> {selectedProduct?.unit}</p>
                                <p><strong>Build date:</strong> {selectedProduct?.buildDate}</p>
                                <p><strong>Expire date:</strong> {selectedProduct?.expireDate}</p>
                                <p><strong>Description:</strong> {selectedProduct?.description}</p>
                                <p><strong>Ingredients:</strong> {selectedProduct?.ingredients}</p>
                                <div className="flex items-center text-gray-600">
                                    <FaStar className="text-yellow-500 mr-2" />
                                    <span>{selectedProduct?.reviews || 0} Reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Cart