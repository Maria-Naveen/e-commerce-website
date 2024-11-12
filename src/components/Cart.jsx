import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GridLoader } from "react-spinners";
import {
  fetchUserCart,
  deleteCartItem,
  placeCartOrder,
  updateCartQuantity,
} from "../slices/cartThunk";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const [loadingItem, setLoadingItem] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchUserCart(token)); // Fetch the cart details on mount
    }
  }, [dispatch, token, loadingItem]);

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity > 0) {
      setLoadingItem(id); // Show spinner for this item
      await dispatch(
        updateCartQuantity({ productId: id, quantity: newQuantity })
      );
      setLoadingItem(null); // Hide spinner after update
    } else {
      alert("Quantity must be greater than zero.");
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(deleteCartItem({ id, token }));
  };

  const handlePlaceOrder = async () => {
    try {
      await dispatch(placeCartOrder(token)).unwrap();
      alert("Your order has been placed!");
      navigate("/orders");
    } catch (err) {
      console.error("Order placement failed:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading cart...</div>; // Show loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      <p>{totalQuantity} Items in cart</p>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.customId}
              className="flex items-center justify-between p-2 border-b"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {item.productId.title}
                </h3>
                <p>
                  {item.productId.price} x {item.quantity} = {item.totalPrice}
                </p>
              </div>
              <div className="flex items-center">
                {loadingItem === item.customId ? (
                  <GridLoader color="#3498db" size={10} />
                ) : (
                  <>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.customId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.customId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.customId)}
                      className="ml-4 text-red-500"
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          <button
            onClick={handlePlaceOrder}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
