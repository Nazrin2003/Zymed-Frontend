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
        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.data.user.role === "pharmacist") {
          window.location.href = "/phome";
        } else {
          window.location.href = "/home";
        }
      } else {
        alert(res.data.status);
      }
    } catch (err) {
      console.error(err);
      alert("Signin failed");
    }
  };

  // Background image from the web
  const bgImageUrl = "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D";

  // Styles
  const page = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px",
    boxSizing: "border-box",
    background: `linear-gradient(135deg, rgb(30 35 202 / 70%) 0%, rgb(92 210 246 / 53%) 100%), url(${bgImageUrl}) center/cover no-repeat`,
  };

  const container = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "480px"
  };

  const logo = {
    marginBottom: "30px",
    textAlign: "center"
  };

  const logoText = {
    fontSize: "3.5rem",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
    textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    letterSpacing: "-1px",
    fontFamily: "'Inter', sans-serif"
  };

  const logoSubtext = {
    fontSize: "1rem",
    color: "rgba(255, 255, 255, 0.95)",
    margin: "8px 0 0 0",
    fontWeight: "500",
    letterSpacing: "0.5px"
  };

  const card = {
    width: "100%",
    background: "rgba(255, 255, 255, 0.98)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    fontFamily: "Inter, Arial, sans-serif",
    boxSizing: "border-box",
    backdropFilter: "blur(10px)"
  };

  const heading = {
    margin: 0,
    marginBottom: "28px",
    fontSize: "1.75rem",
    color: "#1e293b",
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: "-0.5px"
  };

  const input = {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "16px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#ffffff"
  };

  const button = {
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#fff",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
    letterSpacing: "0.3px"
  };

  const bottomLine = {
    marginTop: "20px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "500"
  };

  const linkStyle = {
    color: "#6366f1",
    textDecoration: "none",
    marginLeft: "6px",
    fontWeight: 700,
    transition: "color 0.2s ease"
  };

  return (
    <div style={page}>
      <div style={container}>
        {/* Logo outside the card */}
        <div style={logo}>
          <h1 style={logoText}>Zymed</h1>
          <p style={logoSubtext}>Your Health, Our Priority</p>
        </div>

        {/* Card with form */}
        <div style={card}>
          <h2 style={heading}>Welcome Back</h2>

          <form onSubmit={handleSubmit}>
            <input
              style={input}
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              onFocus={(e) => e.target.style.borderColor = "#6366f1"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              required
            />
            <input
              style={input}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onFocus={(e) => e.target.style.borderColor = "#6366f1"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              required
            />
            <button
              type="submit"
              style={button}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(99, 102, 241, 0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(99, 102, 241, 0.4)";
              }}
              onMouseDown={e => e.currentTarget.style.transform = "translateY(0) scale(0.98)"}
              onMouseUp={e => e.currentTarget.style.transform = "translateY(-2px) scale(1)"}
            >
              Sign In
            </button>
          </form>

          <div style={bottomLine}>
            Don't have an account?
            <Link 
              to="/signup" 
              style={linkStyle}
              onMouseOver={(e) => e.target.style.color = "#8b5cf6"}
              onMouseOut={(e) => e.target.style.color = "#6366f1"}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
