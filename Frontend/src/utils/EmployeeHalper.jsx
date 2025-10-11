import axios from "axios";
import { useNavigate } from "react-router-dom";
import react from "react";
export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:4000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    } else {
      console.warn("No success field found in response:", response.data);
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};
//employee for salary form----
export const getEmploye = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:4000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    } else {
      console.warn("No success field found in response:", response.data);
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};
import React from "react";

const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-4">
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
      >
        Edit
      </button>
      <button className="px-3 py-1 bg-yellow-600 text-white rounded"
      onClick={() => navigate(`/admin-dashboard/salary/view/${_id}`)}
      >
        Salary
      </button>
      <button className="px-3 py-1 bg-red-600 text-white rounded">Leave</button>
    </div>
  );
};
export default EmployeeButtons;

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100",
  },
  {
    name: " Department",
    selector: (row) => row.dep_name,
    width: "130px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    width: "100px",
  },
  // {
  //   name: "Image",
  //   selector: (row) => row.profileImage,
  //   sortable: true
  // },
  {
    name: "Action",
    selector: (row) => <EmployeeButtons _id={row._id} />,
    center: true,
  },
];
