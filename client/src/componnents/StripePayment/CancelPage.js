import React from "react";
import Cancel from '../../assets/cancel.png'

const CancelPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-200 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center -mt-[200px]">
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src={Cancel}
            alt="Payment Canceled"
            className="w-32 h-32 object-cover rounded-full shadow-lg"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-red-600 mt-6">Payment Canceled</h1>

        {/* Description */}
        <p className="text-lg mt-4 text-gray-700">
          It seems you’ve canceled the payment. Don’t worry! If you have any questions, feel free to reach out to our support team.
        </p>

        {/* Additional Content */}
        <p className="mt-4 text-sm text-gray-500">
          Need help? Email us at{" "}
          <a href="mailto:support@example.com" className="text-red-600 font-semibold underline">
            support@example.com
          </a>
        </p>

        {/* Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
        >
          Go to Home
        </button>

        {/* Footer Note */}
        <p className="text-sm mt-6 text-gray-400">
          © 2025 The Galaxy Super Shop. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default CancelPage;
