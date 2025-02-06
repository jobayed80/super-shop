import React from 'react'
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import Sidebar from './AdminSidebar';

const MainLayout = ({ isAdmin, setIsAdmin }) => {


    const navigate = useNavigate();
    // Handle logout (admin or client)
    const handleAdminLogout = () => {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin'); // Remove admin session
        navigate('/');  // Redirect to home
    };


    return (
        <>
        
        <div className="flex">
      {/* Sidebar */}
      {/* <AdminSidebar /> */}

      {/* Main content area */}
      <div className="ml-64 p-8 flex-grow">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome to the Admin Panel!</p>
      </div>
    </div>

        </>
    )
}

export default MainLayout