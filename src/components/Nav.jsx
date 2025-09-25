import React from 'react';
import '../styles/nav.css'; // Import custom styles
import { Link, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Clear login state or tokens here if needed
    alert("Logged out successfully");
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <h1 style={{ fontSize: "2.2rem", margin: 0 }}>Zymed</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto d-flex align-items-center">
            <Link to="/home" className={`nav-link ${isActive("/home") ? "active" : ""}`}>Home</Link>
            <Link to="/med" className={`nav-link ${isActive("/med") ? "active" : ""}`}>Medicines</Link>
            <Link to="/orders" className={`nav-link ${isActive("/orders") ? "active" : ""}`}>Orders</Link>
            <Link to="/subscriptions" className={`nav-link ${isActive("/subscriptions") ? "active" : ""}`}>Subscriptions</Link>
            <button className="btn btn-outline-light ms-3" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

