// ProtectedLayout.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Categories from "./Categories";

const ProtectedLayout = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} />;
  } else {
    return (
      <>
        <Header />
        <Categories />
        <Outlet />
      </>
    );
  }
};

export default ProtectedLayout;
