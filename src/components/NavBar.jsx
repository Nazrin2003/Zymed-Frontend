import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sidebarStyle = {
  width: "220px",
  background: "#1f2937",
  padding: "20px",
  minHeight: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const sidebarItemStyle = {
  display: "block",
  color: "#fff",
  padding: "10px 15px",
  marginBottom: "10px",
  textDecoration: "none",
  borderRadius: "6px",
  backgroundColor: "#4b5563"
};

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={sidebarStyle}>
      <div>
        <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "30px" }}>
          Zymed
        </h2>
        <Link
          to="/phome"
          style={{
            ...sidebarItemStyle,
            backgroundColor: isActive("/phome") ? "#374151" : "#4b5563"
          }}
        >
          📊 Dashboard
        </Link>
        <Link
          to="/porder"
          style={{
            ...sidebarItemStyle,
            backgroundColor: isActive("/porder") ? "#374151" : "#4b5563"
          }}
        >
          📦 Manage Orders
        </Link>
        <Link
          to="/pprescription"
          style={{
            ...sidebarItemStyle,
            backgroundColor: isActive("/pprescription") ? "#374151" : "#4b5563"
          }}
        >
          💊 Prescription Requests
        </Link>
        <Link
          to="/pnotification"
          style={{
            ...sidebarItemStyle,
            backgroundColor: isActive("/pnotification") ? "#374151" : "#4b5563"
          }}
        >
          🔔 Notifications
        </Link>
      </div>
      <button
        onClick={handleLogout}
        style={{
          margin: "20px",
          padding: "10px",
          background: "#dc2626",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
