import React, { useEffect, useState } from "react";
import BodyCards from "./BodyCards";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const AdminBody = () => {
  const [body, setBody] = useState(null);

  useEffect(() => {
    const fetchBody = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        const response = await axios.get("http://localhost:4000/api/dashboard/body", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        console.log("Dashboard Data:", response.data);
        setBody(response.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        alert(error.response?.data?.error || "Server error");
      }
    };
    fetchBody();
  }, []);

  if (!body) {
    return <div>Loadingg....</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <BodyCards
          icons={<FaUsers />}
          text="Total Employees"
          number={body.totalEmployees}
          color="bg-teal-600"
        />
        <BodyCards
          icons={<FaBuilding />}
          text="Total Departments"
          number={body.totalDep}
          color="bg-yellow-600"
        />
        <BodyCards
          icons={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={body.totalSalaries}
          color="bg-red-600"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <BodyCards
            icons={<FaFileAlt />}
            text="Leave Applied"
            number={body.leaveSummary.appliedFor}
            color="bg-teal-600"
          />
          <BodyCards
            icons={<FaCheckCircle />}
            text="Leave Approved"
            number={body.leaveSummary.approved}
            color="bg-green-600"
          />
          <BodyCards
            icons={<FaHourglassHalf />}
            text="Leave Pending"
            number={body.leaveSummary.pending}
            color="bg-yellow-600"
          />
          <BodyCards
            icons={<FaTimesCircle />}
            text="Leave Rejected"
            number={body.leaveSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminBody;
