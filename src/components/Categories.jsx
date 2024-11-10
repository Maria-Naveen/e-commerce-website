import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className=" p-4 flex flex-col space-y-2 items-center sm:flex-row sm:space-y-0 sm:space-x-2  justify-around  ">
      <Link to="/" className="text-blue-500">
        All Products
      </Link>
      <Link to="/category/jewelery" className="text-blue-500">
        Jewelery
      </Link>
      <Link to="/category/men's clothing" className="text-blue-500">
        Men's Clothing
      </Link>
      <Link to="/category/electronics" className="text-blue-500">
        Electronics
      </Link>
      <Link to="/category/women's clothing" className="text-blue-500">
        Women's Clothing
      </Link>
    </div>
  );
};

export default Categories;
