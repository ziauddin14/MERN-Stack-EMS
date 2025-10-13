import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component'
import EmployeeButtons, { columns } from "../../utils/EmployeeHalper";
import axios from "axios";
const List = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setEmploading] = useState(false)

  useEffect(() => {
  const fetchEmployee = async () => {
    setEmploading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.employee.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          dep_name: emp.department?.dep_name,
          name: emp.userId.name,
          dob: new Date(emp.dob).toLocaleDateString(),
          profileImage: emp.userId.profileImage,
          action: <EmployeeButtons id={emp._id} />,
        }));

        setEmployees(data);
      } else {
        console.warn("No success field found in response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setEmploading(false);
    }
  };

  fetchEmployee();
}, []);
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
      <div>
        <DataTable columns={columns} data={employees} pagination/>
      </div>
    </div>
  );
};

export default List;
