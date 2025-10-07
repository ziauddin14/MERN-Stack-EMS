import React from "react";
import { Link } from "react-router-dom";
const List = () => {
  return (
    <div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search By Dep Name"
          className="px-4 py-0.5"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
    </div>
  );
};

export default List;
