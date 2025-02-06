import React, { useState, useEffect } from "react";
import { supabase } from "../lib/createClient";
import { Image } from "antd";
import { motion } from "framer-motion";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Error fetching customers:", error);
    } else {
      setCustomers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < filteredCustomers.length) {
      setCurrentPage(currentPage + 1);
      setItemsPerPage(6);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setItemsPerPage(5);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white text-center py-8 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome to Customer Hub</h1>
        <p className="text-sm md:text-base mt-2">Manage and explore customer details with ease.</p>
      </section>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Total Customers</h2>
          <p className="text-indigo-600 text-2xl font-bold">{customers.length}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search customers..."
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Customer Table */}
      {loading ? (
        <p className="text-center text-indigo-500">Loading...</p>
      ) : currentItems.length === 0 ? (
        <p className="text-center text-red-500">No customers found!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Favorite Confection</th>
                <th className="px-4 py-3">Dietary Preferences</th>
                <th className="px-4 py-3">Image</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((customer, index) => (
                <tr key={customer.id} className="border-b">
                  <td className="px-4 py-3">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-3">{customer.name}</td>
                  <td className="px-4 py-3">{customer.email}</td>
                  <td className="px-4 py-3">{customer.phoneNumber}</td>
                  <td className="px-4 py-3">{customer.deliveryAddress}</td>
                  <td className="px-4 py-3">{customer.favoriteConfection}</td>
                  <td className="px-4 py-3">{customer.dietaryPreferences}</td>
                  <td className="px-4 py-3">
                    {customer.profileImage ? (
                      <Image
                        width={80}
                        height={80}
                        src={customer.profileImage}
                        alt={`${customer.name} image`}
                        className="h-20 object-cover rounded-lg border-2 border-gray-300 shadow-md"
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

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300">
          Previous
        </button>
        <button onClick={nextPage} disabled={indexOfLastItem >= filteredCustomers.length} className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300">
          Next
        </button>
      </div>

      {/* CTA Section */}
      <section className="mt-10 bg-indigo-500 text-white text-center py-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">Want to add a new customer?</h2>
        <p className="text-sm mt-2">Reach out to us and grow your business network.</p>
      </section>
    </div>
  );
};

export default Customers;
