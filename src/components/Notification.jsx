import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import NavBar from "./NavBar";

const Notification = () => {
  const [medicines, setMedicines] = useState([]);
  const [expired, setExpired] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(true);

  // Define a comprehensive theme styles object
  const themeStyles = {
    // General page and text colors
    pageBackground: "#F8FAFC", // Very light blue-gray background
    mainTextColor: "#1F2937", // Deep charcoal for main text
    secondaryTextColor: "#4B5563", // Medium gray for secondary text
    subtleTextColor: "#6B7280", // Light gray for subtle text/labels
    borderColor: "#E5E7EB", // Light border color

    // Accent colors (adjusted for a lighter theme)
    blueAccent: "#3B82F6", // Primary blue (e.g., for total, active states)
    pendingAccent: "#F59E0B", // Amber for pending/warnings
    verifiedAccent: "#10B981", // Green for success/verified
    rejectedAccent: "#EF4444", // Red for expired/rejected/errors

    // Box shadows for cards/elements
    boxShadowSubtle: "0 2px 8px rgba(0,0,0,0.05)",
    boxShadowBase: "0 4px 16px rgba(0,0,0,0.08)",
    boxShadowHover: "0 8px 24px rgba(0,0,0,0.12)",
    boxShadowAccent: (color) => `0 4px 12px ${color}33`, // Soft shadow with accent color
  };

  useEffect(() => {
    const fetchAndNotify = async () => {
      try {
        const res = await axios.get("http://localhost:3030/medicines");
        const today = new Date();

        const expiredMeds = res.data.filter((med) => new Date(med.expiryDate) < today);
        const outOfStockMeds = res.data.filter((med) => med.quantity === 0);

        setMedicines(res.data);
        setExpired(expiredMeds);
        setOutOfStock(outOfStockMeds);

        // This conditional check might be handled by cron jobs in a real app,
        // but keeping it as is for the context of this component's original logic.
        if (expiredMeds.length > 0 || outOfStockMeds.length > 0) {
          // You might want to ensure this email sending is truly a daily job via cron
          // rather than on every component load, or add a flag to prevent multiple sends.
          await axios.post("http://localhost:3030/notifications/email", {
            expired: expiredMeds,
            outOfStock: outOfStockMeds
          });
          setEmailSent(true);
        }
      } catch (err) {
        console.error("Failed to fetch or notify:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndNotify();
  }, []);

  // Loading state styles
  const loadingStyles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      background: themeStyles.pageBackground, // Use new page background
      fontFamily: themeStyles.fontFamily,
    },
    contentArea: { // This ensures content respects NavBar if it's a fixed sidebar
      marginLeft: "240px",
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      textAlign: "center",
      color: themeStyles.mainTextColor, // Darker text for loading
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: `4px solid ${themeStyles.borderColor}`, // Light border for spinner track
      borderTop: `4px solid ${themeStyles.blueAccent}`, // Primary blue for spinning part
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "0 auto 20px",
    },
    message: {
      fontSize: "18px",
    },
  };

  if (loading) {
    return (
      <div style={loadingStyles.container}>
        <NavBar />
        <div style={loadingStyles.contentArea}>
          <div style={loadingStyles.content}>
            <div style={loadingStyles.spinner}></div>
            <p style={loadingStyles.message}>Loading notifications...</p>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: themeStyles.pageBackground, // Main background
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <NavBar />
      <div style={{ marginLeft: "240px", padding: "40px", flex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "700",
            color: themeStyles.mainTextColor, // Dark text
            marginBottom: "8px",
            textShadow: "0 1px 2px rgba(0,0,0,0.05)" // Subtle text shadow
          }}>
            🔔 Notifications Center
          </h2>
          <p style={{ color: themeStyles.subtleTextColor, fontSize: "16px" }}>
            Monitor your inventory alerts and expiry warnings
          </p>
        </div>

        {/* Email Sent Banner */}
        {emailSent && (
          <div style={{
            background: themeStyles.verifiedAccent, // Solid green
            padding: "16px 24px",
            borderRadius: "12px",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: themeStyles.boxShadowAccent(themeStyles.verifiedAccent),
            color: "#fff" // White text on green
          }}>
            <span style={{ fontSize: "24px" }}>✅</span>
            <div>
              <strong style={{ display: "block", fontSize: "16px" }}>Email Notification Sent</strong>
              <span style={{ fontSize: "14px", opacity: 0.9 }}>
                Alert emails have been dispatched for expired and out-of-stock items
              </span>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
          marginBottom: "40px"
        }}>
          {/* Total Medicines Card */}
          <div style={{
            background: "#fff", // White background
            padding: "24px",
            borderRadius: "16px",
            boxShadow: themeStyles.boxShadowBase,
            borderLeft: `5px solid ${themeStyles.blueAccent}`, // Blue accent border
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = themeStyles.boxShadowHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = themeStyles.boxShadowBase;
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                background: themeStyles.blueAccent, // Solid blue icon background
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "#fff", // White icon
              }}>💊</div>
              <div>
                <h5 style={{ margin: 0, fontSize: "14px", color: themeStyles.subtleTextColor, fontWeight: "500" }}>
                  Total Medicines
                </h5>
                <p style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: themeStyles.mainTextColor }}>
                  {medicines.length}
                </p>
              </div>
            </div>
          </div>

          {/* Expired Medicines Card */}
          <div style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: themeStyles.boxShadowBase,
            borderLeft: `5px solid ${themeStyles.rejectedAccent}`, // Red accent border
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = themeStyles.boxShadowHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = themeStyles.boxShadowBase;
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                background: themeStyles.rejectedAccent, // Solid red icon background
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "#fff", // White icon
              }}>⚠️</div>
              <div>
                <h5 style={{ margin: 0, fontSize: "14px", color: themeStyles.subtleTextColor, fontWeight: "500" }}>
                  Expired Medicines
                </h5>
                <p style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: themeStyles.mainTextColor }}>
                  {expired.length}
                </p>
              </div>
            </div>
          </div>

          {/* Out of Stock Medicines Card */}
          <div style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: themeStyles.boxShadowBase,
            borderLeft: `5px solid ${themeStyles.pendingAccent}`, // Amber accent border
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = themeStyles.boxShadowHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = themeStyles.boxShadowBase;
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                background: themeStyles.pendingAccent, // Solid amber icon background
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "#fff", // White icon
              }}>📦</div>
              <div>
                <h5 style={{ margin: 0, fontSize: "14px", color: themeStyles.subtleTextColor, fontWeight: "500" }}>
                  Out of Stock
                </h5>
                <p style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: themeStyles.mainTextColor }}>
                  {outOfStock.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }}>
          {/* Expired Medicines List */}
          <div style={{
            background: "#fff",
            padding: "28px",
            borderRadius: "16px",
            boxShadow: themeStyles.boxShadowBase
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                background: themeStyles.rejectedAccent, // Solid red icon background
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#fff", // White icon
              }}>💀</div>
              <h4 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: themeStyles.mainTextColor }}>
                Expired Medicines
              </h4>
            </div>

            {expired.length === 0 ? (
              <div style={{
                padding: "24px",
                background: "#EBF8FF", // Light blue for positive message
                borderRadius: "12px",
                textAlign: "center",
                border: `2px dashed ${themeStyles.blueAccent}`, // Dashed blue border
              }}>
                <span style={{ fontSize: "32px", display: "block", marginBottom: "8px", color: themeStyles.blueAccent }}>🎉</span>
                <p style={{ margin: 0, color: themeStyles.blueAccent, fontWeight: "600" }}>
                  All medicines are within expiry date!
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {expired.map((med) => (
                  <div key={med._id} style={{
                    padding: "16px",
                    background: "#FEE2E2", // Very light red for expired item background
                    borderRadius: "10px",
                    borderLeft: `4px solid ${themeStyles.rejectedAccent}`, // Solid red accent border
                    transition: "transform 0.2s",
                    cursor: "pointer",
                    boxShadow: themeStyles.boxShadowSubtle,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(4px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}>
                    <strong style={{ color: "#991B1B", fontSize: "16px", display: "block", marginBottom: "4px" }}>
                      {med.name}
                    </strong>
                    <span style={{ color: "#7F1D1D", fontSize: "14px" }}>
                      Expired on {format(new Date(med.expiryDate), "dd MMM yyyy")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Out of Stock Medicines List */}
          <div style={{
            background: "#fff",
            padding: "28px",
            borderRadius: "16px",
            boxShadow: themeStyles.boxShadowBase
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                background: themeStyles.pendingAccent, // Solid amber icon background
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#fff", // White icon
              }}>📦</div>
              <h4 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: themeStyles.mainTextColor }}>
                Out of Stock
              </h4>
            </div>

            {outOfStock.length === 0 ? (
              <div style={{
                padding: "24px",
                background: "#F0FDF4", // Light green for positive message
                borderRadius: "12px",
                textAlign: "center",
                border: `2px dashed ${themeStyles.verifiedAccent}`, // Dashed green border
              }}>
                <span style={{ fontSize: "32px", display: "block", marginBottom: "8px", color: themeStyles.verifiedAccent }}>🎉</span>
                <p style={{ margin: 0, color: "#166534", fontWeight: "600" }}>
                  All medicines are in stock!
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {outOfStock.map((med) => (
                  <div key={med._id} style={{
                    padding: "16px",
                    background: "#FFFBEB", // Very light yellow for out-of-stock item background
                    borderRadius: "10px",
                    borderLeft: `4px solid ${themeStyles.pendingAccent}`, // Solid amber accent border
                    transition: "transform 0.2s",
                    cursor: "pointer",
                    boxShadow: themeStyles.boxShadowSubtle,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(4px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}>
                    <strong style={{ color: "#92400E", fontSize: "16px", display: "block", marginBottom: "4px" }}>
                      {med.name}
                    </strong>
                    <span style={{ color: "#78350F", fontSize: "14px" }}>
                      Quantity: 0 — Restock needed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
