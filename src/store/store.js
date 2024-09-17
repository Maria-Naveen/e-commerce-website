import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice.js";
import cartReducer from "../slices/cartSlice.js";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});
