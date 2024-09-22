import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify"; // Import Bounce

import LoginImage from "../assets/login.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // The following checks whether the user is already logged in. If true, it redirects them to the home page.
  useEffect(() => {
    const alreadyLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (alreadyLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Login logic
    if (username === "Naveen" && password === "Naveen") {
      toast.success("Welcome!");
      sessionStorage.setItem("isLoggedIn", "true");

      // Set timeout to clear the session after 15 mins
      setTimeout(() => {
        sessionStorage.removeItem("isLoggedIn");
      }, 15 * 60 * 1000);

      setTimeout(() => {
        navigate("/");
      }, 1000); // Redirect to home page after successful login
    } else {
      toast.error("Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 p-4 flex flex-col md:flex-row justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} // Corrected transition property
      />
      <img
        src={LoginImage}
        alt="login"
        className="mt-6 md:mt-0 md:ml-6 w-full max-w-xs"
      />
      <div className="flex flex-col items-center md:items-start p-6">
        <h1 className="text-xl font-bold mb-4">MyStore Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col w-full max-w-sm">
          <label htmlFor="username" className="mb-1">
            Username:
          </label>
          <input
            type="text"
            name="username"
            className="w-full p-2 rounded mb-4"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="pass" className="mb-1">
            Password:
          </label>
          <input
            type="password"
            name="pass"
            className="w-full p-2 rounded mb-4"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
