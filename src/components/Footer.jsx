import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#212529",
      color: "#f8f9fa",
      paddingTop: "3rem",
      paddingBottom: "1.5rem",
      fontSize: "0.95rem",
      fontFamily: "'Inter', sans-serif", // Consistent modern font
      boxShadow: "0 -4px 15px rgba(0, 0, 0, 0.1)", // Subtle shadow above footer
      borderTop: "1px solid rgba(255, 255, 255, 0.05)", // Very light top border
    },
    // Note: :hover styles cannot be directly applied inline in React.
    // They would typically require a CSS file or a CSS-in-JS library.
    link: {
      color: "#A0AEC0", // Overriding initial #ccc for better contrast
      textDecoration: "none",
      transition: "color 0.3s ease, transform 0.2s ease", // Transition will apply on state change if managed by JS, but not direct hover
      display: "inline-block",
    },
    brandHeading: {
      color: "#68d3c3ff", // A vibrant green for the brand name
      fontSize: "2.2rem", // Slightly larger
      marginBottom: "1rem",
      letterSpacing: "0.5px",
      textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
      fontWeight: "bold", // Inherited from className, but good to be explicit
    },
    sectionHeading: {
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "#EDF2F7", // Lighter color for headings
      position: "relative",
      paddingBottom: "5px",
      fontSize: "1.25rem",
      // Note: ::after pseudo-elements for the underline effect cannot be applied inline.
      // This would typically be handled in a CSS file.
      // If you wanted a visible underline, you'd need a div or span element for it.
    },
    paragraph: {
      lineHeight: "1.6",
      color: "#A0AEC0", // Slightly darker light gray for general text
      marginBottom: "0.75rem",
    },
    listItem: {
      marginBottom: "0.8rem",
    },
    hr: {
      border: "none", // Remove default border
      borderTop: "1px solid rgba(160, 174, 192, 0.3)", // Lighter, subtle line
      marginTop: "2.5rem",
      marginBottom: "1.5rem",
    },
    copyrightText: {
      color: "#A0AEC0",
      fontSize: "0.88rem",
    }
  };

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div className="row">

          {/* Branding */}
          <div className="col-md-4 mb-4">
            {/* Applied brandHeading style directly */}
            <h4 style={styles.brandHeading}>Zymed</h4>
            <p style={styles.paragraph}>Your trusted pharmacy partner. Fast, safe, and reliable medicine delivery.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 style={styles.sectionHeading}>Quick Links</h5>
            <ul className="list-unstyled">
              <li style={styles.listItem}><Link to="/" style={styles.link}>Home</Link></li>
              <li style={styles.listItem}><Link to="/med" style={styles.link}>Medicines</Link></li>
              <li style={styles.listItem}><Link to="/cart" style={styles.link}>Cart</Link></li>
              <li style={styles.listItem}><Link to="/orders" style={styles.link}>My Orders</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 style={styles.sectionHeading}>Contact Us</h5>
            <p style={styles.paragraph}>Email: support@zymed.in</p>
            <p style={styles.paragraph}>Phone: +91 98765 43210</p>
            <p style={styles.paragraph}>Address: Aluva, Kerala, India</p>
          </div>
        </div>

        <hr style={styles.hr} />
        <div className="text-center">
          <small style={styles.copyrightText}>&copy; {new Date().getFullYear()} Zymed. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
