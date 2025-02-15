import React, { useEffect, useState } from "react";
import { supabase } from "../lib/createClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, Button, Image } from 'antd';


const UserInformation = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [favoriteConfection, setFavoriteConfection] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [dietaryPreferences, setDietaryPreferences] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null); // New state for image URL
    const [showImage, setShowImage] = useState(false);
  
    const [searchEmail, setSearchEmail] = useState("");
    const [emailExists, setEmailExists] = useState(null);
    const [error, setError] = useState(null);
    const [userFound, setUserFound] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); //
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
  
    const [notification, setNotification] = useState(false);
  
    // const handleUpdate = () => {

    // Insert data into Supabase
    const handleInsert = async () => {
      setLoading(true);
      try {
        let profileImageUrl = null;
  
        // Upload profile image if available
        if (profileImage) {
          const { data, error } = await supabase.storage
            .from("images")
            .upload(`public/${Date.now()}-${profileImage.name}`, profileImage);
  
          if (error) throw error;
  
          profileImageUrl = data.path;
        }
  
        // Insert user data
        const { error } = await supabase.from("users").insert([
          {
            email,
            name,
            phoneNumber,
            favoriteConfection,
            deliveryAddress,
            dietaryPreferences,
            profileImage: profileImageUrl,
          },
        ]);
  
        if (error) throw error;
  
        alert("User added successfully!");
        // Reset the form
        setEmail("");
        setName("");
        setPhoneNumber("");
        setDeliveryAddress("");
        setDietaryPreferences("");
        setFavoriteConfection("");
        setProfileImage(null);
        setProfileImageUrl(null);
      } catch (error) {
        alert("Error inserting data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
  
    // Search user by email
    const handleSearch = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", searchEmail)
          .single();
  
        if (error) throw error;
  
        // Populate the form fields with the fetched data
        setName(data.name);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setDeliveryAddress(data.deliveryAddress);
        setDietaryPreferences(data.dietaryPreferences);
        setFavoriteConfection(data.favoriteConfection);
        if (data.profileImage) {
          // Generate a public URL for the image
          const { data: publicUrlData } = supabase.storage
            .from("images")
            .getPublicUrl(data.profileImage);
  
          setProfileImageUrl(publicUrlData.publicUrl || null);
        } else {
          setProfileImageUrl(null);
        }
      } catch (error) {
        console.error("Error fetching user: ", error.message);
      } finally {
        setLoading(false);
      }
    };
  
  
    // Auto-search when 'searchEmail' changes
    useEffect(() => {
      if (searchEmail.trim() !== "") {
        handleSearch();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchEmail]);
  
    // Update user data
    const handleUpdate = async () => {
      setLoading(true);
      try {
        let profileImageUrl = null;
  
        // Upload new profile image if selected
        if (profileImage) {
          const { data, error } = await supabase.storage
            .from("images")
            .upload(`public/${Date.now()}-${profileImage.name}`, profileImage);
  
          if (error) throw error;
  
          profileImageUrl = data.path;
        }
  
        // Update user data
        const updates = {
          email,
          name,
          phoneNumber,
          favoriteConfection,
          deliveryAddress,
          dietaryPreferences,
          ...(profileImageUrl && { profileImage: profileImageUrl }), // Only update if a new profile image is uploaded
        };
  
        const { error } = await supabase
          .from("users")
          .update(updates)
          .eq("email", email);
  
        if (error) throw error;
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setNotification(true);
          setTimeout(() => setNotification(false), 3000);
        }, 1000);
        // alert("User updated successfully!");
        window.location.reload();
      } catch (error) {
        alert("Error updating user: " + error.message);
      } finally {
        setLoading(false);
      }
    };
  
  
  
  
  
  
  
  
  
  
  
  
  
    // ekahne email check kortece from supabase, jodi email found then show edit button na hole add button.
    const checkEmailInSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("users") // Replace "users" with your actual table name
          .select("email") // Fetch only the email column
          .eq("email", email); // Match the email entered by the user
  
        if (error) throw error;
  
        if (data.length > 0) {
          setEmailExists(true);
          // Swal.fire("Email Found", "The email already exists in the database.", "info");
        } else {
          setEmailExists(false);
          // Swal.fire("Email Not Found", "No user found with this email.", "error");
        }
      } catch (error) {
        console.error("Error checking email:", error);
        Swal.fire("Error", "There was a problem checking the email.", "error");
      }
    };
  
    useEffect(() => {
      checkEmailInSupabase()
    })
  
    // First useEffect: Check if the user is logged in and if the email is verified
    useEffect(() => {
      const checkSession = async () => {
        const { data: session } = await supabase.auth.getSession();
        if (session?.session) {
          const { user } = session.session;
          if (user?.email_confirmed_at) {
            setEmail(user.email); // Store user information in the state
            setSearchEmail(user.email); // Store user information in the state
            // alert(user)
          } else {
            setError("Please verify your email before accessing this page.");
            // navigate('/user-signin')
          }
        } else {
          setError("You must be logged in to access this page.");
          navigate('/user-signin')
        }
      };
      checkSession();
    }, []); // Runs once when the component mounts
  
    

    


    
  return (
    <div>
    <section className="min-h-screen flex items-center justify-center  bg-gradient-to-r from-white via-gray-200 to-gray-400 py-20  ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row items-center lg:items-start w-full max-w-6xl bg-white border border-gray-300 rounded-xl overflow-hidden"
      >
        {/* Left Side Content */}
        <div className="w-full lg:w-2/5 p-8 bg-gradient-to-br from-blue-600 via-teal-500 to-green-400 text-white flex flex-col justify-center items-center min-h-screen hidden lg:flex">
          <h2 className="text-4xl font-extrabold text-center mb-6 animate__animated animate__fadeInUp">Welcome to the Confectionery Project</h2>
          <p className="text-xl text-center mb-8 animate__animated animate__fadeInUp animate__delay-1s">
            Manage your users and preferences seamlessly with this modern and user-friendly interface.
            Our system allows you to handle everything efficiently, giving you full control over your data and preferences.
          </p>
          <ul className="space-y-4 text-lg list-inside animate__animated animate__fadeInUp animate__delay-2s">
            <li className="flex items-center">🍰 <span className="ml-2">Manage Confectionery Preferences</span></li>
            <li className="flex items-center">📋 <span className="ml-2">Collect Dietary Information</span></li>
            <li className="flex items-center">📍 <span className="ml-2">Save Delivery Addresses</span></li>
            <li className="flex items-center">📸 <span className="ml-2">Add Profile Pictures</span></li>
          </ul>
        </div>
  
        {/* Right Side Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-3/5 p-8"
        >
          <header className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 uppercase animate-text">
              User Form
            </h1>
            <p className="text-gray-600 mt-3">Fill in the details below.</p>
          </header>
          <hr />
  
          <form className="space-y-6 mt-3">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-400 focus:outline-none"
                />
              </div>
            </div>
  
            {/* Phone Number & Dietary Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="dietaryPreferences">Dietary Preferences</label>
                <input
                  type="text"
                  name="dietaryPreferences"
                  id="dietaryPreferences"
                  placeholder="Dietary Preferences"
                  value={dietaryPreferences}
                  onChange={(e) => setDietaryPreferences(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
  
            {/* Delivery Address */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="deliveryAddress">Delivery Address</label>
              <textarea
                name="deliveryAddress"
                id="deliveryAddress"
                placeholder="Delivery Address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
  
            {/* Favorite Confectionery */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="favoriteConfectionery">Favorite Confectionery</label>
              <select
                name="favoriteConfectionery"
                id="favoriteConfectionery"
                value={favoriteConfection}
                onChange={(e) => setFavoriteConfection(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>Select your favorite confectionery</option>
                <option value="Cakes">Cakes</option>
                <option value="Chocolates">Chocolates</option>
                <option value="Pastries">Pastries</option>
                <option value="Candy">Candy</option>
                <option value="Cupcakes">Cupcakes</option>
                <option value="Breads">Breads</option>
                <option value="Muffins">Muffins</option>
                <option value="Donuts">Donuts</option>
                <option value="Brownies">Brownies</option>
                <option value="Pies Tarts">Pies & Tarts</option>
                <option value="Fudge">Fudge</option>
              </select>
            </div>
  
            {/* Profile Image */}
            <div className="text-center">
              <label className="block text-gray-700 mb-2 font-medium" >Profile Image</label>
              <hr className="border-2 mb-4" />
              
              <input
                type="file"
                id="profileImage"
                onChange={(e) => setProfileImage(e.target.files ? e.target.files[0] : null)}
                className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <div className="mt-4">
                {profileImageUrl && (
                  <div className="flex justify-center">
                    <Image
                      width={160}
                      height={160}
                      src={profileImageUrl}
                      className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
  
            {emailExists !== null && (
              <div className="mt-4 flex gap-4">
                {emailExists ? (
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleInsert}
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                  >
                    Insert
                  </button>
                )}
              </div>
            )}
          </form>
  
        </motion.div>
      </motion.div>
    </section>
  </div>
  
  )
}

export default UserInformation