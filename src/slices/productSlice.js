import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./apiData";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        console.log("Loading state:", state.loading); // Log loading state
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        console.log("Fetched products:", action.payload); // Log fetched products
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("Error:", action.error.message); // Log error message
      });
  },
});

export default productSlice.reducer;
