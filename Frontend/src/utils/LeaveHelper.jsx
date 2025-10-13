import { useNavigate } from "react-router-dom";
import React from "react";
export const columns = [
  { name: "S.No", selector: (row) => row.sno, sortable: true },
  { name: "Emp ID", selector: (row) => row.employeeId, sortable: true },
  { name: "Name", selector: (row) => row.name, sortable: true },
  { name: "Leave Type", selector: (row) => row.leaveType, sortable: true },
  { name: "Department", selector: (row) => row.department, sortable: true },
  { name: "Days", selector: (row) => row.days, sortable: true },
  { name: "Status", selector: (row) => row.status, sortable: true },
  { name: "Action", selector: (row) => row.action },
];


export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <button
      className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-700"
      onClick={() => handleView(Id)}
    >
      View
    </button>
  );
};
