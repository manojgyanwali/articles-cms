import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8081/api";

const NavBar = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const navigate = useNavigate();

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, formData);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token); 
        setError("");
        alert("Login successful! You can now comment on posts.");
      
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    alert("Logged out successfully!");
    navigate("/"); // optional redirect to home
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">MyBlog</Link>

        <div className="collapse navbar-collapse justify-content-end">
          {!token ? (
            <form className="d-flex" onSubmit={handleLogin}>
              <input
                type="text"
                name="email"
                className="form-control me-2"
                placeholder="Username"
               value={formData.email}

                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                className="form-control me-2"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button className="btn-outline-secondary" type="submit" disabled={loading}>
                {loading ? "Logging.." : "Login"}
              </button>
            </form>
          ) : (
            <button className="btn-outline-secondary" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
      {error && <p className="text-danger mt-1 text-center">{error}</p>}

      <div className="d-flex align-items-center"  style={{ fontSize: "0.9rem", marginRight: "30px" }}>
  <a
    href="http://localhost:5173/register"
    className="btn btn-outline-secondary"
    
  >
    New Register
  </a>
</div>


    </nav>
  );
};

export default NavBar;
