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

  // styles
  const page = {
    minHeight: "100vh",                // full viewport height
    display: "flex",
    alignItems: "center",              // vertical center
    justifyContent: "center",          // horizontal center
    padding: "24px",
    boxSizing: "border-box"
  };

  const card = {
    width: "100%",
    maxWidth: "480px",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
    fontFamily: "Inter, Arial, sans-serif",
    boxSizing: "border-box"
  };

  const heading = {
    margin: 0,
    marginBottom: "20px",
    fontSize: "29px",
    color: "#172B4D",
    textAlign: "center"
  };

  const sub = {
    marginTop: 0,
    marginBottom: "20px",
    fontSize: "13px",
    color: "#6B7280",
    textAlign: "center"
  };

  const input = {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #E6E9EE",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box"
  };

  const button = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    background: "#2563EB",
    color: "#fff",
    transition: "transform .08s ease, background .2s ease"
  };

  const bottomLine = {
    marginTop: "14px",
    textAlign: "center",
    color: "#6B7280",
    fontSize: "14px"
  };

  const linkStyle = {
    color: "#2563EB",
    textDecoration: "none",
    marginLeft: "6px",
    fontWeight: 600
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={heading}><b>Zymed</b> — Create account</h1>
        {/* <p style={sub}>Sign up to browse medicines, manage orders and get refill reminders.</p> */}

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
          <Link to="/signin" style={linkStyle}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
