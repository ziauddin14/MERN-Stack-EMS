import axios from "axios";
import React from "react";
import { useState } from "react";
import { useAuth } from "../context/authContex";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigation = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();        
        console.log("Form submitted with:", { email, password });
        try {
            const response = await axios.post("http://localhost:4000/api/auth/login", {
                email,
                password
            });
            if (response.status === 200) {
                console.log("Login successful:", response.data);
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigation("/admin-dashboard");
                } else {
                    navigation("/employee-dashboard");
                }
            } else {
                console.error("Login failed:", response.data);
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
        }
    };
  return (
    <div
      className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-cyan-500 from-50% 
    to-gray-100 to-50% space-y-6"
    >
      <h2 className="font-pacific text-3xl text-white">
        Employee Management System
      </h2>
      <div className="border shadow p-6 w-80 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-cyan-600" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-cyan-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="mb-4">
              <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Login
           </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;