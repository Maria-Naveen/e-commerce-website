import React from "react";
import { useSelector } from "react-redux";

const Order = () => {
  const orders = useSelector((state) => state.cart.orders);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Your Orders</h2>
      {orders.items.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.items.map((order, index) => (
          <div key={index} className="border-b p-2">
            <h3 className="text-lg font-semibold">{order.title}</h3>
            <p>
              {order.price} x {order.quantity} = {order.totalPrice}
            </p>
          </div>
        ))
      )}
      <p className="mt-4 font-bold">Total Amount: {orders.totalAmount}</p>
    </div>
  );
};

export default Order;
