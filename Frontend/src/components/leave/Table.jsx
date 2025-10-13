import React, { useEffect, useState } from "react";
import axios from "axios";
import { LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFiltereLeves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        const data = response.data.leaves.map((leave, index) => ({
          sno: index + 1,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.userId?.name || "N/A",
          leaveType: leave.leaveType || "N/A",
          department: leave.employeeId?.department?.dep_name || "N/A",
          days:
            Math.abs(
              Math.floor(
                (new Date(leave.endDate) - new Date(leave.startDate)) /
                  (1000 * 60 * 60 * 24)
              )
            ) + 1,
          status: leave.status || "N/A",
          action: <LeaveButtons Id={leave._id} />,
        }));

        console.log("Leaves API Data:", response.data.leaves);

        setLeaves(data);
        setFiltereLeves(data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(searchValue)
    );
    setFiltereLeves(data);
  };
  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFiltereLeves(data);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search By EMp Name"
          className="px-4 py-0.5 border border-cyan-400 rounded"
          onChange={filterByInput}
        />
        <div className="space-x-3">
          <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-800 rounded-md" onClick={() => filterByButton("Pending")}>
            Pending
          </button>
          <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-800 rounded-md" onClick={() => filterByButton("Approved")}>
            Approved
          </button>
          <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-800 rounded-md" onClick={() => filterByButton("Rejected")}>
            Rejected
          </button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredLeaves} pagination />
    </div>
  );
};

export default Table;
