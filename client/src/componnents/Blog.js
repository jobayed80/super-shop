import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const Blog = () => {

  
  return (
    <>
      <section className="lg:pt-[10px] lg:pb-20 bg-white dark:bg-dark transition-all">
      {/* <Title className="" text="Our Blog" />s */}
      <hr className="mt-2" />
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
              
                <h2 className="mb-4 mt-10 text-3xl font-bold text-black sm:text-4xl md:text-[40px] dark:text-black">
                  Sweet Temptations Our Latest Treats
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  Indulge in our mouthwatering selection of freshly made sweets,
                  chocolates, and pastries. Every bite is a piece of perfection.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            {/* Blog Item 1 */}
            <div className="w-full px-4 md:w-1/2 lg:w-1/3 mb-8">
              <div className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                <div className="mb-8 overflow-hidden rounded-t-lg">
                  <img
                    src="https://img.freepik.com/free-photo/chocolate-cake-bites-with-chocolate-sauce-with-fruits-berries_114579-44552.jpg?uid=R170429557&ga=GA1.1.453133905.1736260813&semt=ais_hybrid" // Replace with your actual image URL
                    alt="Chocolate Pastry"
                    className="w-full h-64 object-cover transition-all hover:scale-110 transform"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-4 py-1 mb-5 text-xs font-semibold text-center text-black rounded bg-primary">
                    Jan 12, 2025
                  </span>
                  <h3>
                    <a
                      href="/blog/chocolate-pastry"
                      className="block mb-4 text-xl font-semibold text-black hover:text-primary transition-colors"
                    >
                      Decadent Chocolate Pastry: A Heavenly Experience
                    </a>
                  </h3>
                  <p className="text-base text-justify text-body-color dark:text-dark-6 mb-4">
                    Discover the rich flavors of our signature chocolate pastry
                    topped with velvety ganache and sprinkled with cocoa powder.
                    A treat for all chocolate lovers.
                  </p>
                  <a
                    href="/blog/chocolate-pastry"
                    className="text-primary text-lg flex items-center justify-start hover:text-primary transition-colors"
                  >
                    Read More
                    <FiArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>

            {/* Blog Item 2 */}
            <div className="w-full px-4 md:w-1/2 lg:w-1/3 mb-8">
              <div className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                <div className="mb-8 overflow-hidden rounded-t-lg">
                  <img
                    src="https://img.freepik.com/free-photo/homemade-delicious-rustic-summer-berry-tartles_114579-10244.jpg?uid=R170429557&ga=GA1.1.453133905.1736260813&semt=ais_hybrid" // Replace with your actual image URL
                    alt="Fruit Tart"
                    className="w-full h-64 object-cover transition-all hover:scale-110 transform"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-4 py-1 mb-5 text-xs font-semibold text-center text-black rounded bg-primary">
                    Jan 10, 2025
                  </span>
                  <h3>
                    <a
                      href="/blog/fruit-tart"
                      className="block mb-4 text-xl font-semibold text-black hover:text-primary transition-colors"
                    >
                      Fresh Fruit Tart: A Burst of Flavors, Perfectly Balanced
                    </a>
                  </h3>
                  <p className="text-base text-body-color dark:text-dark-6 mb-4 text-justify">
                  Enjoy the light and crisp pastry filled with rich vanilla custard, topped with fresh seasonal fruits and a dusting of powdered sugar for a delightful finish.
                  </p>
                  <a
                    href="/blog/fruit-tart"
                    className="text-primary text-lg flex items-center justify-start hover:text-primary transition-colors"
                  >
                    Read More
                    <FiArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>

            {/* Blog Item 3 */}
            <div className="w-full px-4 md:w-1/2 lg:w-1/3 mb-8">
              <div className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                <div className="mb-8 overflow-hidden rounded-t-lg">
                  <img
                    src="https://img.freepik.com/premium-photo/delicate-vanilla-cupcakes-with-cream-raspberries-white-wooden_128299-6.jpg?uid=R170429557&ga=GA1.1.453133905.1736260813&semt=ais_hybrid" // Replace with your actual image URL
                    alt="Vanilla Cupcakes"
                    className="w-full h-64 object-cover transition-all hover:scale-110 transform"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-4 py-1 mb-5 text-xs font-semibold text-center text-black rounded bg-primary">
                    Jan 08, 2025
                  </span>
                  <h3>
                    <a
                      href="/blog/vanilla-cupcakes"
                      className="block mb-4 text-xl font-semibold text-black hover:text-primary transition-colors"
                    >
                      Soft & Fluffy Vanilla Cupcakes with Buttercream Frosting
                    </a>
                  </h3>
                  <p className="text-base text-body-color dark:text-dark-6 mb-4 text-justify">
                  Our light and fluffy vanilla cupcakes are topped with smooth buttercream frosting, a hint of vanilla bean, and colorful sprinkles. Perfect for any occasion.
                  </p>
                  <a
                    href="/blog/vanilla-cupcakes"
                    className="text-primary text-lg flex items-center justify-start hover:text-primary transition-colors"
                  >
                    Read More
                    <FiArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
