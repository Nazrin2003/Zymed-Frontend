import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#212529",
      color: "#f8f9fa",
      paddingTop: "3rem",
      paddingBottom: "1.5rem",
      fontSize: "0.95rem"
    },
    link: {
      color: "#ccc",
      textDecoration: "none"
    },
    linkHover: {
      color: "#fff",
      textDecoration: "underline"
    },
    heading: {
      fontWeight: "bold",
      marginBottom: "1rem"
    },
    hr: {
      borderColor: "#6c757d"
    }
  };

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div className="row">

          {/* Branding */}
          <div className="col-md-4 mb-4">
            <h4 className="text-success fw-bold">Zymed</h4>
            <p>Your trusted pharmacy partner. Fast, safe, and reliable medicine delivery.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 style={styles.heading}>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" style={styles.link}>Home</Link></li>
              <li><Link to="/med" style={styles.link}>Medicines</Link></li>
              <li><Link to="/cart" style={styles.link}>Cart</Link></li>
              <li><Link to="/orders" style={styles.link}>My Orders</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 style={styles.heading}>Contact Us</h5>
            <p>Email: support@zymed.in</p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: Aluva, Kerala, India</p>
          </div>
        </div>

        <hr style={styles.hr} />
        <div className="text-center">
          <small>&copy; {new Date().getFullYear()} Zymed. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
