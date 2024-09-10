import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Products from "./components/Products";

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Categories></Categories>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/category/:categoryName" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
