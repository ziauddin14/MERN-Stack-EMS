import React from 'react'
import EmpSidebar from '../components/employeeDashboard/EmpSidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/dashboard/Navbar';
const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <EmpSidebar />
      <div className="flex-1 ml-64 bg-cyan-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDashboard
