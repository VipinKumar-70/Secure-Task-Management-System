import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  // ================= FETCH USER + TASKS =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user
        const userRes = await fetch("http://localhost:3000/api/dashboard", {
          credentials: "include",
        });

        if (!userRes.ok) {
          navigate("/login");
          return;
        }

        const userData = await userRes.json();
        setUser(userData.user);

        // Fetch tasks
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

  // ================= ADD TASK =================
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

  // ================= DELETE TASK =================
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/api/task/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setTasks(tasks.filter((task) => task._id !== id));
  };

  // ================= EDIT TASK =================
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

  // ================= LOGOUT =================
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  if (!user) {
    return <p className="text-white p-8">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-zinc-900 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* User Profile */}
      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg max-w-md">
        <h2 className="text-xl font-medium mb-4">User Profile</h2>

        <p>
          <span className="text-zinc-400">Name:</span> {user.username}
        </p>
        <p>
          <span className="text-zinc-400">Email:</span> {user.email}
        </p>
        <p>
          <span className="text-zinc-400">DOB:</span>{" "}
          {new Date(user.dob).toLocaleDateString()}
        </p>
      </div>

      {/* Task Section */}
      <div className="bg-zinc-800 p-6 rounded-2xl shadow-xl max-w-md my-10 border border-zinc-700">
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={addTask}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg font-medium"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-zinc-400 text-sm">No tasks yet</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center bg-zinc-900 px-4 py-3 rounded-lg border border-zinc-700"
              >
                <span className="text-sm">{task.text}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => editTask(task._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-sm px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default Dashboard;
