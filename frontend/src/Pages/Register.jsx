import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Register = () => {
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
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
      const response = await registerUser(formData);
      console.log(response);

      if (response.success) {
        setFormData({
          username: "",
          email: "",
          age: "",
          password: "",
        });
      }
      navigate("/login");
      alert("Account successfully created.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full min-h-screen bg-zinc-900 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-zinc-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm text-zinc-300">Full Name</label>
            <input
              type="text"
              name="username"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

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

          {/* age */}
          <div>
            <label className="text-sm text-zinc-300">Age</label>
            <input
              type="text"
              name="age"
              placeholder="12"
              value={formData.age}
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
            Register User
          </button>
        </form>
        <p className="text-sm text-center text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 cursor-pointer hover:text-indigo-300"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
