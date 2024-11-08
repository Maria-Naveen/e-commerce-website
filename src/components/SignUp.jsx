import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { registerUser } from "../api/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      toast.success(response.message);
      console.log("Navigating to /login");
      navigate("/login");
    } catch (error) {
      console.log("Signup failed:", error);
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 p-4 flex flex-col justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Bounce}
      />
      <h1 className="text-xl font-bold mb-4">MyStore Signup</h1>
      <form onSubmit={handleSignup} className="flex flex-col w-full max-w-sm">
        <label htmlFor="name" className="mb-1">
          {" "}
          Name:{" "}
        </label>
        <input
          type="text"
          name="name"
          className="w-full p-2 rounded mb-4"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="email" className="mb-1">
          {" "}
          Email:{" "}
        </label>
        <input
          type="email"
          name="email"
          className="w-full p-2 rounded mb-4"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="mb-1">
          {" "}
          Password:{" "}
        </label>
        <input
          type="password"
          name="password"
          className="w-full p-2 rounded mb-4"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="address" className="mb-1">
          {" "}
          Address:{" "}
        </label>
        <input
          type="text"
          name="address"
          className="w-full p-2 rounded mb-4"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400 transition duration-200"
        >
          Signup
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          {" "}
          Log in{" "}
        </Link>
      </p>
    </div>
  );
};

export default Signup;
