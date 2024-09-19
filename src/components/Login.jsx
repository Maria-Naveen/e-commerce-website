import React from "react";
import LoginImage from "../assets/login.svg";

const Login = () => {
  return (
    <div className="min-h-screen bg-blue-200 p-4 flex flex-col md:flex-row justify-center items-center">
      <img
        src={LoginImage}
        alt="login"
        className="mt-6 md:mt-0 md:ml-6 w-full max-w-xs"
      />
      <div className="flex flex-col items-center md:items-start p-6 ">
        <h1 className="text-xl font-bold mb-4">MyStore Login</h1>
        <form className="flex flex-col w-full max-w-sm">
          <label htmlFor="username" className="mb-1">
            Username:
          </label>
          <input
            type="text"
            name="username"
            className="w-full p-2 rounded mb-4"
            placeholder="Enter your username"
          />
          <label htmlFor="pass" className="mb-1">
            Password:
          </label>
          <input
            type="password"
            name="pass"
            className="w-full p-2 rounded mb-4"
            placeholder="Enter your password"
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
