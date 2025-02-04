import React, { useEffect, useState } from "react";
import { supabase } from "../lib/createClient";


const Orders = () => {
    const [orders, setOrders] = useState([]); // State to store orders
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

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
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Failed to fetch orders. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch orders when the component mounts
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <div className="container max-w-screen-2xl mx-auto px-4 lg:px-10 py-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h2>
                {loading ? (
                    <div className="text-center py-10">Loading orders...</div>
                ) : error ? (
                    <div className="text-center py-10 text-red-600">{error}</div>
                ) : orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="p-6 bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                            >
                                <div className="flex items-center space-x-6">
                                    <img
                                        src={order.image_url}
                                        alt={order.product_name}
                                        className="w-24 h-24 object-cover rounded-xl border-2 border-gray-300 shadow-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {order.product_name}
                                        </h3>
                                        <p className="text-gray-600">Quantity: {order.quantity}</p>
                                        <p className="text-gray-600">Price: ${order.price}</p>
                                        <p className="text-gray-600">Total Price: ${(order.price) * (order.quantity)}</p>
                                        <p className="text-gray-600">
                                            Ordered on: {new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600">Email: {order.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No orders found.</p>
                )}
            </div>

        </>
    );
};

export default Orders;