import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import LoginImage from "../assets/login.svg";
import { loginUser } from "../api/authService";
import { useDispatch } from "react-redux";
import { fetchData } from "../slices/apiData"; // Import your fetchData action
import SyncLoader from "react-spinners/SyncLoader"; // Import SyncLoader

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [showSpinner, setShowSpinner] = useState(false); // State to control spinner visibility
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to={"/products"} />;
    // Redirect to products if already logged in
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent further submissions if loading

    setLoading(true); // Start loading
    setShowSpinner(true); // Immediately show the spinner

    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem("token", token); // Store token securely
      toast.success("Welcome back!");

      // Dispatch fetchData to load products after successful login
      await dispatch(fetchData()); // Ensure fetchData is awaited if it returns a promise

      // Navigate to products page after successful login
      navigate("/products");
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false); // End loading
      setShowSpinner(false); // Hide spinner if it was shown
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 p-4 flex flex-col md:flex-row justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Bounce}
      />
      <img
        src={LoginImage}
        alt="login"
        className="mt-6 md:mt-0 md:ml-6 w-full max-w-xs"
      />
      <div className="flex flex-col items-center md:items-start p-6">
        <h1 className="text-xl font-bold mb-4">MyStore Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col w-full max-w-sm">
          <label htmlFor="email" className="mb-1">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-2 rounded mb-4"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading} // Disable input while loading
          />
          <label htmlFor="password" className="mb-1">
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="w-full p-2 rounded mb-4"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} // Disable input while loading
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Login"} {/* Show loading text */}
          </button>
        </form>
        {showSpinner && (
          <div className="flex justify-center mt-4">
            <SyncLoader
              color={"#0096FF"}
              loading={showSpinner}
              size={10} // Size of the loader
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue -500 underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
