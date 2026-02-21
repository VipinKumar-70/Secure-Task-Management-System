import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
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

    setError("");
    setSuccess("");

    try {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

      if (!passwordRegex.test(formData.password)) {
        setError(
          "Password must be at least 6 characters and include uppercase, lowercase, number, and special character.",
        );
        return;
      }

      const response = await registerUser(formData);
      console.log(response);

      if (response.success) {
        setSuccess(response.message);
        setFormData({
          username: "",
          email: "",
          dob: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <section className="w-full min-h-screen bg-zinc-900 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-zinc-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500 text-white p-3 rounded-lg text-sm mb-4">
            {success}
          </div>
        )}

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
              required
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
              required
            />
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm text-zinc-300">DOB</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              required
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
                required
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
