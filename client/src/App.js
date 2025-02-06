import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './componnents/Header';
import Footer from './componnents/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import ClientAuth from './pages/ClientAuth';
import Orders from './pages/Orders';
import FooterTop from './componnents/FooterTop';
import CartDetails from './pages/CartDetails';
import Cart from './pages/Cart';
import SuccessPage from './componnents/StripePayment/SuccessPage';
import CancelPage from './componnents/StripePayment/CancelPage';
import UserInformation from './pages/UserInformation';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ScrollToTop from './componnents/ScrollToTop';
import PopularCategoriesDetails from './pages/PopularCategoriesDetails';
import AdminDashboard from './Admin Panel/AdminDashboard';
import AdminProducts from './Admin Panel/AdminProducts';
import AdminSettings from './Admin Panel/AdminSettings';
import SalesReports from './Admin Panel/SalesReports';
import Customers from './Admin Panel/Customers';
import AdminSidebar from './Admin Panel/AdminSidebar';
import ProductDetails from './Admin Panel/ProductDetails';
import AdminMainDashboard from './Admin Panel/AdminMainDashboard';
// import Logout from './Admin Panel/Logout';

function App() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin);
  }, [isAdmin]);

  return (
    <>
      <Router>
        <div className="">
          {!isAdmin && <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
          <div className="flex-grow">
            <Routes>
              {isAdmin ? (
                <>
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />}>
                    <Route index element={<AdminMainDashboard></AdminMainDashboard>} />
                    <Route path="dashboard" element={<AdminMainDashboard/>} />
                    <Route path="product-management" element={<AdminProducts />} />
                    <Route path="sales-report" element={<SalesReports />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="product-details" element={<ProductDetails />} />
                    <Route path="sidebar" element={<AdminSidebar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} /> {/* just use korchi variable pass korar jnno  */}
                    {/* <Route path="logout" element={<Logout />} /> */}
                  </Route>
                  <Route path="*" element={<Navigate to="/admin" />} />  {/* Redirect to admin dashboard */}
                </>
              ) : (
                <>
                  {/* Client Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Product />} />
                  <Route path="/user-signin" element={<ClientAuth />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/user-information" element={<UserInformation />} />
                  <Route path="/product-details/:id" element={<CartDetails />} />
                  <Route path="/success" element={<SuccessPage />} />
                  <Route path="/cancel" element={<CancelPage />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/category/:categoryName" element={<PopularCategoriesDetails />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </div>
          {!isAdmin && <Footer />}
          <ScrollToTop />
        </div>
      </Router>
    </>
  );
}

export default App;