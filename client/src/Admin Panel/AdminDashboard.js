import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import TopNav from "./TopNav";
import TopBox from "./TopBox";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col md:ml-64">
        {/* TopNav */}
        <TopNav />
        {/* <TopBox></TopBox> */}

        {/* Outlet for Pages */}
        <div className="p-5 flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;