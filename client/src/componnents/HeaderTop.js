import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from '../assets/banner.png';

const HeaderTop = () => {
    const [searchText, setSearchText] = useState("");

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gradient-to-r from-white via-gray-200 to-gray-300">
                {/* Hero Section */}
                <div className="flex-grow container mx-auto flex flex-col lg:flex-row items-center justify-between p-8">
                    {/* Left Side: Text Content */}
                    <div className="w-full mt-10 lg:w-1/2 sm:mt-14 text-center lg:text-left">
                        <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                            Sweeten Your Day <br />
                            With Our <br />
                            <span className="text-pink-500">Delicious Treats!</span>
                        </h1>
                        <button className="mt-6 px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300 font-semibold">
                            <Link to={"/products"}>Shop Now</Link>
                        </button>
                        <p className="mt-6 text-gray-600 text-lg">
                            Explore our wide range of handcrafted candies, chocolates, and desserts. Perfect for every occasion!
                        </p>
                    </div>

                    <div className="w-full lg:w-1/2 mt-10 lg:mt-0 justify-center p-6 relative hidden lg:flex">
                        <img
                            src={Banner}
                            alt="Confectionary Hero"
                            className="w-96 h-auto transform hover:scale-105 transition duration-500 z-5"
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default HeaderTop;
