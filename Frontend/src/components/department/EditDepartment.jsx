import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/department/single?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          setDepartment(response.data.department);
        } else {
          console.warn("Department fetch failed:", response.data);
        }
      } catch (error) {
        console.error("Error fetching department:", error);
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Department updated successfully!");
        navigate('/admin-dashboard/departments')
      } else {
        alert("Update failed!");
      }
    } catch (error) {
      console.error("Error updating department:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="dep_name"
                className="text-sm font-medium text-cyan-700"
              >
                Department Name
              </label>
              <input
                type="text"
                name="dep_name"
                onChange={handleChange}
                value={department?.dep_name || ""}
                placeholder="Enter Department Name"
                className="mt-1 w-full p-2 border border-cyan-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-cyan-700 mt-4"
              >
                Description
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                value={department?.description || ""}
                placeholder="Description"
                className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
                rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Department
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
