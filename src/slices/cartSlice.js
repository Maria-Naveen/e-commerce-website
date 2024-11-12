import { createSlice } from "@reduxjs/toolkit";
import { fetchUserCart, deleteCartItem, placeCartOrder } from "./cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    orders: {
      items: [], //Array of ordered items
      totalAmount: 0, //Total amount for the orders
    }, //New state for orders
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      state.totalQuantity++;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalQuantity--;
      }
    },
    placeOrder: (state) => {
      const orderTotal = state.items.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
      state.orders.items.push(...state.items);
      state.orders.totalAmount += orderTotal;
      state.items = [];
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        const cartDetails = action.payload;
        state.items = cartDetails.items; // Populate with items from the backend
        state.totalQuantity = cartDetails.totalQuantity;
        state.orders = cartDetails.orders; // Populate orders if needed
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      })
      .addCase(placeCartOrder.fulfilled, (state, action) => {
        // Clear cart items and add items to orders state
        const orderDetails = action.payload;
        state.orders.items.push(...state.items);
        state.orders.totalAmount += orderDetails.totalAmount;
        state.items = [];
        state.totalQuantity = 0;
      })
      .addCase(placeCartOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  placeOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
