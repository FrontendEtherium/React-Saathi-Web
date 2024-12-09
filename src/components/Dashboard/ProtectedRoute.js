import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userType = localStorage.getItem("userType"); // Check if userType exists in localStorage

  return userType === "Admin" || userType === "Saathi" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
