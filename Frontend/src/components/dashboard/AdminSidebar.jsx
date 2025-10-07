import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendar,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
const AdminSidebar = () => {
  return (
    <div className="bg-cyan-700 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-800 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-sans">Employee MS</h3>
      </div>
      <div>
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded'`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employee"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded'`
          }
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded'`
          }
        >
          <FaBuilding />
          <span>Departments</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
        >
          <FaCalendar />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
        >
          <FaCogs />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
