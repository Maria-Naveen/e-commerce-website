import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <header className="p-5 bg-blue-500 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">My Store</h1>
      <nav className="flex items-center justify-evenly gap-8">
        <Link to="/">Home</Link>
        <Link to="/cart" className="relative p-3 ">
          Cart
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0  bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {totalQuantity}
            </span>
          )}
        </Link>
        <Link to="/orders">Orders</Link>
      </nav>
    </header>
  );
};

export default Header;
