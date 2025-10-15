import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LeaveDetails = () => {
  const { id } = useParams();
  const [leaves, setLeaves] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Employee ID from URL:", id);
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);

        if (response.data.success) {
          setLeaves(response.data.leave);
        } else {
          console.warn("Leave fetch failed:", response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeave();
  }, [id]); // ✅ yahan par component close nahi karna

  if (loading || !leaves?.employeeId?.userId) {
    return (
      <p className="text-center mt-10 text-lg">Loading Leave details...</p>
    );
  }

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      } else {
        console.warn("Leave update failed:", response.data);
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Name:</p>
        <p className="font-medium">{leaves.employeeId?.userId?.name}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Employee ID:</p>
        <p className="font-medium">{leaves?.employeeId?.employeeId}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Leave Type:</p>
        <p className="font-medium">{leaves.leaveType}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Reason:</p>
        <p className="font-medium">{leaves.reason}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Department:</p>
        <p className="font-medium">{leaves.employeeId?.department?.dep_name}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Start Date:</p>
        <p className="font-medium">
          {new Date(leaves.startDate).toLocaleDateString()}
        </p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">End Date:</p>
        <p className="font-medium">
          {new Date(leaves.endDate).toLocaleDateString()}
        </p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">
          {leaves.status === "Pending" ? "Action:" : "Status:"}
        </p>
        {leaves.status === "Pending" ? (
          <div className="flex space-x-2">
            <button
              className="px-2 py-0.5 bg-green-500 hover:bg-green-700 text-white rounded"
              onClick={() => changeStatus(leaves._id, "Approved")}
            >
              Approve
            </button>
            <button
              className="px-2 py-0.5 bg-red-500 hover:bg-red-700 text-white rounded"
              onClick={() => changeStatus(leaves._id, "Rejected")}
            >
              Reject
            </button>
          </div>
        ) : (
          <p className="font-medium">{leaves.status}</p>
        )}
      </div>
    </div>
  );
};

export default LeaveDetails;
