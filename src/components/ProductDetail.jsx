import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice"; // Import the addToCart action

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const currentProduct = products.find((prod) => prod.id === +productId);

  console.log(currentProduct);

  if (!currentProduct) return <p>Product not found</p>;

  const handleAddToCart = () => {
    dispatch(addToCart(currentProduct));
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <img
        className="w-96 h-64 object-cover md:h-48"
        src={currentProduct.image}
        alt={currentProduct.title}
      />
      <div className="p-4">
        <h1 className="mt-4 text-2xl font-bold">{currentProduct.title}</h1>
        <p>Rating: {currentProduct.rating.rate}</p>
        <p>Total Reviews: {currentProduct.rating.count}</p>
        <p className="mt-2 text-lg text-gray-500">
          Price: {currentProduct.price}
        </p>
        <p>{currentProduct.description}</p>
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
