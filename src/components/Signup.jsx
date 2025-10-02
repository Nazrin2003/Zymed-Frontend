import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
    address: ""
  });

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
      const res = await axios.post("http://localhost:3030/signup", formData);
      alert(res.data.status);
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  // Background image URL
  const bgImageUrl = "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1lZGljaW5lfGVufDB8fDB8fHww";

  // Styles
  const page = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box",
    background: `linear-gradient(rgb(97 85 224 / 61%), rgb(232 184 184)), url(${bgImageUrl}) center/cover no-repeat`,
  };

  const card = {
    width: "100%",
    maxWidth: "480px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(2,6,23,0.2)",
    fontFamily: "Inter, Arial, sans-serif",
    boxSizing: "border-box",
  };

  const heading = {
    margin: 0,
    marginBottom: "20px",
    fontSize: "29px",
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
    background: "#7725eb",
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
    color: "#7725eb",
    textDecoration: "none",
    marginLeft: "6px",
    fontWeight: 600,
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={heading}><b>Zymed</b> — Create account</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full name"
            style={input}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            style={input}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            style={input}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            style={input}
            onChange={handleChange}
            required
          />

          <input
            name="address"
            placeholder="Address"
            style={input}
            onChange={handleChange}
          />

          <button
            type="submit"
            style={button}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.995)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Create account
          </button>
        </form>

        <div style={bottomLine}>
          Already signed up?
          <Link to="/" style={linkStyle}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
