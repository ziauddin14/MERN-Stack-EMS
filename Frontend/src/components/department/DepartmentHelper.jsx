import react from 'react'

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
]
import React from 'react'
import { useNavigate } from 'react-router-dom'
const DepartmentButtons =({_id}) =>{
    const navigate = useNavigate()
    return(
        <div className='flex space-x-3'>
            <button className='px-3 py-1 bg-teal-600 text-white rounded'
            onClick={() => navigate(`/admin-dashboard/department/${_id}`) }>Edit</button>
            <button className='px-3 py-1 bg-red-600 text-white rounded'>Delete</button>
        </div>
    )
}
export default DepartmentButtons;