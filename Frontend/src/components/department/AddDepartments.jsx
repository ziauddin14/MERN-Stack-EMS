import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartments = () => {
    const [deaprtment, setDepartment]= useState({
        dep_name:'',
        description: ''
    })
     const navigate = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...deaprtment, [name] : value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:4000/api/department/add', deaprtment, {
                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate('/admin-dashboard/departments')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }


  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <div>
        <h2 className="text-2xl font-bold mb-6">Add Department</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="dep_name"
              className="text-sm font-medium text-cyan-700"
            >
              {" "}
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              onChange={handleChange}
              placeholder="Enter Dep Name"
              className="mt-1 w-full p-2 border border-cyan-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-cyan-700"
            >
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              id=""
              placeholder="Descriptionn"
              className="mt-1 p-2 block w-full border border-cyan-300 rounded-md"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartments;
