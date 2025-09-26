// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: "", body: "", image: null });
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/post`, {
        headers: {Authorization : `Bearer ${token}`}
      });
      setPosts(res.data.data || []); 
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add or update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) return;
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("body", formData.body);
      if (formData.image) data.append("image", formData.image);

      if (editingId) {
        // Update post
        data.append("_method", "PUT"); // important!
        await axios.post(`${API_URL}/post/${editingId}`, data, {
          headers: {
             "Content-Type": "multipart/form-data",
              Authorization:  `Bearer ${token}`
           },
        });
        setEditingId(null);
      } else {
        // Create post
        await axios.post(`${API_URL}/create`, data, {
          headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`, 
          },
        });
      }

      // Refresh posts
      fetchPosts();

      // Clear form
      setFormData({ title: "", body: "", image: null });
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      setError("Failed to save post.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setFormData({ title: post.title, body: post.body, image: null });
    setEditingId(post.id);
    setImagePreview(post.image ? `http://localhost:8000/storage/${post.image}` : null); // optional preview from URL
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this post?")) return;
    try {
      await axios.delete(`${API_URL}/post/${id}`,{
        headers:{Authorization:`Bearer ${token}`}
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid py-5" style={{display:"flex", backgroundcolor:"black", gap:"10px",   border: "5px solid black",}}>
      
        <div className="card shadow-lg">
          <div className="card-body">
            <h1 className="text-center mb-4">Dashboard</h1>

            {error && <p className="text-danger">{error}</p>}

          
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <textarea
                  name="body"
                  placeholder="Enter content"
                  value={formData.body}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>

              <div className="mb-3">
                <input type="file" name="image" onChange={handleChange} className="form-control" />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="mt-2"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                )}
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (editingId ? "Updating..." : "Saving...") : editingId ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>

      {/* Posts Table */}
      <div className="card shadow-lg">
        <div className="card-body">
          <h4>All Posts</h4>
          {posts.length === 0 ? (
            <p className="text-muted">No posts available.</p>
          ) : (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>
                        {post.body
            ? post.body.split(" ").slice(0, 5).join(" ") +
              (post.body.split(" ").length > 5 ? "..." : "")
            : ""}
            </td>
                    <td>
                      {post.image && (
                        <img
                          src={`http://localhost:8000/storage/${post.image}`}
                          alt="post"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
