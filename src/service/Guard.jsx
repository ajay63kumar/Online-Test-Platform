// import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";


// Authenticated user guard
export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  return ApiService.isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};



// Admin only guard
export const AdminRoute = ({ children }) => {
  const role = ApiService.getRole()?.toUpperCase().trim();
  return role === "ADMIN" ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

// Teacher only guard
export const TeacherRoute = ({ children }) => {
  const role = ApiService.getRole()?.toUpperCase().trim();
  return role === "TEACHER" ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

// Multi-role guard (for pages accessible by multiple roles)
export const ManageRoute = ({ children, roles = [] }) => {
  const role = ApiService.getRole()?.toUpperCase().trim();
  return roles.includes(role) ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

