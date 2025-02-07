import React, { useEffect, useState } from "react";
import { supabase } from "../lib/createClient";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PopularCategories = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const categories = ["Cakes", "Chocolates", "Pastries", "Candy", "Cupcakes", "Breads", "Muffins", "Donuts"];

  const fetchProducts = async () => {
    setLoading(true);
    const products = {};
    for (const category of categories) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        console.error(`Error fetching products for ${category}:`, error.message);
      } else {
        products[category] = data[0];
      }
    }
    setProductsByCategory(products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handles Next/Prev button clicks
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 2 < categories.length ? prev + 2 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 2 >= 0 ? prev - 2 : categories.length - 2));
  };

  return (
    <div className='bg-gradient-to-r from-white via-gray-200 to-gray-300 py-12' data-aos="zoom-in">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-black mb-4 border-b-4 border-green-500 inline-block pb-2"
         style={{ fontFamily: 'Cursive, sans-serif', borderBottom: '2px solid #37A168', display: 'inline-block', paddingBottom: '4px' }}>
          Popular Categories
        </h1>
        <p className="text-lg pt-5 font-semibold text-gray-700">
          Explore our best-selling categories and find your favorite treats!
        </p>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid container mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-20">
        {categories.map((category) => {
          const product = productsByCategory[category];
          if (!product) return null;

          return (
            <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <Link to={`/category/${category}`} className="block">
                <LazyLoadImage
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                  <p className="text-gray-600 text-sm">{category}</p>
                  <div className="flex justify-center items-center mt-2">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Mobile Version with Pagination */}
      <div className="sm:hidden flex flex-col items-center mt-10 relative">
        <div className="flex space-x-4 px-4">
          {categories.slice(currentIndex, currentIndex + 2).map((category) => {
            const product = productsByCategory[category];
            if (!product) return null;

            return (
              <div key={product.id} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <Link to={`/category/${category}`} className="block">
                  <LazyLoadImage
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                    <p className="text-gray-600 text-sm">{category}</p>
                    <div className="flex justify-center items-center mt-2">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full max-w-xs mt-2">
          <button onClick={prevSlide} className="text-gray-700 text-white p-2 rounded-full hover:bg-gray-900 transition">
            <FaArrowLeft size={12} />
          </button>
          <button onClick={nextSlide} className="text-gray-600 text-white p-2 rounded-full hover:bg-gray-900 transition">
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
