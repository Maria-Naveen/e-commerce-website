import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedLayout = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedLayout;
