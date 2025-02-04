import React from "react";
import Success from '../../assets/success.png'

const SuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center -mt-[200px]">
        
        {/* Success Illustration */}
        <div className="flex justify-center">
          <img
            src={Success}
            alt="Payment Successful"
            className="w-32 h-32 object-cover rounded-full shadow-lg"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-green-600 mt-6">Payment Successful</h1>

        {/* Description */}
        <p className="text-lg mt-4 text-gray-700">
          Thank you for your purchase! Your payment was successfully processed.
        </p>

        {/* Additional Order Information */}
        <div className="mt-6 text-gray-600">
          <p><strong>Order ID:</strong> #123456</p>
          <p><strong>Transaction ID:</strong> XYZ987654321</p>
        </div>

        {/* Customer Support */}
        <p className="mt-4 text-sm text-gray-500">
          Need help? Contact us at{" "}
          <a href="mailto:support@example.com" className="text-green-600 font-semibold underline">
            support@example.com
          </a>
        </p>

        {/* Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
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

export default SuccessPage;
