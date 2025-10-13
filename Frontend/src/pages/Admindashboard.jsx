import React from "react";
import { useAuth } from "../context/authContex";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
const Admindashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-cyan-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Admindashboard;
