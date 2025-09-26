// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: "", body: "", image: null });
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/user/post`, {
        headers: {Authorization : `Bearer ${token}`}
      });
      setPosts(res.data.data || []); 
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        
        await axios.post(`${API_URL}/create`, data, {
          headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`, 
          },
        });
      }

     
      fetchPosts();

     
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
    setImagePreview(post.image ? `http://localhost:8081/storage/${post.image}` : null); // optional preview from URL
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

  const handleLogout = () => {
  
  localStorage.removeItem("token");

  
  window.location.href = "/register"; 
};

  return (
   <div>
    <nav style={{display:"flex",justifyContent: 'space-between', alignItems: 'center', height:"5vw"}}>
      <div className="left">
        LOGO
      </div>

     <div className="center">
      <div className="letter-boxes d-flex gap-1">
      <div className="letter">C</div>
      <div className="letter">M</div>
      <div className="letter">S</div>
    </div>
     </div>

      <div className="right">
        <div className="dropdown">
              <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="accountDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                My Account
            </button>
              <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                <li>
                  <button className="dropdown-item" >
                    Settings
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
        </div>

      </div>

    </nav>
    <hr />

  
   <div
  className="container-fluid py-5"
  style={{
    display: "flex",
    gap: "20px", 
    padding: "20px",
  }}
>
      

  <div
    className="card shadow-lg"
    style={{
      flex: 1, 
    }}
  >
    <div className="card-body">
     

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
            rows="7"
          ></textarea>
        </div>

        <div className="mb-3">
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="form-control"
          />
        <span style={{marginLeft:"0px", color: "red", fontSize: "0.9rem" }}>
          Note:Only JPEG, JPG, PNG images are allowed which less than 200mb.
        </span>
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

  {/* Table - 50% width */}
  <div
    className="card shadow-lg"
    style={{
      flex: 1, // takes half the width
      maxHeight: "80vh",
      overflowY: "auto", // scroll if too many posts
    }}
  >
    <div className="card-body">
      <h4 className="text-white">All Posts</h4>
      
     
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
           
            {
               loading ?
                 <tr>
                    <td colSpan="5" className="text-center">
                      Loading...
                    </td>
                 </tr> :
                  posts.length === 0 ? ( 
                  <tr>
                      <td colSpan="5">
                        <p className="text-muted text-center">No posts available.</p>
                      </td>
                  </tr>
                 
                ): (
                  posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>
                      {post.title
                        ? post.title.split(" ").slice(0, 3).join(" ") +
                          (post.title.split(" ").length > 3 ? "..." : "")
                        : ""}
                    </td>
                    <td>
                      {post.body
                        ? post.body.split(" ").slice(0, 5).join(" ") +
                          (post.body.split(" ").length > 5 ? "..." : "")
                        : ""}
                    </td>
                    <td>
                      {post.image && (
                        <img
                          src={`http://localhost:8081/storage/${post.image}`}
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
                )) )
            
            } 
          </tbody>
        </table>
    
    </div>
  </div>
</div>
 </div>
  );
};

export default Dashboard;
