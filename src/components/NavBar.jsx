import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  // Sidebar styles
  const sidebar = {
    width: "240px",
    height: "100vh", // full height
    backgroundColor: "#1f2937", // dark gray
    color: "#fff",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "fixed", // stays on left
    top: 0,
    left: 0,
  };

  const brand = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "40px",
    textAlign: "center",
    color: "#fff",
    letterSpacing: "1px",
  };

  const navItem = {
    color: "#fff",
    textDecoration: "none",
    display: "block",
    padding: "10px 14px",
    borderRadius: "6px",
    marginBottom: "12px",
    transition: "0.2s ease",
    fontWeight: "500",
  };

  const buttonStyle = {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#dc2626", // red
    transition: "0.2s ease",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <div style={sidebar}>
      {/* Top Menu */}
      <div>
        <h2 style={brand}>Zymed</h2>

        <Link to="/phome" style={navItem}>
          Dashboard
        </Link>

        <Link to="/orders" style={navItem}>
          Orders
        </Link>

        <Link to="/pprescription" style={navItem}>
          Prescriptions
        </Link>
      </div>

      {/* Logout Button */}
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
