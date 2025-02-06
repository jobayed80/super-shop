import React, { useEffect, useState } from "react";
import { supabase } from "../lib/createClient";

const Orders = () => {
    const [orders, setOrders] = useState([]); // State to store orders
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [searchTerm, setSearchTerm] = useState(""); // Search term state
    const [filteredOrders, setFilteredOrders] = useState([]); // Filtered orders for search
    const [orderSummary, setOrderSummary] = useState({ totalAmount: 0, totalItems: 0 });
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [ordersPerPage] = useState(10); // Number of orders per page

    // Fetch orders for the current user
    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data: session } = await supabase.auth.getSession();
            if (session?.session) {
                const { user } = session.session;
                const { data, error } = await supabase
                    .from('cart_data')
                    .select('*')
                    .eq('email', user.email); // Filter by the current user's email

                if (error) {
                    throw error;
                }

                setOrders(data || []); // Set orders in state
                setFilteredOrders(data || []); // Initialize filtered orders
                calculateOrderSummary(data || []);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Failed to fetch orders. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Calculate order summary (total items and total amount)
    const calculateOrderSummary = (orders) => {
        const totalAmount = orders.reduce((acc, order) => acc + (order.price * order.quantity), 0);
        const totalItems = orders.reduce((acc, order) => acc + order.quantity, 0);
        setOrderSummary({ totalAmount, totalItems });
    };

    // Filter orders by product name
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === "") {
            setFilteredOrders(orders); // If search term is empty, show all orders
        } else {
            setFilteredOrders(
                orders.filter((order) =>
                    order.product_name.toLowerCase().includes(e.target.value.toLowerCase())
                )
            );
        }
    };

    // Pagination Logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Fetch orders when the component mounts
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="bg-gradient-to-r from-white via-gray-200 to-gray-400 ">
            <div className="container max-w-screen-2xl mx-auto px-4 lg:px-10 py-10">
                {/* Header and Introduction */}
                <div className="text-center mb-10 mt-24">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Sweet Orders from Our Confectionery Shop
                    </h1>
                    <p className="text-lg text-gray-600">
                        Welcome to our confectionery's order page! Browse your previous orders and indulge in sweet delights.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        className="p-3 w-1/2 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                {/* Order Summary */}
                <div className="mb-10 bg-yellow-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-gray-800">Order Summary</h2>
                    <div className="mt-4 text-lg text-gray-700">
                        <p>Total Items: <span className="font-bold">{orderSummary.totalItems}</span></p>
                        <p>Total Amount: <span className="font-bold">${orderSummary.totalAmount.toFixed(2)}</span></p>
                    </div>
                </div>

                {/* Error Handling */}
                {loading ? (
                    <div className="text-center py-10">Loading orders...</div>
                ) : error ? (
                    <div className="text-center py-10 text-red-600">{error}</div>
                ) : currentOrders.length > 0 ? (
                    <div className="overflow-x-auto shadow-md rounded-2xl mb-10">
                        {/* Table Structure */}
                        <table className="min-w-full bg-white border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-4 px-6 text-left text-lg text-gray-700 bg-gray-100 border-b">Product</th>
                                    <th className="py-4 px-6 text-left text-lg text-gray-700 bg-gray-100 border-b">Quantity</th>
                                    <th className="py-4 px-6 text-left text-lg text-gray-700 bg-gray-100 border-b">Price</th>
                                    <th className="py-4 px-6 text-left text-lg text-gray-700 bg-gray-100 border-b">Total Price</th>
                                    <th className="py-4 px-6 text-left text-lg text-gray-700 bg-gray-100 border-b">Ordered On</th>
                                    <th className="py-4 px-6 text-left text-lg text-gray-700 bg-gray-100 border-b">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order) => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                        <td className="py-4 px-6 flex items-center space-x-4">
                                            <img
                                                src={order.image_url}
                                                alt={order.product_name}
                                                className="w-12 h-12 object-cover rounded-md border-2 border-gray-300 shadow-sm"
                                            />
                                            <span className="text-gray-700 font-medium">{order.product_name}</span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-600">{order.quantity}</td>
                                        <td className="py-4 px-6 text-gray-600">${order.price}</td>
                                        <td className="py-4 px-6 text-gray-600">${order.price * order.quantity}</td>
                                        <td className="py-4 px-6 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="py-4 px-6 text-gray-600">{order.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-600 py-10">No orders found.</p>
                )}

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md mr-4"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage * ordersPerPage >= filteredOrders.length}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                        Next
                    </button>
                </div>

                {/* Customer Testimonials */}
                <div className="bg-gray-100 p-10 rounded-xl shadow-md mt-12">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">What Our Customers Say</h2>
                    <div className="flex justify-center space-x-8">
                        <div className="text-center">
                            <p className="text-lg text-gray-600 italic">"Best confectionery I’ve ever ordered from! The quality is unbeatable!"</p>
                            <p className="mt-4 text-sm text-gray-700">- Jane Doe</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg text-gray-600 italic">"Delicious treats, prompt delivery, and excellent customer service!"</p>
                            <p className="mt-4 text-sm text-gray-700">- John Smith</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Orders;
