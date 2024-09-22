import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  placeOrder,
} from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handlePlaceOrder = () => {
    //calculating the total payable amount
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    dispatch(placeOrder());
    alert("Your order has been placed!");
    navigate("/orders", { state: { totalAmount } }); //passing total amount as state
  };

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
                <button onClick={() => dispatch(decrementQuantity(item.id))}>
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => dispatch(incrementQuantity(item.id))}>
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
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
