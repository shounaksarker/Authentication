import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = () => {
  return localStorage.getItem("email") || localStorage.getItem("name") ? (
    <Outlet />
  ) : (
    <Navigate to="/authentication" />
  );
};

export default PrivateOutlet;
