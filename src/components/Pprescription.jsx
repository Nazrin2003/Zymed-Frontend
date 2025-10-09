import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Nav from "./Nav"; // Assuming Nav is your main Navbar
import NavBar from "./NavBar"; // Assuming NavBar is your sidebar for pharmacist dashboard

const Pprescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get("http://localhost:3030/prescriptions");
      setPrescriptions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3030/prescriptions/${id}/status`, { status });
      fetchPrescriptions();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  const filteredPrescriptions =
    filter === "all"
      ? prescriptions
      : prescriptions.filter((p) => p.status === filter);

  // Define base styles for the new theme
  const themeStyles = {
    // Page backgrounds
    pageBackground: {
      display: "flex",
      minHeight: "100vh",
      background: "#F8FAFC", // Very light blue-gray background
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    sidebarArea: { // Assuming NavBar is 240px wide and fixed
      width: "240px",
      flexShrink: 0,
    },
    contentArea: {
      flex: 1,
      marginLeft: "240px", // Offset for sidebar
      padding: "40px",
      boxSizing: "border-box",
    },
    mainTextColor: "#1F2937", // Dark charcoal for main text
    secondaryTextColor: "#4B5563", // Medium gray for secondary text
    subtleTextColor: "#6B7280", // Light gray for subtle text
    borderColor: "#E5E7EB", // Light border color
    boxShadowBase: "0 4px 16px rgba(0,0,0,0.08)", // Soft shadow
    boxShadowHover: "0 8px 24px rgba(0,0,0,0.12)", // Stronger shadow on hover

    // Status/Accent Colors (updated to fit light theme better)
    blueAccent: "#3B82F6", // Primary blue for general active/links
    pendingAccent: "#F59E0B", // Amber for pending
    verifiedAccent: "#10B981", // Green for verified
    rejectedAccent: "#EF4444", // Red for rejected
  };

  // Loading state styles
  const loadingStyles = {
    container: {
      ...themeStyles.pageBackground,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      textAlign: "center",
      color: themeStyles.mainTextColor,
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
        <NavBar /> {/* Keep NavBar visible during loading if it's a fixed sidebar */}
        <div style={loadingStyles.contentArea}>
          <div style={loadingStyles.content}>
            <div style={loadingStyles.spinner}></div>
            <p style={loadingStyles.message}>Loading prescriptions...</p>
          </div>
        </div>
        {/* Keyframe animation for spinner */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Helper function for dashboard card dynamic styles
  const getCardStyles = (currentFilter, status) => ({
    background: currentFilter === status
      ? `linear-gradient(135deg, ${themeStyles.blueAccent} 0%, #2563EB 100%)` // Primary blue gradient for active
      : "#FFFFFF", // White background for inactive
    color: currentFilter === status ? "#fff" : themeStyles.mainTextColor,
    padding: "24px",
    borderRadius: "16px",
    boxShadow: currentFilter === status
      ? `0 8px 24px rgba(59, 130, 246, 0.3)` // Accent shadow for active
      : themeStyles.boxShadowBase, // Base shadow for inactive
    cursor: "pointer",
    transition: "all 0.3s ease",
    transform: currentFilter === status ? "translateY(-4px)" : "translateY(0)",
    border: currentFilter === status ? "none" : `2px solid transparent`, // No border for active
  });

  // Helper for card hover effects
  const getCardHoverStyles = (currentFilter, status, e) => {
    if (currentFilter !== status) {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = themeStyles.boxShadowHover; // Enhanced shadow on hover
      e.currentTarget.style.borderColor = themeStyles.blueAccent; // Blue border on hover
    }
  };

  const getCardLeaveStyles = (currentFilter, status, e) => {
    if (currentFilter !== status) {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = themeStyles.boxShadowBase;
      e.currentTarget.style.borderColor = "transparent";
    }
  };


  return (
    <div style={themeStyles.pageBackground}>
      <NavBar /> {/* Sidebar */}

      <div style={themeStyles.contentArea}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "700",
            color: themeStyles.mainTextColor,
            marginBottom: "8px",
            textShadow: "0 1px 2px rgba(0,0,0,0.05)" // Lighter text shadow
          }}>
            📋 Prescriptions Dashboard
          </h1>
          <p style={{ color: themeStyles.subtleTextColor, fontSize: "16px" }}>
            Manage and verify customer prescriptions
          </p>
        </div>

        {/* Dashboard Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}>
          {/* Total Prescriptions Card */}
          <div
            onClick={() => setFilter("all")}
            style={getCardStyles(filter, "all")}
            onMouseEnter={(e) => getCardHoverStyles(filter, "all", e)}
            onMouseLeave={(e) => getCardLeaveStyles(filter, "all", e)}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>📊</div>
            <div style={{ fontSize: "14px", fontWeight: "500", opacity: 0.9, marginBottom: "4px" }}>
              Total Prescriptions
            </div>
            <div style={{ fontSize: "32px", fontWeight: "700" }}>
              {prescriptions.length}
            </div>
          </div>

          {/* Pending Review Card */}
          <div
            onClick={() => setFilter("pending")}
            style={{
              ...getCardStyles(filter, "pending"),
              background: filter === "pending"
                ? `linear-gradient(135deg, ${themeStyles.pendingAccent} 0%, #D97706 100%)` // Amber gradient for pending
                : "#FFFFFF",
              boxShadow: filter === "pending"
                ? `0 8px 24px rgba(245, 158, 11, 0.3)`
                : themeStyles.boxShadowBase,
              border: filter === "pending" ? "none" : `2px solid transparent`,
            }}
            onMouseEnter={(e) => getCardHoverStyles(filter, "pending", e)}
            onMouseLeave={(e) => getCardLeaveStyles(filter, "pending", e)}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>⏳</div>
            <div style={{ fontSize: "14px", fontWeight: "500", opacity: 0.9, marginBottom: "4px" }}>
              Pending Review
            </div>
            <div style={{ fontSize: "32px", fontWeight: "700" }}>
              {prescriptions.filter((p) => p.status === "pending").length}
            </div>
          </div>

          {/* Verified Card */}
          <div
            onClick={() => setFilter("verified")}
            style={{
              ...getCardStyles(filter, "verified"),
              background: filter === "verified"
                ? `linear-gradient(135deg, ${themeStyles.verifiedAccent} 0%, #059669 100%)` // Green gradient for verified
                : "#FFFFFF",
              boxShadow: filter === "verified"
                ? `0 8px 24px rgba(16, 185, 129, 0.3)`
                : themeStyles.boxShadowBase,
              border: filter === "verified" ? "none" : `2px solid transparent`,
            }}
            onMouseEnter={(e) => getCardHoverStyles(filter, "verified", e)}
            onMouseLeave={(e) => getCardLeaveStyles(filter, "verified", e)}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>✅</div>
            <div style={{ fontSize: "14px", fontWeight: "500", opacity: 0.9, marginBottom: "4px" }}>
              Verified
            </div>
            <div style={{ fontSize: "32px", fontWeight: "700" }}>
              {prescriptions.filter((p) => p.status === "verified").length}
            </div>
          </div>

          {/* Rejected Card */}
          <div
            onClick={() => setFilter("rejected")}
            style={{
              ...getCardStyles(filter, "rejected"),
              background: filter === "rejected"
                ? `linear-gradient(135deg, ${themeStyles.rejectedAccent} 0%, #DC2626 100%)` // Red gradient for rejected
                : "#FFFFFF",
              boxShadow: filter === "rejected"
                ? `0 8px 24px rgba(239, 68, 68, 0.3)`
                : themeStyles.boxShadowBase,
              border: filter === "rejected" ? "none" : `2px solid transparent`,
            }}
            onMouseEnter={(e) => getCardHoverStyles(filter, "rejected", e)}
            onMouseLeave={(e) => getCardLeaveStyles(filter, "rejected", e)}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>❌</div>
            <div style={{ fontSize: "14px", fontWeight: "500", opacity: 0.9, marginBottom: "4px" }}>
              Rejected
            </div>
            <div style={{ fontSize: "32px", fontWeight: "700" }}>
              {prescriptions.filter((p) => p.status === "rejected").length}
            </div>
          </div>
        </div>

        {/* Prescription Table */}
        <div style={{
          background: "#FFFFFF", // White background for the table container
          borderRadius: "16px",
          boxShadow: themeStyles.boxShadowBase,
          overflow: "hidden",
          border: `1px solid ${themeStyles.borderColor}`, // Subtle border for the table container
        }}>
          {filteredPrescriptions.length === 0 ? (
            <div style={{
              padding: "60px 24px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "64px", marginBottom: "16px", opacity: 0.2, color: themeStyles.subtleTextColor }}>📋</div>
              <h3 style={{
                fontSize: "20px",
                fontWeight: "600",
                color: themeStyles.subtleTextColor,
                marginBottom: "8px"
              }}>
                No prescriptions found
              </h3>
              <p style={{ color: themeStyles.subtleTextColor, fontSize: "14px" }}>
                {filter === "all"
                  ? "There are no prescriptions in the system yet."
                  : `No ${filter} prescriptions at this time.`}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
              }}>
                <thead>
                  <tr style={{
                    background: "#F9FAFB", // Very light grey for table header
                    borderBottom: `2px solid ${themeStyles.borderColor}`
                  }}>
                    <th style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: themeStyles.secondaryTextColor,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Customer
                    </th>
                    <th style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: themeStyles.secondaryTextColor,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      File
                    </th>
                    <th style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: themeStyles.secondaryTextColor,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Notes
                    </th>
                    <th style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: themeStyles.secondaryTextColor,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Status
                    </th>
                    <th style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: themeStyles.secondaryTextColor,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Uploaded
                    </th>
                    <th style={{
                      padding: "16px 20px",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: themeStyles.secondaryTextColor,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrescriptions.map((presc, index) => (
                    <tr
                      key={presc._id}
                      style={{
                        borderBottom: `1px solid ${themeStyles.borderColor}`,
                        transition: "background-color 0.2s ease",
                        background: index % 2 === 0 ? "#FFFFFF" : "#F9FAFB" // Zebra striping
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#F0F8FF"} // Light blue hover
                      onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? "#FFFFFF" : "#F9FAFB"}
                    >
                      <td style={{
                        padding: "16px 20px",
                        color: themeStyles.mainTextColor,
                        fontWeight: "500"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${themeStyles.blueAccent} 0%, #2563EB 100%)`, // Blue avatar background
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "600"
                          }}>
                            {(presc.userId?.name || "U")[0].toUpperCase()}
                          </div>
                          {presc.userId?.name || "Unknown"}
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <a
                          href={`http://localhost:3030/${presc.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: themeStyles.blueAccent,
                            textDecoration: "none",
                            fontWeight: "500",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 12px",
                            background: "#EBF8FF", // Very light blue for file link background
                            borderRadius: "6px",
                            transition: "all 0.2s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#DBEAFE"; // Slightly darker blue on hover
                            e.currentTarget.style.transform = "translateX(2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#EBF8FF";
                            e.currentTarget.style.transform = "translateX(0)";
                          }}
                        >
                          📄 View File
                        </a>
                      </td>
                      <td style={{
                        padding: "16px 20px",
                        color: themeStyles.subtleTextColor,
                        fontSize: "14px",
                        maxWidth: "250px"
                      }}>
                        {presc.notes || <span style={{ opacity: 0.7 }}>No notes</span>}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          color: "#fff",
                          background:
                            presc.status === "verified"
                              ? `linear-gradient(135deg, ${themeStyles.verifiedAccent} 0%, #059669 100%)`
                              : presc.status === "rejected"
                              ? `linear-gradient(135deg, ${themeStyles.rejectedAccent} 0%, #DC2626 100%)`
                              : `linear-gradient(135deg, ${themeStyles.pendingAccent} 0%, #D97706 100%)`,
                          boxShadow:
                            presc.status === "verified"
                              ? "0 2px 8px rgba(16, 185, 129, 0.2)"
                              : presc.status === "rejected"
                              ? "0 2px 8px rgba(239, 68, 68, 0.2)"
                              : "0 2px 8px rgba(245, 158, 11, 0.2)"
                        }}>
                          {presc.status}
                        </span>
                      </td>
                      <td style={{
                        padding: "16px 20px",
                        color: themeStyles.subtleTextColor,
                        fontSize: "14px"
                      }}>
                        {new Date(presc.uploadedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                        <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "2px" }}>
                          {new Date(presc.uploadedAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "center" }}>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                          <button
                            onClick={() => navigate(`/verify-prescription/${presc._id}`)}
                            style={{
                              padding: "8px 16px",
                              background: `linear-gradient(135deg, ${themeStyles.verifiedAccent} 0%, #059669 100%)`,
                              color: "#fff",
                              border: "none",
                              borderRadius: "8px",
                              fontSize: "13px",
                              fontWeight: "600",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              boxShadow: `0 2px 8px rgba(16, 185, 129, 0.2)`
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-2px)";
                              e.currentTarget.style.boxShadow = `0 4px 12px rgba(16, 185, 129, 0.3)`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = `0 2px 8px rgba(16, 185, 129, 0.2)`;
                            }}
                          >
                            ✓ Verify
                          </button>
                          <button
                            onClick={() => updateStatus(presc._id, "rejected")}
                            style={{
                              padding: "8px 16px",
                              background: `linear-gradient(135deg, ${themeStyles.rejectedAccent} 0%, #DC2626 100%)`,
                              color: "#fff",
                              border: "none",
                              borderRadius: "8px",
                              fontSize: "13px",
                              fontWeight: "600",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              boxShadow: `0 2px 8px rgba(239, 68, 68, 0.2)`
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-2px)";
                              e.currentTarget.style.boxShadow = `0 4px 12px rgba(239, 68, 68, 0.3)`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = `0 2px 8px rgba(239, 68, 68, 0.2)`;
                            }}
                          >
                            ✕ Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pprescription;
