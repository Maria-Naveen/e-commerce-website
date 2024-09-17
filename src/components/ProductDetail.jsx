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
    <div className="p-4">
      <img
        className="w-full h-64 object-cover"
        src={currentProduct.image}
        alt={currentProduct.title}
      />
      <h1 className="mt-4 text-2xl font-bold">{currentProduct.title}</h1>
      <p className="mt-2 text-lg">{currentProduct.price}</p>
      <p className="mt-2">{currentProduct.category}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
