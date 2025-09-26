import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../customcss/Login.css';
const API_URL = "http://localhost:8081/api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; 
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, formData);

      if (response.data && response.data.user) {
       
        localStorage.setItem("token", response.data.token);

       
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again later."
      );
    } finally {
      setLoading(false); 
    }
  };

  return (
   <div
  className="d-flex justify-content-center align-items-center"
  style={{ height: "100vh" }}
>
  <div style={{ maxWidth: "400px", width: "100%" }}>
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
      <h2 className="mb-3 text-center">Login</h2>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner"></span> Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  </div>
</div>

  );
};

export default Login;