import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Input, Checkbox } from "antd";
import { supabase } from '../lib/createClient';
import { FaGoogle } from 'react-icons/fa';
import PasswordStrengthBar from 'react-password-strength-bar'; // Install a package for password strength meter

const ClientAuth = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between signup and login
  const [user, setUser] = useState(null); // Store the user information
  const [passwordStrength, setPasswordStrength] = useState(0); // Track password strength
  const [acceptTerms, setAcceptTerms] = useState(false); // Checkbox for terms and conditions

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordStrengthChange = (score) => {
    setPasswordStrength(score); // Update password strength score
  };

  // Handle form submission (signup/login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password, name } = formData;

    try {
      if (isSignUp) {
        // Sign Up Logic
        const { user, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw new Error(signUpError.message);
        localStorage.setItem("clientEmail", formData.email);
        localStorage.setItem("clientPassword", formData.password);
        alert("User signed up");
      } else {
        // Sign In Logic
        const { user, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw new Error(signInError.message);
        navigate("/");
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message); // Show the error message
    } finally {
      setLoading(false);
    }
  };

  // Check for saved credentials in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("clientEmail");
    const savedPassword = localStorage.getItem("clientPassword");

    if (savedEmail) setFormData((prevData) => ({ ...prevData, email: savedEmail }));
    if (savedPassword) setFormData((prevData) => ({ ...prevData, password: savedPassword }));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center mx-auto bg-gradient-to-r from-white via-gray-200 to-gray-400">
      <div className="flex-grow flex items-start justify-center pt-10">
        <div className=" shadow-lg rounded-lg p-6 md:p-8 lg:p-10 w-full max-w-5xl mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Side Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <h2 className="text-3xl font-bold text-blue-600">Welcome Back!</h2>
              <p className="text-gray-500 text-center">
                Access your personalized dashboard by logging in to the admin panel.
              </p>
              <img
                src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7872.jpg?uid=R170429557&ga=GA1.1.453133905.1736260813&semt=ais_hybrid"
                alt="Client Login"
                className="w-full max-w-sm rounded-md"
              />
            </motion.div>

            {/* Right Side Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {isSignUp ? "Registration" : "Login Panel"}
                </h3>
                <p className="text-sm text-gray-500">
                  {isSignUp
                    ? "Create your account to access the dashboard."
                    : "Please log in with your credentials to access the dashboard."}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm font-medium text-center"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Name Input (only for sign up) */}
                {isSignUp && (
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  {isSignUp && (
                    <PasswordStrengthBar
                      password={formData.password}
                      scoreWords={['Weak', 'Fair', 'Good', 'Strong']}
                      onChangeScore={handlePasswordStrengthChange}
                    />
                  )}
                </div>

                {/* Terms and Conditions Checkbox */}
                {isSignUp && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <span className="text-sm text-gray-500">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                    </span>
                  </div>
                )}

                {/* Login/Signup Button */}
                <button
                  type="submit"
                  disabled={loading || (isSignUp && !acceptTerms)}
                  className="w-full py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
                >
                  {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
                </button>

                {/* Forgot Password Link */}
                {!isSignUp && (
                  <div className="mt-2 text-center">
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot Password?
                    </a>
                  </div>
                )}
              </form>

              {/* Toggle between SignUp and Login */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <span
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    {isSignUp ? "Login" : "Sign Up"}
                  </span>
                </p>
              </div>

              
            </motion.div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ClientAuth;
