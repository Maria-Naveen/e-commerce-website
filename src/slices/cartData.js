import axios from "axios";

// const token = localStorage.getItem("token"); // Retrieve the token

const fetchCartDetails = async (token) => {
  try {
    console.log(token);
    const response = await axios.get("http://localhost:3000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );

    throw new Error("Failed to fetch cart details");
  }
};

export default fetchCartDetails;
