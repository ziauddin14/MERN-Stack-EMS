import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBody from "./components/dashboard/AdminBody";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivetRoutes from "./utils/PrivetRoutes";
import ProtustedRoutes from "./utils/ProtustedRoutes";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartments from "./components/department/AddDepartments";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin-dashboard"
        element={
          <PrivetRoutes>
            <ProtustedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </ProtustedRoutes>
          </PrivetRoutes>
        }
      >
        <Route index element={<AdminBody />} />
        <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
        <Route path="/admin-dashboard/add-department" element={<AddDepartments />} />
        <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />
        <Route path="/admin-dashboard/employee" element={<List />} />
        <Route path="/admin-dashboard/add-employee" element={<Add />} />

      </Route>

      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
    </Routes>
  );
}

export default App;
