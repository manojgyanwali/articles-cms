// src/pages/Auth.jsx
import React from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import "../customcss/Auth.css";

const Auth = () => {
  return (
    <div className="auth-wrapper">
     
      <div className="auth-form">
   
        <Register />
      </div>

    
      <div className="auth-form">
       
        <Login />
      </div>
    </div>
  );
};

export default Auth;
