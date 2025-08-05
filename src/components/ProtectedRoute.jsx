import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/useAuth.js';


export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
