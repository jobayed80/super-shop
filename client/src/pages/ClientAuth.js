import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "antd";
import { supabase } from '../lib/createClient';


const ClientAuth = () => {

    const navigate = useNavigate();
    // thsi used for email and profile picture and name collect
    const [storeEmail, setStoreEmail] = useState("")
    const [profileImage, setProfileImage] = useState("");
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false); // To toggle between signup and login
  
    const [user, setUser] = useState(null); // Store the user information

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
      
        const { email, password } = formData;
      
        try {
          if (isSignUp) {
            // Sign Up Logic
            const { user, error: signUpError } = await supabase.auth.signUp({
              email,
              password,
            });
            if (signUpError) throw new Error(signUpError.message);
            alert('User signed up:', user);
            localStorage.setItem("clientEmail", formData.email);
            localStorage.setItem("clientPassword", formData.password)
          } else {
            // Sign In Logic
            const { user, error: signInError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            if (signInError) throw new Error(signInError.message);
            // alert('User logged in:', user);
            navigate("/")
          }
        } catch (err) {
          console.error('Login error:', err.message); // Log detailed error
          setError(err.message); // Show the error message
        } finally {
          setLoading(false);
        }
      };
      // eta hocce jokhn admin login korben tokhn email and pass store hoyetader local device e
      useEffect(() => {
        // Check if email and password are stored in localStorage
        const savedEmail = localStorage.getItem("clientEmail");
        const savedPassword = localStorage.getItem("clientPassword");
      
        if (savedEmail) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            email: savedEmail,
          }));
        }
        
        if (savedPassword) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            password: savedPassword,
          }));
        }
        
      }, []);
    

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 mt-[300px]">
    {/* Main Content */}
    <div className="flex-grow flex items-start justify-center pt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10 w-full max-w-5xl">
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
              <h3 className="text-2xl font-bold text-gray-800">{isSignUp ? "Registration" : "Login Panel"}</h3>
              <p className="text-sm text-gray-500">
                {isSignUp ? "Create your account to access the dashboard." : "Please log in with your credentials to access the dashboard."}
              </p>
            </div>

            {/* Form Toggle */}
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
                // value={emailAdmin}
                // onChange={(e) => setEmailAdmin(e.target.value)}
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
              </div>

              {/* Login/Signup Button */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
              >
                {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
              </button>

              {/* <Button
                type="primary"
                htmlType="submit"
                className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white border-none rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-600"
              >
                {isSignup ? "Sign Up" : "Login"}
              </Button> */}

              {/* Signup / Login Redirect */}
              {/* <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {isSignup ? "Already have an account? " : "Don't have an account? "}
                  <span
                    onClick={handleRegister}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    {isSignup ? "Login" : "Signup"}
                  </span>
                </p>
              </div> */}
            </form>

            {/* Toggle between SignUp and Login */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span
                  onClick={() => setIsSignUp(!isSignUp)} // Toggle between SignUp and Login
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  {isSignUp ? 'Login' : 'Sign Up'}
                </span>
              </p>
            </div>



          </motion.div>
        </div>
      </div>
    </div>

  </div>
  )
}

export default ClientAuth