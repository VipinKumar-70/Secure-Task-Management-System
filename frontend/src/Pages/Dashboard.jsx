import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock logged-in user
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    username: "johnny123",
  });

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [newPost, setNewPost] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  // Save to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Create or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    if (editingId) {
      setPosts(
        posts.map((post) =>
          post.id === editingId ? { ...post, title: newPost } : post,
        ),
      );
      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now(),
        title: newPost,
      };
      setPosts([...posts, newItem]);
    }

    setNewPost("");
  };

  const handleEdit = (post) => {
    setNewPost(post.title);
    setEditingId(post.id);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

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
      <div className="bg-zinc-800 p-6 rounded-xl mb-8 shadow-lg">
        <h2 className="text-xl font-medium mb-2">Profile</h2>
        <p>
          <span className="text-zinc-400">Name:</span> {user.name}
        </p>
        <p>
          <span className="text-zinc-400">Email:</span> {user.email}
        </p>
        <p>
          <span className="text-zinc-400">Username:</span> {user.username}
        </p>
      </div>

      {/* Create / Edit */}
      <div className="bg-zinc-800 p-6 rounded-xl mb-8 shadow-lg">
        <h2 className="text-xl font-medium mb-4">
          {editingId ? "Edit Post" : "Create Post"}
        </h2>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            placeholder="Enter post title..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 rounded-lg"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Posts List */}
      <div className="grid gap-4">
        {filteredPosts.length === 0 && (
          <p className="text-zinc-400">No posts found.</p>
        )}

        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-zinc-800 p-4 rounded-lg flex justify-between items-center"
          >
            <span>{post.title}</span>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(post)}
                className="text-indigo-400 hover:text-indigo-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
