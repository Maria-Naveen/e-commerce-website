import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice"; // Import the addToCart action

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const currentProduct = products.find((prod) => prod.id === +productId);

  // console.log(currentProduct);
  const [isAdded, setIsAdded] = useState(false);

  if (!currentProduct) return <p>Product not found</p>;

  const handleAddToCart = () => {
    if (!isAdded) {
      dispatch(addToCart(currentProduct));
      setIsAdded(true); // Mark as added
      toast.success(`${currentProduct.title} has been added to your cart!`);
    } else {
      toast.info(`${currentProduct.title} is already in your cart.`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center p-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className="w-full md:w-1/4 mb-4 md:mb-0 text-center p-5 ">
        <img
          className="w-64 h-64 p-6 mx-auto"
          src={currentProduct.image}
          alt={currentProduct.title}
        />
        <p className="mt-2 text-blue-500">
          Rating: {currentProduct.rating.rate}
        </p>
        <p className="text-blue-500">
          Total Reviews: {currentProduct.rating.count}
        </p>
      </div>
      <div className="w-full md:w-3/4 md:pl-4 p-4s">
        <h1 className="mt-4 text-2xl font-bold">{currentProduct.title}</h1>
        <p className="mt-2 text-lg text-gray-500">
          Price: {currentProduct.price}
        </p>
        <p className="mt-2 text-gray-700">{currentProduct.description}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
