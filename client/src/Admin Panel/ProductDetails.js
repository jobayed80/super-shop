import React, { useState, useEffect } from "react";
import { supabase } from "../lib/createClient";
import { Image } from "antd";

const ProductDetails = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Start with 5 items

    // Fetch data from Supabase table
    const fetchData = async () => {
        setLoading(true);
        const { data: fetchedData, error } = await supabase
            .from("products") 
            .select("*"); 

        if (error) {
            console.error("Error fetching data:", error);
        } else {
            setData(fetchedData || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filtered data based on search term
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Next page
    const nextPage = () => {
        if (indexOfLastItem < filteredData.length) {
            setCurrentPage(currentPage + 1);
            setItemsPerPage(6); // After first page, show 6 items
        }
    };

    // Previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setItemsPerPage(5); // Reset to 5 items when going back
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-indigo-200 p-6">
            {/* Top Section */}
            <div className="bg-white border border-indigo-300 rounded-lg p-6 shadow-md text-center mb-6">
                <h1 className="text-3xl font-extrabold text-indigo-600">Product Details</h1>
                <p className="text-gray-600 mt-3">Search and browse products with pagination support.</p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search products by name..."
                    className="w-full max-w-lg px-5 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Data Table */}
            {loading ? (
                <p className="text-center text-indigo-500 animate-pulse">Loading...</p>
            ) : currentItems.length === 0 ? (
                <p className="text-center text-red-500">No products found!</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 shadow-md rounded-lg bg-white">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">#</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">Name</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">Category</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">Price</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">Description</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">Ingredients</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium uppercase">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={item.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50`}>
                                    <td className="px-6 py-3 border-b text-sm">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-6 py-3 border-b text-sm">{item.name}</td>
                                    <td className="px-6 py-3 border-b text-sm">{item.category}</td>
                                    <td className="px-6 py-3 border-b text-sm">${item.price.toFixed(2)}</td>
                                    <td className="px-6 py-3 border-b text-sm">{item.description}</td>
                                    <td className="px-6 py-3 border-b text-sm">{item.ingredients}</td>
                                    <td className="px-6 py-3 border-b text-sm">
                                        {item.image_url ? (
                                            <Image
                                                width={80}
                                                height={80}
                                                src={item.image_url}
                                                alt={`${item.name} image`}
                                                className="h-32 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                                            />
                                        ) : (
                                            "No image"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg shadow-md transition-all text-white ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
                >
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={indexOfLastItem >= filteredData.length}
                    className={`px-4 py-2 rounded-lg shadow-md transition-all text-white ${indexOfLastItem >= filteredData.length ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
                >
                    Next
                </button>
            </div>

            {/* Page Info */}
            <p className="text-center text-gray-600 mt-4">
                Page {currentPage} | Showing {itemsPerPage} items per page
            </p>
        </div>
    );
};

export default ProductDetails;
