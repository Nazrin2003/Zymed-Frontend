import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sidebarStyle = {
  width: "260px",
  background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
  padding: "0",
  minHeight: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  boxShadow: "4px 0 24px rgba(0, 0, 0, 0.12)",
  zIndex: 1000
};

const headerStyle = {
  padding: "32px 24px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  background: "rgba(255, 255, 255, 0.05)"
};

const logoStyle = {
  color: "#fff",
  fontSize: "28px",
  fontWeight: "700",
  textAlign: "center",
  margin: 0,
  letterSpacing: "1px",
  background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text"
};

const navSection = {
  flex: 1,
  padding: "24px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const sidebarItemBase = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "#cbd5e1",
  padding: "14px 20px",
  textDecoration: "none",
  borderRadius: "12px",
  fontWeight: "500",
  fontSize: "15px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden"
};

const activeStyle = {
  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  color: "#fff",
  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
  transform: "translateX(4px)"
};

const hoverStyle = {
  background: "rgba(255, 255, 255, 0.08)",
  color: "#fff",
  transform: "translateX(4px)"
};

const badgeStyle = {
  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  color: "#fff",
  borderRadius: "20px",
  padding: "4px 10px",
  fontSize: "11px",
  fontWeight: "700",
  minWidth: "24px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
  animation: "pulse 2s infinite"
};

const logoutButtonStyle = {
  margin: "16px",
  padding: "14px",
  background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px"
};

const iconStyle = {
  fontSize: "20px",
  marginRight: "12px"
};

const NavBar = ({ notificationCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = React.useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/phome", icon: "📊", label: "Dashboard" },
    { path: "/porder", icon: "📦", label: "Manage Orders" },
    { path: "/pprescription", icon: "💊", label: "Prescription Requests" },
    { path: "/notification", icon: "🔔", label: "Notifications", badge: notificationCount }
  ];

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .nav-link:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          transform: translateX(4px);
        }
        
        .logout-btn:hover {
          background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
        }
        
        .logout-btn:active {
          transform: translateY(0);
        }
      `}</style>
      
      <div style={sidebarStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={logoStyle}>Zymed</h2>
          <p style={{
            color: "#94a3b8",
            fontSize: "12px",
            textAlign: "center",
            margin: "8px 0 0 0",
            fontWeight: "500"
          }}>
            Pharmacy Management
          </p>
        </div>

        {/* Navigation Links */}
        <div style={navSection}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="nav-link"
              style={{
                ...sidebarItemBase,
                ...(isActive(item.path) ? activeStyle : {}),
                ...(hoveredItem === item.path && !isActive(item.path) ? hoverStyle : {})
              }}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={iconStyle}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span style={badgeStyle}>{item.badge}</span>
              )}
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="logout-btn"
          style={logoutButtonStyle}
        >
          <span style={{ fontSize: "18px" }}>🔒</span>
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default NavBar;