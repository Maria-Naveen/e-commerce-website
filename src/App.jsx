import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Categories></Categories>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/category/:categoryName" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
