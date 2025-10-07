import react from "react";
import axios from "axios";
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];
import React from "react";
import { useNavigate } from "react-router-dom";


const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/department/single?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("API Response:", response.data);

    if (response.data.success) {
      onDepartmentDelete(id);
    } else {
      console.warn("Department delete failed:", response.data);
    }
  } catch (error) {
    console.error("Error deleting department:", error);
    if (error.response?.data?.error) {
      alert(error.response.data.error);
    }
  }
};
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>{" "}
    </div>
  );
};
export default DepartmentButtons;
