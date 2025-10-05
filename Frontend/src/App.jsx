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
        <Route path="departments" element={<DepartmentList />} />
      </Route>

      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
    </Routes>
  );
}

export default App;
