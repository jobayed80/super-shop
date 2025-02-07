import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/createClient";
import Swal from 'sweetalert2'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Image } from 'antd';

const AdminProducts = () => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [build_date, setBuild_date] = useState("");
  const [expire_date, setExpire_date] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const convertToBangladeshTime = (utcDate) => {
    const options = {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(utcDate));
  };


  // Fetch all products from Supabase when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select()
        .order("id", { ascending: true }); // Fetch in descending order based on 'id'

      if (error) {
        console.error(error);
      } else {
        // Reverse the data array to display from first ID to last ID
        setProducts(data.reverse());
      }
    };
    fetchProducts();
  }, []);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
      setShowImage(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset form
    setProductName("");
    setProductCategory("");
    setPrice("");
    setDescription("");
    setIngredients("");
    setBuild_date("");
    setExpire_date("");
    setStock("");
    setWeight("");
    setUnit("");
    setProductImage(null);
    setShowImage(false);

    try {
      const fileName = `${Date.now()}-${productImage.name}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from("images")
        .upload(fileName, productImage);

      if (storageError) {
        console.error("Error uploading image:", storageError);
        alert("Failed to upload image!");
        return;
      }

      const imageUrl = supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl;

      const { data, error } = await supabase.from("products").insert([
        {
          name: productName,
          category: productCategory,
          price: price,
          description: description,
          ingredients: ingredients,
          buildDate: build_date,
          expireDate: expire_date,
          stock: stock,
          weight: weight,
          unit: unit,
          image_url: imageUrl,
        },
      ]);

      if (error) {
        console.error("Error inserting product:", error);
        alert("Failed to add product!");
        return;
      }

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "prroduct insert successfully"
      });
      // window.location.reload();

      // Reset form
      setProductName("");
      setProductCategory("");
      setPrice("");
      setDescription("");
      setIngredients("");
      setBuild_date("");
      setExpire_date("");
      setStock("");
      setWeight("");
      setUnit("");
      setProductImage(null);
      setShowImage(false);

      // Fetch updated list of products
      const { data: updatedData, error: fetchError } = await supabase.from("products").select();
      if (!fetchError) {
        setProducts(updatedData);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong!");
    }
  };

  // Handle Edit Product
  const handleEdit = (product) => {
    setEditProduct(product);
    setProductName(product.name);
    setProductCategory(product.category);
    setPrice(product.price);
    setBuild_date(product.buildDate);
    setExpire_date(product.expireDate);
    setStock(product.stock);
    setWeight(product.weight);
    setUnit(product.unit);
    setDescription(product.description);
    setIngredients(product.ingredients);
    setShowModal(true);
  };

  // Handle Delete Product
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the product permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const { data, error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        console.error("Error deleting product:", error);
        Swal.fire("Error", "Failed to delete product", "error");
      } else {
        setProducts(products.filter((product) => product.id !== id));
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowModal(false);
    setEditProduct(null);
  };

  // Handle update product in modal
  const handleUpdate = async () => {
    try {
      const updatedProduct = {
        name: productName,
        category: productCategory,
        price: price,
        description: description,
        ingredients: ingredients,
        buildDate: build_date,
        expireDate: expire_date,
        stock: stock,
        weight: weight,
        unit: unit,
      };

      const { data, error } = await supabase
        .from("products")
        .update(updatedProduct)
        .eq("id", editProduct.id);

      if (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product!");
        return;
      }

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "product updated successfully"
      });
      window.location.reload();

      // Fetch updated list of products
      const { data: updatedData, error: fetchError } = await supabase.from("products").select();
      if (!fetchError) {
        setProducts(updatedData);
      }

      // Close modal
      setShowModal(false);
      setEditProduct(null);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong!");
    }
  };



  // this part used for previous and next table
  const rowsPerPage = 6; // Show 6 rows per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indices for the rows to display
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = products.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(products.length / rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // this part used for Search product name
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

  const filteredProducts = products.filter((product) =>  // Filter products based on the search term
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 min-h-screen"
    >
      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6"
      >
        <h1 className="text-3xl font-bold">Confectionary Products Management</h1>
        <p className="mt-2 text-lg">
          Add and manage your confectionary products with ease.
        </p>
      </motion.div>

      {/* Product Form */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-xl mb-6 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Add New Product</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Cakes">Cakes</option>
                <option value="Cookies">Cookies</option>
                <option value="Chocolates">Chocolates</option>
                <option value="Pastries">Pastries</option>
                <option value="Candy">Candy</option>
                <option value="Cupcakes">Cupcakes</option>
                <option value="Breads">Breads</option>
                <option value="Muffins">Muffins</option>
                <option value="Donuts">Donuts</option>
                <option value="Brownies">Brownies</option>
                <option value="Pies">Pies</option>
                <option value="Tarts">Tarts</option>
                <option value="Fudge">Fudge</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">Build Date</label>
              <input
                type="date"
                value={build_date}
                onChange={(e) => setBuild_date(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">
                Expire Date
              </label>
              <input
                type="date"
                value={expire_date}
                onChange={(e) => setExpire_date(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter stock quantity"
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">Weight</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter stock quantity"
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">Unit</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Enter stock quantity"
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">
                Ingredients
              </label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients (separate by commas)"
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">
                Product Image
              </label>
              <input
                type="file"
                onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                accept="image/*"
                required
              />
              {showImage && productImage && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={productImage}
                    alt="Product Preview"
                    className="w-24 h-24 rounded-lg object-cover shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </motion.div>


      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>


        <table className="w-full table-auto">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-4">Id</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Image</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Weight</th>
              <th className="p-4">Unit</th>
              <th className="p-4">Build Date</th>
              <th className="p-4">Expire Date</th>
              <th className="p-4">Description</th>
              <th className="p-4">Ingredients</th>
              <th className="p-4">Last Time</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows && filteredProducts.length > 0 ? (
              filteredProducts
                .filter((product) => currentRows.includes(product)) // Ensure the product exists in currentRows
                .map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-200">
                    <td className="p-4">{product.id}</td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="px-4 py-2 border">
                      {product.image_url ? (
                        <Image
                        width={80}
                        src={product.image_url}
                        className="w-16 h-16 rounded-lg shadow-sm"
                      />
                        // <img
                        //   src={product.image_url}
                        //   alt={product.name}
                        //   className="w-16 h-16 rounded-lg shadow-sm"
                        // />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">{product.weight}</td>
                    <td className="p-4">{product.unit}</td>
                    <td className="p-4">{product.buildDate}</td>
                    <td className="p-4">{product.expireDate}</td>
                    <td className="p-4">{product.description}</td>
                    <td className="p-4">{product.ingredients}</td>
                    <td className="p-4">{convertToBangladeshTime(product.created_at)}</td>
                    <td className="p-4 flex">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 flex items-center space-x-2"
                      >
                        <FaEdit className="text-white" />
                        <span></span>
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <FaTrash className="text-white" />
                        <span></span>
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center p-6 text-gray-600 bg-gray-50 border rounded-lg shadow-sm">
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75h4.5m-2.25-2.25v4.5m7.5-9h-15a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V4.5A2.25 2.25 0 0019.5 2.25z"
                      />
                    </svg>
                    <p className="text-lg font-semibold">No Products Found</p>
                    <p className="text-sm text-gray-500">Try adjusting your filters or search criteria.</p>
                  </div>
                </td>

              </tr>
            )}
          </tbody>

        </table>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
              }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
              }`}
          >
            Next
          </button>
        </div>
      </motion.div>

      {/* Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-4xl h-auto max-h-[90vh] overflow-y-auto">

            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 font-bold text-2xl"
            >
              ×
            </button>
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Edit Product</h2>
            <form className="space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Left Column (text inputs) */}
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 ease-in-out w-full"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-medium mb-2">Category</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 ease-in-out w-full"
                    required
                  >
                    <option value="Cakes">Cakes</option>
                    <option value="Cookies">Cookies</option>
                    <option value="Chocolates">Chocolates</option>
                    <option value="Pastries">Pastries</option>
                    <option value="Candy">Candy</option>
                    <option value="Cupcakes">Cupcakes</option>
                    <option value="Breads">Breads</option>
                    <option value="Muffins">Muffins</option>
                    <option value="Donuts">Donuts</option>
                    <option value="Brownies">Brownies</option>
                    <option value="Pies">Pies</option>
                    <option value="Tarts">Tarts</option>
                    <option value="Fudge">Fudge</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-medium mb-2">Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 ease-in-out w-full"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-medium mb-2">Stock</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 ease-in-out w-full"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-medium mb-2">Weight</label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 ease-in-out w-full"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-medium mb-2">Unit</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 ease-in-out w-full"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-medium mb-2">Build Date</label>
                  <input
                    type="date"
                    value={build_date}
                    onChange={(e) => setBuild_date(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 ease-in-out w-full"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-medium mb-2">Expire Date</label>
                  <input
                    type="date"
                    value={expire_date}
                    onChange={(e) => setExpire_date(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 ease-in-out w-full"
                    required
                  />
                </div>
              </div>

              {/* Right Column (textarea and image) */}
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-medium mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 ease-in-out w-full"
                    rows="4"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-medium mb-2">Ingredients</label>
                  <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 ease-in-out w-full"
                    rows="3"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-medium mb-2">Product Image</label>
                  <input
                    type="file"
                    onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 ease-in-out w-full"
                    accept="image/*"
                    required
                  />
                  {productImage && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={URL.createObjectURL(productImage)}
                        alt="Product Preview"
                        className="w-24 h-24 rounded-full object-cover shadow-md"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="w-full bg-purple-600 text-white p-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 ease-in-out"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>



      )}
    </motion.div>
  );
};

export default AdminProducts;
