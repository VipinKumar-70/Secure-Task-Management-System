import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("http://localhost:3000/api/dashboard", {
          credentials: "include",
        });

        if (!userRes.ok) {
          navigate("/login");
          return;
        }

        const userData = await userRes.json();
        setUser(userData.user);

        const taskRes = await fetch("http://localhost:3000/api/task", {
          credentials: "include",
        });

        const taskData = await taskRes.json();
        setTasks(taskData);
      } catch (error) {
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  const addTask = async () => {
    if (!taskText.trim()) return;

    const res = await fetch("http://localhost:3000/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text: taskText }),
    });

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setTasks(tasks.filter((task) => task._id !== id));
  };

  const editTask = async (id) => {
    const newText = prompt("Edit your task:");
    if (!newText) return;

    const res = await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text: newText }),
    });

    const updatedTask = await res.json();

    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  if (!user) {
    return <p className="text-white p-8">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Welcome back, {user.username}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600/90 hover:bg-red-700 transition-all duration-200 px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-red-900/30 hover:scale-105 active:scale-95"
        >
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-1 gap-8">
        {/* User Profile Card */}
        <div className="backdrop-blur-lg bg-zinc-800/60 border border-zinc-700/50 p-8 rounded-3xl shadow-2xl hover:shadow-blue-900/10 transition">
          <h2 className="text-2xl font-semibold mb-6 border-b border-zinc-700 pb-3">
            User Profile
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Username</span>
              <span className="font-medium">{user.username}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">Date of Birth</span>
              <span className="font-medium">
                {new Date(user.dob).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tasks Card */}
        <div className="backdrop-blur-lg bg-zinc-800/60 border border-zinc-700/50 p-8 rounded-3xl shadow-2xl transition">
          <h2 className="text-2xl font-semibold mb-6 border-b border-zinc-700 pb-3">
            Your Tasks
          </h2>

          {/* Add Task */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-zinc-500"
            />

            <button
              onClick={addTask}
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all duration-200 px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-900/30 hover:scale-105 active:scale-95"
            >
              Add
            </button>
          </div>

          {/* Task List */}
          <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {tasks.length === 0 ? (
              <p className="text-zinc-500 text-sm text-center py-6">
                No tasks yet. Start by adding one 🚀
              </p>
            ) : (
              tasks.map((task) => (
                <li
                  key={task._id}
                  className="group flex justify-between items-center bg-zinc-900/80 border border-zinc-700 rounded-xl px-4 py-3 hover:border-blue-500/40 hover:shadow-lg transition-all duration-200"
                >
                  <span className="text-sm text-zinc-200">{task.text}</span>

                  <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition">
                    <button
                      onClick={() => editTask(task._id)}
                      className="bg-yellow-500/90 hover:bg-yellow-500 text-black text-xs px-3 py-1.5 rounded-lg font-medium transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-600/90 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
