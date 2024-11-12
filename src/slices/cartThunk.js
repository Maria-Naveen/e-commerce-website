import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchCartDetails from "../slices/cartData"; // Your API call function

// Async thunk to fetch the user's cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { getState }) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    const response = await axios.post(
      "http://localhost:3000/api/cart",
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Assuming this returns the updated cart
  }
);

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (token, { rejectWithValue }) => {
    try {
      const cartDetails = await fetchCartDetails(token);
      return cartDetails; // Return the data to be added to the state
    } catch (error) {
      return rejectWithValue(error.message); // Handle any errors
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, quantity }, { getState }) => {
    const token = localStorage.getItem("token");
    console.log("Product Id:", productId);
    const response = await axios.patch(
      "http://localhost:3000/api/cart", // Your backend update route
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the updated cart data
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ id, token }, { rejectWithValue }) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:3000/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const placeCartOrder = createAsyncThunk(
  "cart/placeCartOrder",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cart/order",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Return any order confirmation details if needed
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
