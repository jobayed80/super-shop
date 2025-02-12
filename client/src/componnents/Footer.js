import React, { useState } from "react";
import { Button, Modal } from 'antd';





const Footer = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const [isModalOpenTerms, setIsModalOpenTerms] = useState(false);
  const showModalTerms = () => {
    setIsModalOpenTerms(true);
  };

  const handleOkTerms = () => {
    setIsModalOpenTerms(false);
  };

  const handleCancelTerms = () => {
    isModalOpenTerms(false);
  };

  
  return (
    <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800">
     <hr className="border-t-2 border-transparent bg-gradient-to-r from-pink-300 via-yellow-300 to-teal-300 h-1" />

      <footer className="font-sans tracking-wide px-10 pt-12 pb-6">
        <div className="flex flex-wrap justify-between gap-10">
          {/* Company Info Section */}
          <div className="max-w-md text-gray-700">
            <a href="/" className="text-3xl font-semibold text-gray-200">
             Galaxy Super Shop
            </a>
            <div className="mt-6">
              <p className="text-gray-300 leading-relaxed text-sm">
                At Galaxy Super shop, we specialize in creating the finest
                handcrafted sweets and pastries. From decadent chocolates to
                mouth-watering cakes, each product is made with love and the
                finest ingredients. Join us for a delightful experience!
              </p>
            </div>
            <ul className="mt-10 flex space-x-5">
              {/* Social Media Icons */}
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
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
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
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
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
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
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
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
            <h4 className="text-gray-200 font-semibold text-lg">Our Services</h4>
            <ul className="mt-6 space-y-4 text-gray-300">
              <li>
                <a
                  href="/custom-cakes"
                  className="hover:text-gray-500 text-sm"
                >
                  Custom Cakes
                </a>
              </li>
              <li>
                <a
                  href="/chocolates"
                  className="hover:text-gray-500  text-sm"
                >
                  Gourmet Chocolates
                </a>
              </li>
              <li>
                <a
                  href="/pastries"
                  className="hover:text-gray-500  text-sm"
                >
                  Fresh Pastries
                </a>
              </li>
              <li>
                <a
                  href="/event-catering"
                  className="hover:text-gray-500 text-sm"
                >
                  Event Catering
                </a>
              </li>
            </ul>
          </div>

          {/* About Us Section */}
          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-200 font-semibold text-lg">About Us</h4>
            <ul className="space-y-4 mt-6 text-gray-300">
              <li>
                <a
                  href="/about-us"
                  className="hover:text-gray-500  text-sm"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="/team"
                  className="hover:text-gray-500  text-sm"
                >
                  Meet The Team
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="hover:text-gray-500  text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="hover:text-gray-500  text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="max-lg:min-w-[140px]">
            <h4 className="text-gray-200 font-semibold text-lg">Legal</h4>
            <ul className="mt-6 space-y-4 text-gray-300">
              <li>
                <p
                  href="/privacy-policy"
                  className="hover:text-gray-500 cursor-pointer text-sm"
                  onClick={showModal}
                >
                  Privacy Policy
                </p>
              </li>
              <li>
                <p
                  href="/terms"
                  className="hover:text-gray-500 cursor-pointer text-sm"
                  onClick={showModalTerms}
                >
                  Terms & Conditions
                </p>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-gray-500  text-sm"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 py-6 border-t-2 border-gray-100">
          <p className="text-center text-sm text-gray-300">
            &copy; 2025 Sweet Delights. All rights reserved.
          </p>
        </div>
      </footer>




      <Modal title=" গোপনীয়তা নীতি দেখুন" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      
        {/* Privacy Policy Content in Bangla */}
        <div className="text-gray-700 space-y-4">
          <p>
            আমরা আপনার গোপনীয়তাকে শ্রদ্ধা করি এবং আপনার ব্যক্তিগত তথ্যের সুরক্ষার জন্য প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতিতে, আমরা ব্যাখ্যা করব কীভাবে আমরা আপনার তথ্য সংগ্রহ, ব্যবহার এবং রক্ষা করি।
          </p>

          <h3 className="font-semibold text-gray-900">১. তথ্য সংগ্রহ</h3>
          <p>
            আমাদের কনফেকশনারি ওয়েবসাইটে আপনি যখন নিবন্ধন করেন বা অর্ডার দেন, আমরা আপনার নাম, ফোন নম্বর, ইমেইল ঠিকানা এবং ঠিকানা সংগ্রহ করতে পারি।
          </p>

          <h3 className="font-semibold text-gray-900">২. তথ্য ব্যবহারের উদ্দেশ্য</h3>
          <ul className="list-disc pl-6">
            <li>আপনার অর্ডার প্রক্রিয়া ও সরবরাহ নিশ্চিত করা।</li>
            <li>সেবা ও গ্রাহক সহায়তা প্রদান করা।</li>
            <li>আপনার মতামত ও প্রতিক্রিয়া সংগ্রহ করা।</li>
          </ul>

          <h3 className="font-semibold text-gray-900">৩. তথ্য সুরক্ষা</h3>
          <p>
            আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে আমরা উন্নত প্রযুক্তি ব্যবহার করি এবং কোনো তৃতীয় পক্ষের কাছে তা শেয়ার করা হয় না।
          </p>

          <h3 className="font-semibold text-gray-900">৪. যোগাযোগ</h3>
          <p>
            যদি আপনার গোপনীয়তা নীতি সম্পর্কিত কোনো প্রশ্ন থাকে, দয়া করে আমাদের সাথে যোগাযোগ করুন: <strong>support@confectionery.com</strong>
          </p>
        </div>

        {/* Close Button
        <div className="text-right mt-4">
          <Button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => setModalIsOpen(false)}
          >
            বন্ধ করুন
          </Button>
        </div> */}
      </Modal>


      <Modal title="  শর্তাবলী দেখুন " open={isModalOpenTerms} onOk={handleOkTerms} keyboard={true} width={900}>
      
        {/* Terms & Conditions in Bangla */}
        <div className="text-gray-700 space-y-4">
          <p>
            আমাদের কনফেকশনারি ওয়েবসাইটে প্রবেশ ও আমাদের সেবা ব্যবহারের মাধ্যমে, আপনি নিম্নলিখিত শর্তাবলী মেনে নিতে সম্মত হচ্ছেন।
          </p>

          <h3 className="font-semibold text-gray-900">১. পরিষেবার গ্রহণযোগ্যতা</h3>
          <p>
            আমাদের ওয়েবসাইট এবং পরিষেবা শুধুমাত্র ১৮ বছর বা তার অধিক বয়সের গ্রাহকদের জন্য প্রযোজ্য। আমাদের সাইট ব্যবহার করে, আপনি নিশ্চিত করছেন যে আপনি এই শর্ত পূরণ করেন।
          </p>

          <h3 className="font-semibold text-gray-900">২. পণ্য এবং অর্ডার</h3>
          <ul className="list-disc pl-6">
            <li>সমস্ত অর্ডার নিশ্চিত হওয়ার পরে তা প্রক্রিয়াকরণ করা হবে।</li>
            <li>আমরা পণ্যের স্টক উপলব্ধতার উপর ভিত্তি করে অর্ডার গ্রহণ করি।</li>
            <li>আমরা অর্ডার বাতিল করার অধিকার সংরক্ষণ করি যদি কোনো কারিগরি বা অপারেশনাল সমস্যা দেখা দেয়।</li>
          </ul>

          <h3 className="font-semibold text-gray-900">৩. অর্থপ্রদান ও রিফান্ড</h3>
          <p>
            আমাদের ওয়েবসাইটে প্রদত্ত পেমেন্ট পদ্ধতিগুলি ব্যবহার করে গ্রাহকরা অর্থ প্রদান করতে পারবেন। একবার অর্থপ্রদান নিশ্চিত হলে, সেটি ফেরতযোগ্য নয়, তবে বিশেষ পরিস্থিতিতে আমরা রিফান্ড অফার করতে পারি।
          </p>

          <h3 className="font-semibold text-gray-900">৪. গোপনীয়তা ও নিরাপত্তা</h3>
          <p>
            আমরা আমাদের গ্রাহকদের ব্যক্তিগত তথ্য সুরক্ষিত রাখার প্রতিশ্রুতি দিচ্ছি। আপনার তথ্য আমাদের গোপনীয়তা নীতির অধীনে রক্ষা করা হবে এবং আমরা তৃতীয় পক্ষের সঙ্গে শেয়ার করব না।
          </p>

          <h3 className="font-semibold text-gray-900">৫. আইনি দায়</h3>
          <p>
            আমাদের ওয়েবসাইটে প্রদত্ত সমস্ত তথ্য সঠিক রাখতে আমরা সর্বোচ্চ চেষ্টা করি, তবে আমরা কোনো তথ্যের নির্ভুলতার গ্যারান্টি দিতে পারি না।
          </p>

          <h3 className="font-semibold text-gray-900">৬. পরিবর্তন ও সংশোধন</h3>
          <p>
            আমরা যে কোনো সময় এই শর্তাবলী পরিবর্তন করার অধিকার সংরক্ষণ করি। পরিবর্তিত নীতিমালা ওয়েবসাইটে আপডেট করা হবে।
          </p>

          <h3 className="font-semibold text-gray-900">৭. যোগাযোগ</h3>
          <p>
            আমাদের শর্তাবলী সম্পর্কে আরও জানতে, আমাদের সাথে যোগাযোগ করুন: <strong>support@confectionery.com</strong>
          </p>
        </div>
      </Modal>



    </div>
  );
};

export default Footer;
