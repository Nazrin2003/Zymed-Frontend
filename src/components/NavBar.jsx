import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#1f2937",
    color: "#fff",
    fontFamily: "Inter, sans-serif"
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    marginLeft: "20px",
    fontWeight: "500"
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Zymed Pharmacy</div>
      <div>
        <Link to="/phome" style={linkStyle}>Dashboard</Link>
        <Link to="/home" style={linkStyle}>Customer View</Link>
        <Link to="/signin" style={linkStyle}>Logout</Link>
      </div>
    </nav>
  );
};

export default NavBar;
