import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Order from "./components/Order";
import ProtectedLayout from "./components/ProtectedLayout";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/products" /> : <Navigate to="/login" />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route index path="/products" element={<Products />} />
          <Route path="/category/:categoryName" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
