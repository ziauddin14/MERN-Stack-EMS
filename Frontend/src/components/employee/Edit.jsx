import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchDepartments } from "../../utils/EmployeeHalper";

const Edit = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    };
    getDepartments();
  }, []);

  useEffect(() => {
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEmployee((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/employee/update/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employee");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading...</div>;
  }

  if (!employee) {
    return <div className="text-center text-red-600 mt-10">Employee not found</div>;
  }


  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-cyan-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={employee.userId?.name || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-cyan-700">Marital Status</label>
            <select
              name="maritalStatus"
              value={employee.maritalStatus || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-cyan-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={employee.designation || ""}
              onChange={handleChange}
              placeholder="Designation"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-cyan-700">Salary</label>
            <input
              type="number"
              name="salary"
              value={employee.salary || ""}
              onChange={handleChange}
              placeholder="Salary"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>

          {/* Department */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-cyan-700">Department</label>
            <select
              name="department"
              value={employee.department?._id || ""}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 text-lg rounded"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default Edit;
