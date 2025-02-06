import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

import { supabase } from "../lib/createClient";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("contact_messages").insert([
      { name: formData.name, email: formData.email, message: formData.message },
    ]);

    if (error) {
      setStatus("Error sending message.");
    } else {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-gray-200 to-gray-400  p-6">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Get in Touch</h2>
        <p className="text-center text-gray-600 mb-6">We would love to hear from you! Fill out the form below.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
        {status && <p className="text-center mt-4 text-green-500 font-semibold">{status}</p>}
        <div className="mt-6 text-center text-gray-700">
          <p>Or reach us at:</p>
          <p className="font-semibold">contact@yourwebsite.com</p>
          <p>123-456-7890</p>
          <p className="mt-4">Follow us on social media:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
            <a href="#" className="text-blue-400 hover:text-blue-600">Twitter</a>
            <a href="#" className="text-pink-500 hover:text-pink-700">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
