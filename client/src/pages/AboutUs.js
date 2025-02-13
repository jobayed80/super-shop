import React from 'react';
import { FaHeart, FaAward, FaSmile, FaUsers } from 'react-icons/fa'; // Icons for visual appeal
// import team1 from '../assets/team1.jpg'; // Sample team member images
// import team2 from '../assets/team2.jpg';
// import team3 from '../assets/team3.jpg';
import Story from '../assets/story.webp'

const AboutUs = () => {
    return (
        <div className=" mx-auto bg-gradient-to-r from-white via-gray-200 to-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
            <div className='container mx-auto'>
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        About Us
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Sweet Delights: Crafting Happiness, One Treat at a Time
                    </p>
                </div>

                {/* Company History */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="lg:w-1/2">
                            <img
                                src={Story} //     Replace with your image
                                alt="Our Story"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-4">
                                Founded in 2022, Sweet Delights began as a small family-owned bakery in the heart of the city. Our passion
                                for creating delicious, handcrafted confectionaries quickly gained popularity, and today, we are proud to
                                serve customers across the country.
                            </p>
                            <p className="text-gray-600">
                                Every treat we make is a reflection of our commitment to quality, creativity, and love for sweets. From
                                classic chocolates to innovative desserts, we strive to bring joy to every bite.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission and Values */}
                <div className=" py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            Our Mission & Values
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <FaHeart className="text-4xl text-pink-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Passion</h3>
                                <p className="text-gray-600">
                                    We pour our hearts into every recipe, ensuring each treat is made with love.
                                </p>
                            </div>
                            <div className="text-center">
                                <FaAward className="text-4xl text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
                                <p className="text-gray-600">
                                    Only the finest ingredients are used to create our premium confectionaries.
                                </p>
                            </div>
                            <div className="text-center">
                                <FaSmile className="text-4xl text-blue-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Happiness</h3>
                                <p className="text-gray-600">
                                    Our goal is to bring smiles to our customers' faces with every bite.
                                </p>
                            </div>
                            <div className="text-center">
                                <FaUsers className="text-4xl text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
                                <p className="text-gray-600">
                                    We believe in giving back and supporting the communities we serve.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Meet the Team */}
                <div className="max-w-7xl mx-auto py-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Meet the Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center">
                            <img
                                src="https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-1/474951097_3935186093435549_3872658062708882747_n.jpg?stp=cp6_dst-jpg_s160x160_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=17HxDpzAvqsQ7kNvgFe_OcL&_nc_oc=AdjVQX-zzZYMB3ofkQn_oGH_CWLBO_JoncaAahFlzhLEKB-4GfeNVNBEL_hWAN6leM0&_nc_zt=24&_nc_ht=scontent.fdac155-1.fna&_nc_gid=AGanAaT85ZuUB901Kap7fqw&oh=00_AYBfuUpyq4tglYkAjU1FjKbarJy1AO_ihYcQhd4NeBixGw&oe=67B39A43"
                                alt="Team Member 1"
                                className="w-48 h-48 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-900">Ali Abdullah</h3>
                            <p className="text-gray-600">Founder & Head Chef</p>
                        </div>
                        <div className="text-center">
                            <img
                                src="https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/252975239_3066658490247460_779879383292794001_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=jrhNM3NeQOAQ7kNvgFoO2U7&_nc_oc=AdhIJ4LixdSjpx-1v8aMAUwomZjmCwcU-r8TYpQw7p7hMpt-9lBtexkVlqErnOMCkt4&_nc_zt=23&_nc_ht=scontent.fdac155-1.fna&_nc_gid=AvVr6lHtVJzCY326hyz7pJC&oh=00_AYCc-slMyV2DRkD47Q0xjyCtt5BrgH3dp-hw4XPi_xe2rw&oe=67B3A1DA"
                                alt="Team Member 2"
                                className="w-48 h-48 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-900">Md Jobayed Hossain rabbi</h3>
                            <p className="text-gray-600">Pastry Artist</p>
                        </div>
                        <div className="text-center">
                            <img
                                src="https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-1/473789352_2435647156773545_8250955535081314771_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=DLRcR3NRbxcQ7kNvgHQJy4X&_nc_oc=Adir1hzCTUzK-Y9pcpUPV404uC7a9fP9xklgPlnzG0SXX02tKK6uxgmT1rw00tZuU3Q&_nc_zt=24&_nc_ht=scontent.fdac155-1.fna&_nc_gid=Av9oNqz2K6_hVpj5EtGOofY&oh=00_AYCA69HQmeYxMZAVH-g0_GKx9fxCy8S-lB0T9c6RqypIIg&oe=67B39849"
                                alt="Team Member 3"
                                className="w-48 h-48 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-900">Nishat Mondal</h3>
                            <p className="text-gray-600">Marketing Director</p>
                        </div>
                    </div>
                </div>

                {/* Customer Testimonials */}
                <div className=" py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            What Our Customers Say
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-gray-600 italic">
                                    "The best chocolates I've ever tasted! Every bite is pure bliss."
                                </p>
                                <p className="mt-4 font-semibold text-gray-900">- Sarah L.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-gray-600 italic">
                                    "Sweet Delights never disappoints. Their desserts are always fresh and delicious."
                                </p>
                                <p className="mt-4 font-semibold text-gray-900">- Michael T.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-gray-600 italic">
                                    "I love their creative flavors and the care they put into every product."
                                </p>
                                <p className="mt-4 font-semibold text-gray-900">- Emily R.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-white via-gray-200 to-gray-400 py-16 text-center text-gray ">
                    <h2 className="text-3xl font-bold mb-4">
                        Join the Sweet Delights Family
                    </h2>
                    <p className="text-gray mb-8">
                        Sign up for our newsletter to receive exclusive offers and updates!
                    </p>
                    <form className="max-w-md mx-auto">
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 p-3 rounded-l-lg focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-white text-pink-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;