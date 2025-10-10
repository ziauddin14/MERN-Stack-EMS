import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Employee ID from URL:", id);
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/employee/single/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          console.warn("Employee fetch failed:", response.data);
        }
      } catch (error) {
        console.error("Error fetching Employee:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee(); 
  }, [id]);

  if (loading || !employee?.userId) {
    return <p className="text-center mt-10 text-lg">Loading employee details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={employee?.userId?.profileImage || "/default-profile.png"}
          alt="Employee"
          className="w-48 h-48 object-cover rounded-full mx-auto"
        />
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Name:</p>
        <p className="font-medium">{employee?.userId?.name}</p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Employee ID:</p>
        <p className="font-medium">{employee?.employeeId}</p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Date Of Birth:</p>
        <p className="font-medium">
          {new Date(employee?.dob).toLocaleDateString()}
        </p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Gender:</p>
        <p className="font-medium">{employee?.gender}</p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Department:</p>
        <p className="font-medium">{employee?.department?.dep_name}</p>
      </div>
      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Marital Status:</p>
        <p className="font-medium">{employee?.maritalStatus}</p>
      </div>
    </div>
  );
};

export default View;
