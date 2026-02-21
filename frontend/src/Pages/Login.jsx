import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      if (response.success) {
        alert("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full min-h-screen bg-zinc-900 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-zinc-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-zinc-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-zinc-300">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-3 rounded-lg font-medium transition bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-zinc-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/"
            className="text-indigo-400 cursor-pointer hover:text-indigo-300"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
