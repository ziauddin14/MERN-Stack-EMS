import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContex';
import axios from 'axios';

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const {id} = useParams()
  const fetchLeave = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchLeave();
    }
  }, [user]);

  let sno = 1;

  return (
    <div>
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-0.5 border border-cyan-400 rounded"
        />
        {user.role === "employee" && (
          <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Leave
        </Link>
        )}
      </div>

      <div>
        <table className="w-full text-sm text-left text-cyan-800">
          <thead className="text-xs text-white uppercase bg-cyan-700">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {(leaves?.length ?? 0) > 0 ? (
              leaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="border border-cyan-200 bg-cyan-50"
                >
                  <td className="px-6 py-3">{sno++}</td>
                  <td className="px-6 py-3">{leave.leaveType}</td>
                  <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3">{leave.reason}</td>
                  <td className="px-6 py-3">{leave.status || "Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3 text-gray-500">
                  No leaves found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;
