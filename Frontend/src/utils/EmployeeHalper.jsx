 
 import axios from "axios";
 
 export const fetchDepartments = async () => {

     let departments;
    try {
      const response = await axios.get("http://localhost:4000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        departments = response.data.departments

      } else {
        console.warn("No success field found in response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } 
    return departments
  };
