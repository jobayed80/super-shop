import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

import { supabase } from '../lib/createClient';

// AnimatedCard Component
const AnimatedCard = ({ title, description, iconClass, bgColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className={`rounded-lg shadow-lg p-6 text-white ${bgColor} flex items-center justify-between`}
  >
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </div>
    <div className="text-4xl">
      <i className={iconClass}></i>
    </div>
  </motion.div>
);

// Main DashboardHome Component
const TopBox = () => {


  const backendUrl = 'https://super-shop-main-server.onrender.com'; // Hardcoded variable

  // toatl individual category product
  const [categoryCounts, setCategoryCounts] = useState({
    Candy: 0,
    Chocolates: 0,
    Cakes: 0,
    Pastries: 0,
    Cupcakes: 0,
    Breads: 0,
    Muffins: 0,
    Donuts: 0,
    Bronies: 0,
    Pies: 0,
    Tarts: 0,
    Fudge: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      const { data, error } = await supabase
        .from('products') // Your table name
        .select('category');

      if (error) {
        console.error(error);
        return;
      }

      // Count the occurrences of each category
      const counts = { Candy: 0, Chocolates: 0, Cakes: 0, Pastries: 0, Cupcakes: 0, Breads: 0, Muffins: 0, Donuts: 0, Bronies: 0, Pies: 0, Tarts: 0, Fudge: 0 };

      data.forEach(item => {
        if (counts.hasOwnProperty(item.category)) {
          counts[item.category] += 1;
        }
      });

      setCategoryCounts(counts);
    };

    fetchCategoryCounts();
  }, []);



  // total user count
  const [userCount, setUserCount] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Function to fetch total user count
    const fetchUserCount = async () => {
      try {
        const { count, error } = await supabase
          .from("users") // Replace "users" with your table name
          .select("*", { count: "exact" }); // Select all and get count

        if (error) {
          setError("Error fetching user count.");
          console.error(error);
        } else {
          setUserCount(count || 0);
        }
      } catch (err) {
        setError("Error fetching data.");
        console.error(err);
      }
    };

    fetchUserCount();
  }, []);




  const [totalOrders, setTotalOrders] = useState(0);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${backendUrl}/api/total-orders`)
      .then((res) => res.json())
      .then((data) => {
        setTotalOrders(data.totalOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching total orders:", err);
        setLoading(false);
      });
  }, []);

  const [pendingOrders, setPendingOrders] = useState(0);
  useEffect(() => {
    fetch(`${backendUrl}/api/pending-orders`)
      .then((res) => res.json())
      .then((data) => {
        setPendingOrders(data.pendingOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pending orders:", err);
        setLoading(false);
      });
  }, []);

  const [totalSales, setTotalSales] = useState(0);
  useEffect(() => {
    fetch(`${backendUrl}/api/total-sales`) // Adjust URL based on your server
      .then((res) => res.json())
      .then((data) => {
        setTotalSales(data.totalSales);
      })
      .catch((err) => {
        console.error("Error fetching total sales:", err);
      });
  }, []);



  return (

    <div className="p-6">
      {/* Grid Layout for Animated Cards (Top Section) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Card 1 */}
        <AnimatedCard
          title="Total Users"
          description={`Active Users: ${userCount}`} // More professional and clear
          iconClass="fas fa-users"
          bgColor="bg-gradient-to-r from-blue-500 to-indigo-500"
        />
        {/* Card 2 - Total Orders */}
        <AnimatedCard
  title="Total Orders"
  description={`Total Orders: ${totalOrders.toLocaleString()}`} // Improved clarity & formatting
  iconClass="fas fa-shopping-cart" // More relevant icon for orders
  bgColor="bg-gradient-to-r from-green-500 to-teal-500"
/>

        {/* Card 3 */}
        <AnimatedCard
          title="New Orders"
          description={`Pending: ${pendingOrders} | Processing: ${totalOrders}`} // More detailed status
          iconClass="fas fa-shopping-cart"
          bgColor="bg-gradient-to-r from-yellow-500 to-orange-500"
        />

        {/* Card 4 */}
        <AnimatedCard
          title="Total Sales"
          description={`$${totalSales.toFixed(2)}`} // Format as currency
          iconClass="fas fa-dollar-sign"
          bgColor="bg-gradient-to-r from-green-500 to-teal-500"
        />


      </div>

      {/* Bottom Section - Category Specific Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-12">
        {/* Card 1 */}
        <AnimatedCard
          title="Total Candy"
          description={categoryCounts.Candy}
          iconClass="fas fa-candy-cane text-4xl"
          bgColor="bg-gradient-to-r from-blue-500 to-indigo-500"
        />

        {/* Card 2 */}
        <AnimatedCard
          title="Total Cakes"
          description={categoryCounts.Cakes}
          iconClass="fas fa-cake text-4xl"
          bgColor="bg-gradient-to-r from-green-500 to-teal-500"
        />

        {/* Card 3 */}
        <AnimatedCard
          title="Total Pastries"
          description={categoryCounts.Pastries}
          iconClass="fas fa-bread-slice text-4xl"
          bgColor="bg-gradient-to-r from-yellow-500 to-orange-500"
        />

        {/* Card 4 */}
        <AnimatedCard
          title="Total Chocolates"
          description={categoryCounts.Chocolates}
          iconClass="fas fa-chocolate-bar text-4xl"
          bgColor="bg-gradient-to-r from-red-500 to-pink-500"
        />

        {/* Card 5 */}
        <AnimatedCard
          title="Total Cupcakes"
          description={categoryCounts.Cupcakes}
          iconClass="fas fa-cupcake text-4xl"
          bgColor="bg-gradient-to-r from-purple-500 to-gray-500"
        />

        {/* Card 6 */}
        <AnimatedCard
          title="Total Breads"
          description={categoryCounts.Breads}
          iconClass="fas fa-bread-slice text-4xl"
          bgColor="bg-gradient-to-r from-gray-500 to-blue-400"
        />

        {/* Card 7 */}
        <AnimatedCard
          title="Total Bronies"
          description={categoryCounts.Bronies}
          iconClass="fas fa-users text-4xl"
          bgColor="bg-gradient-to-r from-teal-500 to-cyan-500"
        />

        {/* Card 8 */}
        <AnimatedCard
          title="Total Donuts"
          description={categoryCounts.Donuts}
          iconClass="fas fa-donut text-4xl"
          bgColor="bg-gradient-to-r from-orange-500 to-yellow-400"
        />

        {/* Card 9 */}
        <AnimatedCard
          title="Total Fudge"
          description={categoryCounts.Fudge}
          iconClass="fas fa-candy-cane text-4xl"
          bgColor="bg-gradient-to-r from-pink-500 to-red-500"
        />

        {/* Card 10 */}
        <AnimatedCard
          title="Total Muffins"
          description={categoryCounts.Muffins}
          iconClass="fas fa-muffin text-4xl"
          bgColor="bg-gradient-to-r from-green-500 to-lime-500"
        />

        {/* Card 11 */}
        <AnimatedCard
          title="Total Pies"
          description={categoryCounts.Pies}
          iconClass="fas fa-pie-chart text-4xl"
          bgColor="bg-gradient-to-r from-yellow-500 to-orange-500"
        />

        {/* Card 12 */}
        <AnimatedCard
          title="Total Tarts"
          description={categoryCounts.Tarts}
          iconClass="fas fa-tart text-4xl"
          bgColor="bg-gradient-to-r from-purple-500 to-indigo-500"
        />
      </div>

      {/* Recent Orders Section */}
      <div className="mt-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
          {/* Add a list or a table of recent orders here */}
          <ul className="space-y-2 mt-4">
            <li className="flex justify-between p-2 bg-gray-100 rounded-md">
              <span>Order #12345</span>
              <span className="font-semibold">$20.99</span>
            </li>
            {/* Add more recent orders as required */}
          </ul>
        </motion.div>
      </div>

      {/* Promotional Section */}
      <div className="mt-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-yellow-500 text-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold">Special Promotion</h3>
          <p>Get 10% off on your next order! Use code <span className="font-bold">SAVE10</span> at checkout.</p>
        </motion.div>
      </div>


      {/* Footer Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-12 bg-white rounded-lg shadow-lg p-6 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          Keep track of your performance
        </h3>
        <p className="text-gray-500">
          Easily manage your dashboard with real-time data and detailed analytics.
        </p>
      </motion.div>
    </div>
  );
};

export default TopBox;
