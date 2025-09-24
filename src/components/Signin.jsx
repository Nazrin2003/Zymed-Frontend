import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    const prevMargin = document.body.style.margin;
    document.body.style.backgroundColor = "#f0f4f8";
    document.body.style.margin = "0";
    return () => {
      document.body.style.backgroundColor = prevBg;
      document.body.style.margin = prevMargin;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3030/signin", formData);
    if (res.data.status === "Success") {
      alert("Welcome " + res.data.user.name);
      localStorage.setItem("token", res.data.token);

      // Redirect based on role
      if (res.data.user.role === "pharmacist") {
        window.location.href = "/phome"; // redirect to Phome.jsx
      } else {
        window.location.href = "/home"; // default redirect
      }
    } else {
      alert(res.data.status);
    }
  } catch (err) {
    console.error(err);
    alert("Signin failed");
  }
};


  // Styles
  const page = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box",
  };

  const card = {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
    fontFamily: "Inter, Arial, sans-serif",
    boxSizing: "border-box",
  };

  const heading = {
    margin: 0,
    marginBottom: "18px",
    fontSize: "22px",
    color: "#172B4D",
    textAlign: "center",
  };

  const input = {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #E6E9EE",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  const button = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    background: "#16a34a",
    color: "#fff",
    transition: "transform .08s ease, background .2s ease",
  };

  const bottomLine = {
    marginTop: "14px",
    textAlign: "center",
    color: "#6B7280",
    fontSize: "14px",
  };

  const linkStyle = {
    color: "#2563EB",
    textDecoration: "none",
    marginLeft: "6px",
    fontWeight: 600,
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={heading}>Zymed — Sign in</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={input}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            style={input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            style={button}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.995)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Sign In
          </button>
        </form>

        {/* 👇 Opposite of Signup page */}
        <div style={bottomLine}>
          Don’t have an account?
          <Link to="/signup" style={linkStyle}>Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
