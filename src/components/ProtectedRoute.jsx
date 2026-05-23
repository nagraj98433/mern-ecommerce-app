import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { userInfo } = useSelector((state) => state.user);

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
