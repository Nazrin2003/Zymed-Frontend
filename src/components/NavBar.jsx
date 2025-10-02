import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const navBarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1f2937",
    color: "#fff",
    padding: "12px 24px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
  };

  const brand = {
    fontSize: "24px",
    fontWeight: "700",
    color: "#a8e6cf",
    letterSpacing: "1px"
  };

  const navLinks = {
    display: "flex",
    gap: "20px",
    fontWeight: 500
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    transition: "0.2s ease",
  };

  const buttonStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#dc2626",
    transition: "0.2s ease"
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <div style={navBarStyle}>
      <div style={brand}>Zymed</div>
      <div style={navLinks}>
        <Link to="/phome" style={linkStyle}>Dashboard</Link>
        <Link to="/orders" style={linkStyle}>Orders</Link>
        <Link to="/pprescription" style={linkStyle}>Prescriptions</Link>
      </div>
      <button
        onClick={handleLogout}
        style={buttonStyle}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
