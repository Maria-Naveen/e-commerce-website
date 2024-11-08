import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "products/fetchProductStatus",
  async () => {
    console.log("fetchData called"); // Log to check if the thunk is called
    const token = localStorage.getItem("token"); // Retrieve the token
    try {
      const response = await axios.get("http://localhost:3000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      console.log("API Response:", response.data.products); // Log the response data
      return response.data.products;
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
      throw error; // Ensure the error is thrown to be handled by rejected case
    }
  }
);
