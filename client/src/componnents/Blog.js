import React from "react";
import { FiArrowRight } from "react-icons/fi";

const Blog = () => {
  return (
    <>
      <div data-aos="zoom-in" className="bg-gradient-to-r from-white via-gray-200 to-gray-300">
        <section className="container mx-auto lg:pt-[10px] lg:pb-20 transition-all pt-20">
          {/* Updated Title and Subtitle */}
          {/* Blog Main Title and Subtitle */}
          <div className="container mx-auto text-center mb-12 text-black">
            <h2
              className="text-4xl font-extrabold mb-4"
              style={{ fontFamily: 'Cursive, sans-serif', borderBottom: '2px solid #37A168', display: 'inline-block', paddingBottom: '4px' }}
            >
              Our Sweet Stories
            </h2>

            <p className="text-xl pt-4 opacity-80 mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
              Dive into our world of sweets! Get the latest updates, recipes, and trends in the world of baking.
            </p>

          </div>




          <div className="flex flex-wrap justify-center -mx-4 mt-24">
            {/* Blog Item 1 */}
            <div data-aos="zoom-in" className="w-full px-4 md:w-1/2 lg:w-1/3 mb-8">
              <div className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
                <div className="mb-8 overflow-hidden rounded-t-lg">
                  <img
                    src="https://img.freepik.com/free-photo/chocolate-cake-bites-with-chocolate-sauce-with-fruits-berries_114579-44552.jpg?uid=R170429557&ga=GA1.1.453133905.1736260813&semt=ais_hybrid"
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
                  <p className="text-base text-body-color dark:text-dark-6 mb-4">
                    Discover the rich flavors of our signature chocolate pastry topped with velvety ganache and sprinkled with cocoa powder. A treat for all chocolate lovers.
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
                    src="https://img.freepik.com/free-photo/homemade-delicious-rustic-summer-berry-tartles_114579-10244.jpg?uid=R170429557&ga=GA1.1.453133905.1736260813&semt=ais_hybrid"
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
                    src="https://img.freepik.com/premium-photo/delicate-vanilla-cupcakes-with-cream-raspberries-white-wooden_128299-6.jpg?uid=R170429557&ga=GA1.1.453133905.1736260813&semt=ais_hybrid"
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

          {/* Call to Action Section */}
          <div className="bg-gradient-to-r from-white via-gray-200 to-gray-400 py-20 text-center text-gray rounded-xl">
            <h3 className="text-3xl font-semibold mb-6">
              Craving for More Sweet Creations?
            </h3>
            <p className="text-lg mb-6">
              Join our growing community of dessert lovers! Sign up for exclusive access to new recipes, discounts, and seasonal offers.
            </p>
            <a
              href="/subscribe"
              className="bg-green-600 text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Subscribe Now
            </a>
          </div>

          {/* Additional Info Section */}
          {/* <div className="container mx-auto text-center py-20">
            <h3 className="text-3xl font-semibold text-black mb-8">
              Discover Our Confectionery Expertise
            </h3>
            <p className="text-lg text-body-color dark:text-dark-6 mb-12">
              We are passionate about creating confections that bring joy to your taste buds. Whether it's decadent cakes, rich chocolates, or delicate pastries, our team uses only the finest ingredients to ensure every bite is a sweet experience.
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <h4 className="text-xl font-bold text-black mb-3">Custom Orders</h4>
                <p className="text-lg text-body-color dark:text-dark-6 mb-6">
                  Have a special event coming up? We specialize in custom orders tailored to your occasion!
                </p>
                <a
                  href="/custom-orders"
                  className="text-primary text-lg hover:text-primary-dark transition-colors"
                >
                  Learn More
                </a>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-black mb-3">Gift Boxes</h4>
                <p className="text-lg text-body-color dark:text-dark-6 mb-6">
                  Treat your loved ones with our exquisite gift boxes filled with delightful sweets.
                </p>
                <a
                  href="/gift-boxes"
                  className="text-primary text-lg hover:text-primary-dark transition-colors"
                >
                  Explore Options
                </a>
              </div>
            </div>
          </div> */}
        </section>
      </div>
    </>
  );
};

export default Blog;
