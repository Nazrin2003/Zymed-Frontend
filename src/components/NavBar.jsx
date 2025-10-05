import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sidebarStyle = {
  width: "240px",
  background: "#1f2937",
  padding: "20px",
  minHeight: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  gap: "30px"
};

const sidebarItemBase = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "#fff",
  padding: "12px 18px",
  marginBottom: "10px",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "500",
  transition: "background 0.3s"
};

const activeStyle = {
  backgroundColor: "#374151",
  borderLeft: "4px solid #3b82f6"
};

const badgeStyle = {
  backgroundColor: "#ef4444",
  color: "#fff",
  borderRadius: "50%",
  padding: "4px 8px",
  fontSize: "12px",
  fontWeight: "bold",
  marginLeft: "10px"
};

const NavBar = ({ notificationCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={sidebarStyle}>
      {/* Top Section */}
      <div>
        <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "30px" }}>
          Zymed
        </h2>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "10px",
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          🔒 Logout
        </button>

        {/* Navigation Links */}
        <Link
          to="/phome"
          style={{
            ...sidebarItemBase,
            ...(isActive("/phome") ? activeStyle : {})
          }}
        >
          📊 Dashboard
        </Link>
        <Link
          to="/porder"
          style={{
            ...sidebarItemBase,
            ...(isActive("/porder") ? activeStyle : {})
          }}
        >
          📦 Manage Orders
        </Link>
        <Link
          to="/pprescription"
          style={{
            ...sidebarItemBase,
            ...(isActive("/pprescription") ? activeStyle : {})
          }}
        >
          💊 Prescription Requests
        </Link>
        <Link
          to="/notification"
          style={{
            ...sidebarItemBase,
            ...(isActive("/pnotification") ? activeStyle : {})
          }}
        >
          <span>🔔 Notifications</span>
          {notificationCount > 0 && (
            <span style={badgeStyle}>{notificationCount}</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
