import React from "react";
import BannerCategories from "../componnents/BannerCategories";
import Blog from "../componnents/Blog";
import FooterTop from "../componnents/FooterTop";
import TopProduct from "./TopProduct";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 p-6">
      {/* <h1 className="text-4xl font-bold text-center text-blue-700">Welcome to Super Shop</h1>
      <p className="text-lg text-gray-600 text-center mt-4">
        Your one-stop shop for all the best products. Shop now and enjoy amazing deals!
      </p>
      
      <div className="flex justify-center mt-6">
        <a href="/products" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Explore Products
        </a>
      </div> */}
      <TopProduct></TopProduct>
      <BannerCategories></BannerCategories>
      <Blog></Blog>
      <FooterTop></FooterTop>
    </div>
  );
};

export default Home;
