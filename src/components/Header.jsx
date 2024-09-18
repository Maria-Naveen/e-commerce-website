import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">My Store</h1>
      <nav>
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/cart" className="relative">
          Cart
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0  bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {totalQuantity}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
