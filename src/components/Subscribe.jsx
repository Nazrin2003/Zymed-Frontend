import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

const Subscribe = () => {
  const { state } = useLocation();
  const medicine = state?.medicine;
  const user = state?.user || JSON.parse(localStorage.getItem("user"));
  const [notifyDate, setNotifyDate] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSub, setEditingSub] = useState(null);
  const [editDate, setEditDate] = useState("");

  // Define style objects here
  const pageStyles = {
    mainContainer: {
      padding: "40px 20px",
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#F0F2F5", // Light, soft gray background
      minHeight: "100vh",
    },
    header: {
      backgroundImage: `linear-gradient(rgb(50 38 120 / 50%), rgb(48 91 57 / 50%)), url('https://images.unsplash.com/photo-1696861286643-341a8d7a79e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed", // Subtle parallax effect
      padding: "120px 0",
      textAlign: "center",
      color: "white",
    },
    headerH1: {
      fontWeight: 700,
      fontSize: "3rem", // Larger, more impactful
      marginBottom: "10px",
      textShadow: "2px 2px 6px rgba(0,0,0,0.7)", // Stronger shadow for readability
    },
    headerP: {
      fontSize: "1.15rem",
      opacity: 1, // Ensure full opacity
      textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
    },
    medicineCardContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "40px",
      maxWidth: "900px", // Constrain width
      margin: "0 auto 40px", // Center
    },
    medicineCard: {
      backgroundColor: "#ffffff",
      borderRadius: "16px", // More pronounced rounded corners
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)", // Deeper, softer shadow
      padding: "30px", // More internal padding
      display: "flex",
      gap: "20px",
      maxWidth: "700px",
      width: "100%",
      alignItems: "stretch", // Ensure items stretch to fill height
      // Note: Hover effects like transform and boxShadow on hover require CSS or JS state
    },
    medicineImageWrapper: {
      flex: 1,
    },
    medicineImage: {
      width: "100%",
      height: "280px", // Slightly taller image
      objectFit: "cover",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)", // Subtle shadow for the image
    },
    medicineDetailsWrapper: {
      flex: 1,
    },
    medicineName: {
      color: "#2D3748", // Darker, professional text
      marginBottom: "12px",
      fontSize: "1.8rem", // Larger medicine name
      textAlign: "left",
      fontWeight: 700,
    },
    medicineDetailText: {
      fontSize: "0.95rem",
      color: "#4A5568", // Subtle gray for details
      marginBottom: "8px",
    },
    medicineDetailStrong: {
      color: "#2D3748", // Make labels bolder
    },
    formLabel: {
      display: "block",
      marginBottom: "10px", // More space
      fontWeight: 600,
      color: "#2D3748",
      fontSize: "0.95rem",
    },
    formInputDate: {
      padding: "10px 15px", // More padding
      borderRadius: "8px", // More rounded corners
      border: "1px solid #CBD5E0", // Lighter, subtle border
      marginBottom: "20px", // More space
      width: "100%",
      fontSize: "0.9rem",
      color: "#2D3748",
      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)", // Subtle inner shadow
      backgroundColor: "#FDFDFD", // Slightly off-white background
      // Note: Focus styles require CSS or JS state
    },
    formSubmitButton: {
      padding: "12px 25px", // Larger button
      backgroundColor: "#007BFF", // Primary blue for action
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "1rem",
      boxShadow: "0 4px 15px rgba(0, 123, 255, 0.25)", // Soft shadow
      // Note: Hover effects require CSS or JS state
    },
    welcomeContainer: {
      textAlign: "center",
      marginBottom: "40px",
      maxWidth: "900px",
      margin: "0 auto 40px",
    },
    welcomeH2: {
      color: "#2D3748",
      fontSize: "2.2rem",
      fontWeight: 700,
      marginBottom: "15px",
    },
    welcomeP: {
      color: "#616e7f",
      fontSize: "1rem",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    editingCard: {
      backgroundColor: "#ffffff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)", // Consistent shadow
      maxWidth: "600px",
      margin: "0 auto 35px",
    },
    editingH4: {
      color: "#2D3748",
      fontSize: "1.6rem",
      fontWeight: 600,
      marginBottom: "15px",
    },
    editingP: {
      fontSize: "0.95rem",
      color: "#4A5568",
      marginBottom: "15px",
    },
    editingLabel: {
      display: "block",
      marginBottom: "8px",
      fontWeight: 600,
      color: "#2D3748",
      fontSize: "0.95rem",
    },
    editingInputDate: {
      padding: "10px 15px",
      borderRadius: "8px",
      border: "1px solid #CBD5E0",
      marginBottom: "20px",
      width: "100%",
      fontSize: "0.9rem",
      color: "#2D3748",
      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
      backgroundColor: "#FDFDFD",
      // Note: Focus styles require CSS or JS state
    },
    editingButtonContainer: {
      display: "flex",
      gap: "10px",
    },
    editingUpdateButton: {
      padding: "10px 20px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "0.95rem",
      boxShadow: "0 3px 10px rgba(0, 123, 255, 0.2)",
      // Note: Hover effects require CSS or JS state
    },
    editingCancelButton: {
      padding: "10px 20px",
      backgroundColor: "#E2E8F0", // Neutral background
      color: "#4A5568", // Dark text
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "0.95rem",
      // Note: Hover effects require CSS or JS state
    },
    howItWorksCard: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      padding: "30px",
      marginBottom: "40px",
      maxWidth: "900px",
      margin: "0 auto 40px",
    },
    howItWorksH3: {
      color: "#007BFF", // Consistent primary blue
      marginBottom: "15px",
      fontSize: "1.8rem",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    howItWorksUl: {
      color: "#4A5568",
      fontSize: "1rem",
      lineHeight: "1.8",
      paddingLeft: "25px",
      listStyleType: "disc", // Ensure bullet points
    },
    howItWorksLi: {
      marginBottom: "8px",
    },
    subscriptionsH3: {
      marginBottom: "25px",
      color: "#2D3748",
      fontSize: "2rem",
      fontWeight: 700,
      textAlign: "center",
      maxWidth: "900px",
      margin: "0 auto 25px",
    },
    noSubscriptionsText: {
      color: "#6b7280",
      textAlign: "center", // Center the no subscriptions message
      maxWidth: "900px",
      margin: "0 auto",
      fontSize: "1.1rem",
    },
    tableContainer: {
      maxWidth: "900px", // Consistent width
      margin: "0 auto",
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)", // Deeper shadow for table
      overflow: "hidden", // Ensures rounded corners
      // Note: Responsiveness for table (stacking rows) requires CSS or more complex JS
    },
    table: {
      width: "100%",
      borderCollapse: "separate", 
      borderSpacing: "0",
    },
    tableHeaderRow: {
      backgroundColor: "#1B1F3B ", 
      color: "#fff",
    },
    tableHeaderCell: {
      padding: "15px 20px",
      fontWeight: 700,
      textAlign: "left",
    },
    tableRow: {
      borderBottom: "1px solid #EDF2F7", 
      
    },
    tableCell: {
      padding: "15px 20px",
      color: "#4A5568",
      fontSize: "0.95rem",
    },
    tableCellLastRow: {
        borderBottom: "none", // No border on last row for cleaner look
    },
    statusBadge: {
      padding: "8px 12px", // Larger padding
      borderRadius: "9999px", // Full pill shape
      fontSize: "0.85rem",
      fontWeight: 700,
      color: "#fff",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    statusDueToday: {
      backgroundColor: "#E53E3E", // Brighter red
    },
    statusScheduled: {
      backgroundColor: "#38A169", // Brighter green
    },
    actionButton: {
      padding: "8px 15px",
      borderRadius: "8px",
      fontSize: "0.9rem",
      fontWeight: 600,
      cursor: "pointer",
      border: "none",
      marginRight: "10px", // Space between buttons
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // General shadow for buttons
      // Note: Hover effects require CSS or JS state
    },
    updateButton: {
      backgroundColor: "#4299E1", // Lighter blue for update
      color: "#fff",
      boxShadow: "0 2px 8px rgba(66, 153, 225, 0.2)",
    },
    removeButton: {
      backgroundColor: "#E53E3E", // Red for remove
      color: "#fff",
      boxShadow: "0 2px 8px rgba(229, 62, 62, 0.2)",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3030/subscribe", {
        userId: user.id,
        medicineId: medicine._id,
        notifyDate,
      });
      alert("Subscription saved!");
      setNotifyDate("");
      fetchSubscriptions();
    } catch (err) {
      console.error(err);
      alert("Failed to subscribe.");
    }
  };
  const handleEditClick = (sub) => {
    setEditingSub(sub);
    setEditDate(sub.notifyDate.split("T")[0]);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3030/subscribe/${editingSub._id}`, {
        notifyDate: editDate,
      });
      alert("Subscription updated!");
      setEditingSub(null);
      fetchSubscriptions();
    } catch (err) {
      console.error(err);
      alert("Failed to update.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/subscribe/${id}`);
      alert("Subscription removed.");
      fetchSubscriptions();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3030/subscriptions/${user.id}`
      );
      setSubscriptions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchSubscriptions();
  }, [user?.id]); // Added user.id to dependency array

  return (
    <div>
      <Nav />

      {/* Page Header */}
      <div style={pageStyles.header}>
        <h1 style={pageStyles.headerH1}>Medicine Subscriptions</h1>
        <p style={pageStyles.headerP}>
          Set refill reminders and stay on track with your medications
        </p>
      </div>

      <div style={pageStyles.mainContainer}>
        {/* Medicine Section */}
        {medicine ? (
          <div style={pageStyles.medicineCardContainer}>
            <div style={pageStyles.medicineCard}>
              {/* Left: Image */}
              <div style={pageStyles.medicineImageWrapper}>
                <img
                  src={`http://localhost:3030/${medicine.imageUrl}`}
                  alt={medicine.name}
                  style={pageStyles.medicineImage}
                />
              </div>

              {/* Right: Details + Form */}
              <div style={pageStyles.medicineDetailsWrapper}>
                <h2 style={pageStyles.medicineName}>{medicine.name}</h2>
                <p style={pageStyles.medicineDetailText}>
                  <strong style={pageStyles.medicineDetailStrong}>Price:</strong> ₹{medicine.price}
                </p>
                <p style={pageStyles.medicineDetailText}>
                  <strong style={pageStyles.medicineDetailStrong}>Manufacturer:</strong> {medicine.manufacturer}
                </p>
                <p style={{ ...pageStyles.medicineDetailText, marginBottom: "16px" }}>
                  <strong style={pageStyles.medicineDetailStrong}>Category:</strong> {medicine.category}
                </p>

                <form onSubmit={handleSubmit}>
                  <label style={pageStyles.formLabel}>
                    Select Refill Reminder Date:
                  </label>
                  <input
                    type="date"
                    value={notifyDate}
                    onChange={(e) => setNotifyDate(e.target.value)}
                    required
                    style={pageStyles.formInputDate}
                  />
                  <button type="submit" style={pageStyles.formSubmitButton}>
                    Confirm Subscription
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div style={pageStyles.welcomeContainer}>
            <h2 style={pageStyles.welcomeH2}>Welcome to Subscriptions</h2>
            <p style={pageStyles.welcomeP}>
              You haven't selected a medicine. Browse medicines to subscribe or
              view your previous subscriptions below.
            </p>
          </div>
        )}

        {/* Update Subscription Section */}
        {editingSub && (
          <div style={pageStyles.editingCard}>
            <h4 style={pageStyles.editingH4}>Update Subscription</h4>
            <p style={pageStyles.editingP}>
              <strong style={pageStyles.medicineDetailStrong}>Medicine:</strong> {editingSub.medicineId?.name}
            </p>
            <label style={pageStyles.editingLabel}>New Reminder Date:</label>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              style={pageStyles.editingInputDate}
            />
            <div style={pageStyles.editingButtonContainer}>
              <button onClick={handleUpdate} style={pageStyles.editingUpdateButton}>
                Update
              </button>
              <button
                onClick={() => setEditingSub(null)}
                style={pageStyles.editingCancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* How Subscription Works */}
        <div style={pageStyles.howItWorksCard}>
          <h3 style={pageStyles.howItWorksH3}>🧠 How Subscription Works</h3>
          <ul style={pageStyles.howItWorksUl}>
            <li style={pageStyles.howItWorksLi}>
              Select a medicine and choose a refill reminder date.
            </li>
            <li style={pageStyles.howItWorksLi}>
              We'll send you an email alert on that date so you never run out.
            </li>
            <li style={pageStyles.howItWorksLi}>
              You can view all your subscriptions below and manage them anytime.
            </li>
            <li style={pageStyles.howItWorksLi}>
              Want to subscribe again? Just revisit the medicine and set a new date.
            </li>
          </ul>
        </div>

        {/* Subscription Table */}
        <h3 style={pageStyles.subscriptionsH3}>📋 Your Previous Subscriptions</h3>
        {subscriptions.length === 0 ? (
          <p style={pageStyles.noSubscriptionsText}>No subscriptions found.</p>
        ) : (
          <div style={pageStyles.tableContainer}>
            <table style={pageStyles.table}>
              <thead>
                <tr style={pageStyles.tableHeaderRow}>
                  <th style={pageStyles.tableHeaderCell}>Medicine</th>
                  <th style={pageStyles.tableHeaderCell}>Notify Date</th>
                  <th style={pageStyles.tableHeaderCell}>Status</th>
                  <th style={pageStyles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub, index) => {
                  const today = new Date().toISOString().split("T")[0];
                  const subNotifyDate = new Date(sub.notifyDate).toISOString().split("T")[0];
                  const status = subNotifyDate === today ? "Due Today" : "Scheduled";

                  const rowStyle = {
                      ...pageStyles.tableRow,
                      backgroundColor: index % 2 === 0 ? "#F7FAFC" : "#fff", // Zebra striping
                      // Note: Hover effects for table rows still require CSS or JS state
                  };
                  const cellStyle = (isLastRow) => ({
                      ...pageStyles.tableCell,
                      ...(isLastRow ? pageStyles.tableCellLastRow : {}),
                  });


                  return (
                    <tr key={sub._id} style={rowStyle}>
                      <td style={cellStyle(index === subscriptions.length - 1)}>
                        {sub.medicineId?.name || "Unknown"}
                      </td>
                      <td style={cellStyle(index === subscriptions.length - 1)}>
                        {new Date(sub.notifyDate).toLocaleDateString()}
                      </td>
                      <td style={cellStyle(index === subscriptions.length - 1)}>
                        <span
                          style={{
                            ...pageStyles.statusBadge,
                            ...(status === "Due Today"
                              ? pageStyles.statusDueToday
                              : pageStyles.statusScheduled),
                          }}
                        >
                          {status}
                        </span>
                      </td>
                      <td style={cellStyle(index === subscriptions.length - 1)}>
                        <button
                          onClick={() => handleEditClick(sub)}
                          style={{ ...pageStyles.actionButton, ...pageStyles.updateButton }}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(sub._id)}
                          style={{ ...pageStyles.actionButton, ...pageStyles.removeButton }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Subscribe;
