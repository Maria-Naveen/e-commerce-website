import React from "react";
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="p-4 flex justify-between items-center bg-blue-300">
      <p>My E-Commerce</p>
      <input
        type="text"
        className="w-1/4 bg-blue-100 py-2 pl-2 placeholder:italic placeholder:text-slate-800"
        placeholder="Search..."
      />
      <button className="bg-blue-100 p-3">
        <IoCartOutline className="text-xl" />
      </button>
      <button className="italic bg-blue-100 p-3">Go to Admin</button>
    </div>
  );
};

export default Header;
