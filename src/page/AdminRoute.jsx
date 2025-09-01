// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import ApiService from "../service/ApiService";

const AdminRoute = ({ children }) => {
  const role = ApiService.getRole()?.toString().trim().toUpperCase();

  if (role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-xl font-bold">
        🚫 Unauthorized: Admin access only
      </div>
    );
    
  }

  return children;
};

export default AdminRoute;
