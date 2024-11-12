import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../slices/cartSlice";
import {
  fetchUserCart,
  deleteCartItem,
  placeCartOrder,
} from "../slices/cartThunk";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchUserCart(token)); // Fetch the cart details on mount
    }
  }, [dispatch, token]);

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveItem = (id) => {
    // Dispatch thunk to remove item from both backend and Redux state
    dispatch(deleteCartItem({ id, token }));
  };

  const handlePlaceOrder = async () => {
    try {
      await dispatch(placeCartOrder(token)).unwrap(); // Place order via backend
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
              key={item.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>
                  {item.price} x {item.quantity} = {item.totalPrice}
                </p>
              </div>
              <div className="flex items-center">
                <button onClick={() => handleDecrementQuantity(item.id)}>
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => handleIncrementQuantity(item.id)}>
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
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
