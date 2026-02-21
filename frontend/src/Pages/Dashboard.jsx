import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/dashboard", {
          credentials: "include",
        });

        if (!res.ok) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    verifyUser();
  }, [navigate]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <section className="min-h-screen bg-zinc-900 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Profile */}
      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg max-w-md">
        <h2 className="text-xl font-medium mb-4">User Profile</h2>

        <p>
          <span className="text-zinc-400">Name:</span> Dharmpal
        </p>
        <p>
          <span className="text-zinc-400">Email:</span> Dharmpal@mera.dost
        </p>
        <p>
          <span className="text-zinc-400">DOB:</span> 01/01/2000
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
