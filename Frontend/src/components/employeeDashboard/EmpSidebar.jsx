import React from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  FaBuilding,
  FaCalendar,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../context/authContex";
const EmpSidebar = () => {
    const {user} = useAuth()
  return (
    <div className="bg-cyan-700 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-800 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-sans">Employee MS</h3>
      </div>
      <div>
        <NavLink
          to="/employee-dashboard"
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
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded'`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded'`
          }
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded'`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : ""
            } flex items-center space-x-4 block py-2.5 px-4 rounded'`
          }
        >
          <FaCogs />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default EmpSidebar;
