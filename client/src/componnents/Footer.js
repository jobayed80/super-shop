import React from "react";
// import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <div className="mt-10">
      {/* <FooterTop /> */}
      <hr className="border-2"></hr>
      <footer className="font-sans tracking-wide bg-gray-800 px-10 pt-12 pb-6 ">
        <div className="flex flex-wrap justify-between gap-10 ">
          {/* Company Info Section */}
          <div className="max-w-md text-white">
            <a href="javascript:void(0)">
              {/* <img
                src="https://img.freepik.com/free-vector/flat-design-food-twitter-header_23-2149180879.jpg?t=st=1738615641~exp=1738619241~hmac=3ed667e66217eca120421f1db0acb22fd3f5f4a6d027fa68570e6f5e6d434382&w=1380" // Replace with your actual logo URL
                alt="logo"
                className="w-36"
              /> */}
            </a>
            <div className="mt-6">
              <p className="text-gray-400 leading-relaxed text-sm">
                Our company is dedicated to providing high-quality products and services that help you streamline your workflow. We specialize in creating intuitive user interfaces with the latest technologies.
              </p>
            </div>
            <ul className="mt-10 flex space-x-5">
              {/* Social Media Icons */}
              <li>
                <a href="javascript:void(0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-blue-600 w-8 h-8"
                    viewBox="0 0 49.652 49.652"
                  >
                    <path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    viewBox="0 0 112.196 112.196"
                  >
                    <circle
                      cx="56.098"
                      cy="56.097"
                      r="56.098"
                      fill="#007ab9"
                    />
                    <path
                      fill="#fff"
                      d="M89.616 60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118-3.705 0-5.906 2.491-6.878 4.903-.353.862-.444 2.059-.444 3.268v22.524h-13.41s.18-36.546 0-40.329h13.411v5.715c-.027.045-.065.089-.089.132h.089v-.132c1.782-2.742 4.96-6.662 12.085-6.662 8.822 0 15.436 5.764 15.436 18.149zm-54.96-36.642c-4.587 0-7.588 3.011-7.588 6.967 0 3.872 2.914 6.97 7.412 6.97h.087c4.677 0 7.585-3.098 7.585-6.97-.089-3.956-2.908-6.967-7.496-6.967zm-6.791 59.77H41.27v-40.33H27.865v40.33z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    viewBox="0 0 152 152"
                  >
                    <linearGradient
                      id="a"
                      x1="22.26"
                      x2="129.74"
                      y1="22.26"
                      y2="129.74"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#fae100" />
                      <stop offset=".15" stopColor="#fcb720" />
                      <stop offset=".3" stopColor="#ff7950" />
                      <stop offset=".5" stopColor="#ff1c74" />
                      <stop offset="1" stopColor="#6c1cd1" />
                    </linearGradient>
                    <rect
                      width="152"
                      height="152"
                      fill="url(#a)"
                      rx="76"
                    />
                    <path
                      fill="#fff"
                      d="M94 36H58a22 22 0 0 0-22 22v36a22 22 0 0 0 22 22h36a22 22 0 0 0 22-22V58a22 22 0 0 0-22-22zm15 54.84A18.16 18.16 0 0 1 90.84 109H61.16A18.16 18.16 0 0 1 43 90.84V61.16A18.16 18.16 0 0 1 61.16 43h29.68A18.16 18.16 0 0 1 109 61.16z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    viewBox="0 0 1227 1227"
                  >
                    <path
                      d="M613.5 0C274.685 0 0 274.685 0 613.5S274.685 1227 613.5 1227 1227 952.315 1227 613.5 952.315 0 613.5 0z"
                    />
                    <path
                      fill="#fff"
                      d="m680.617 557.98 262.632-305.288h-62.235L652.97 517.77 470.833 252.692H260.759l275.427 400.844-275.427 320.142h62.239l240.82-279.931 192.35 279.931h210.074L680.601 557.98zM345.423 299.545h95.595l440.024 629.411h-95.595z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-800 font-semibold text-base relative max-sm:cursor-pointer">
              Services
            </h4>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="javascript:void(0)"
                  className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  Mobile App Development
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Company Info Section */}
          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-800 font-semibold text-base relative max-sm:cursor-pointer">
              Company
            </h4>
            <ul className="space-y-4 mt-6">
              <li>
                <a
                  href="javascript:void(0)"
                 className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                 className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Additional Links */}
          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-800 font-semibold text-base relative max-sm:cursor-pointer">
              Additional
            </h4>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="javascript:void(0)"
                 className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="hover:text-gray-500 text-gray-400 text-sm"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 py-6 border-t-2 border-gray-100">
          <p className="text-center text-sm text-gray-500">
            &copy; 2025 TrueStars. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
