import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchDepartments, getEmploye } from "../../utils/EmployeeHalper";

const AddSalary = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //  Fetch Departments
  useEffect(() => {
    const loadDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    };
    loadDepartments();
  }, []);

  //  Fetch Employee by ID (if id present)
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/employee/single/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) setEmployee(res.data.employee);
      } catch (err) {
        console.error("Error fetching Employee:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  //  Handle Department Change
  const handleDepartment = async (e) => {
    const emps = await getEmploye(e.target.value);
    setEmployeesList(emps || []);
  };

  //  Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  //  Submit Form
  const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔹 Build the correct payload
  const salaryData = {
    employeeId: employee.employee, // 👈 convert "employee" → "employeeId"
    basicSalary: employee.basicSalary,
    allowances: employee.allowances,
    deductions: employee.deduction, // 👈 convert "deduction" → "deductions"
    payDate: employee.payDate,
  };

  console.log("📤 Salary Data Sent:", salaryData);

  try {
    const res = await axios.post(
      "http://localhost:4000/api/salary/add",
      salaryData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.data.success) {
      alert("Salary added successfully!");
      navigate("/admin-dashboard/employee");
    }
  } catch (err) {
    console.error(" Salary Add Error:", err);
    alert("Failed to add salary");
  }
};


  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-cyan-700">
              Department
            </label>
            <select
              name="department"
              onChange={handleDepartment}
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

          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-cyan-700">
              Employee
            </label>
            <select
              name="employee"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
              required
            >
              <option value="">Select Employee</option>
              {employeesList.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} ({emp.employeeId})
                </option>
              ))}
            </select>
          </div>

          {/* Basic Salary */}
          <div>
            <label className="block text-sm font-medium text-cyan-700">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>

          {/* Allowances */}
          <div>
            <label className="block text-sm font-medium text-cyan-700">
              Allowances
            </label>
            <input
              type="number"
              name="allowances"
              onChange={handleChange}
              placeholder="Allowances"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>

          {/* Deductions */}
          <div>
            <label className="block text-sm font-medium text-cyan-700">
              Deductions
            </label>
            <input
              type="number"
              name="deduction"
              onChange={handleChange}
              placeholder="Deduction"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>

          {/* Pay Date */}
          <div>
            <label className="block text-sm font-medium text-cyan-700">
              Pay Date
            </label>
            <input
              type="date"
              name="payDate"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 text-lg rounded"
        >
          Add Salary
        </button>
      </form>
    </div>
  );
};

export default AddSalary;
