import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHalper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate()
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target; 
    if (name == "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formDataObj = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   formDataObj.append(key, formData[key]);
    // });
    try {
      const response = await axios.post(
        "http://localhost:4000/api/employee/add",
        formData,
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

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*Name*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>
          {/*Email*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="example@example.com"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>
          {/*Employeee ID*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Employee ID
            </label>
            <input
              type="employeeId"
              name="employeeId"
              onChange={handleChange}
              placeholder="12548"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>
          {/*DOB*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Date Of Birth
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              placeholder="mm-dd-yy"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>
          {/*Geneder*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Gender
            </label>
            <select
              name="gender"
              onChange={handleChange}
              id=""
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/*Maritel Satus*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Maritel Status
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              id=""
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="maried">Married</option>
            </select>
          </div>
          {/*Designation*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Designation
            </label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              placeholder="designation"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>
          {/*Department*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Department
            </label>
            <select
              name="department"
              onChange={handleChange}
              id=""
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
          {/*Salary*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Salary
            </label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder="Salary"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>
          {/*Password*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="********"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>
          {/*Password*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              id=""
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          {/*Image Upload*/}
          {/* <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-cyan-700"
            >
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              placeholder="Upload Image"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div> */}
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 text-lg rounded"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
