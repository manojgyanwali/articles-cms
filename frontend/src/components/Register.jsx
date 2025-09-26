
import React, { useState } from "react";
import { registerUser } from "../api/postApi";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) return; // prevent multiple clicks

  setError("");
  setSuccess("");
  setLoading(true); // start spinner

  try {
 const data = await registerUser(formData);   
 console.log(data);
 setSuccess("Registration successful! Please login.");
    
    // Clear the form
    setFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  } catch (err) {
    setError("Registration failed. " + (err.response?.data?.message || ""));
  } finally {
    setLoading(false); // stop spinner
  }
};



  return (
   <form
  onSubmit={handleSubmit}
  className="card p-4 shadow-lg"
  style={{ maxWidth: "400px", margin: "50px auto", borderRadius: "10px", border: "1px solid #ddd" }}
>
  <h3 className="text-center mb-4">Register</h3>

  <div className="mb-3">
    <input
      type="text"
      value={formData.name}
      name="name"
      placeholder="Name"
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>

  <div className="mb-3">
    <input
      type="email"
      value={formData.email}
      name="email"
      placeholder="Email"
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>

  <div className="mb-3">
    <input
      type="password"
      value={formData.password}
      name="password"
      placeholder="Password"
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>

  <div className="mb-3">
    <input
      type="password"
      value={formData.password_confirmation}
      name="password_confirmation"
      placeholder="Confirm Password"
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>

  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
    {loading ? (
      <>
        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
        Registering...
      </>
    ) : (
      "Register"
    )}
  </button>

  {error && <p className="text-danger mt-2">{error}</p>}
  {success && <p className="text-success mt-2">{success}</p>}
</form>

  );
};

export default Register;
