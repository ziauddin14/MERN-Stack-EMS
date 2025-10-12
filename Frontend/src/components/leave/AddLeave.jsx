import React, { useState } from "react";
import { useAuth } from "../../context/authContex";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leave, setLeave] = useState({
    userId: user._id,
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handlChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/leave/add",leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      } else {
        console.warn("Employee fetch failed:", response.data);
      }
    } catch (error) {
      console.error("Error fetching Employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request For Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <label className="block text-sm font-medium text-cyan-700">
            Leave Type
          </label>
          <select
            name="leaveType"
            onChange={handlChange}
            className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-cyan-700">
              From Date
            </label>
            <input
              type="date"
              name="startDate"
              onChange={handlChange}
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-700">
              To Date
            </label>
            <input
              type="date"
              name="endDate"
              onChange={handlChange}
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-cyan-700">
            Description
          </label>
          <textarea
            name="reason"
            placeholder="Reason"
            onChange={handlChange}
            className="w-full border border-cyan-300 p-2 rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          {loading ? "Submitting..." : "Add Leave"}
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
