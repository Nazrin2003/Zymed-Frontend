import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";
// No import for CSS file as per "dont use css folder"

const Corder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Define all inline styles here for a professional, clean look
  const styles = {
    pageContainer: {
      background: "#F8FAFC", // Very light, crisp background for the entire page
      minHeight: "100vh",
      fontFamily: "'Inter', sans-serif", // Modern sans-serif font
    },
    mainContentContainer: {
      maxWidth: "960px", // Optimal width for content readability
      margin: "0 auto", // Center the container horizontally
      padding: "60px 20px", // Generous top/bottom and side padding
      boxSizing: "border-box", // Include padding in element's total width and height
    },
    pageHeading: {
      color: "#1F2937", // Deep charcoal for main headings
      fontSize: "2.8rem", // Large and prominent heading
      fontWeight: 700,
      marginBottom: "40px", // More space below heading
      position: "relative",
      paddingBottom: "15px", // Space for the accent line
      textAlign: "center",
      // Simulating an ::after pseudo-element for an accent line under the heading
      borderBottom: "4px solid #3B82F6", // Primary blue accent line
      display: "inline-block", // Makes the border fit the text width
      marginLeft: "auto",
      marginRight: "auto",
      left: "0",
      right: "0",
      width: "fit-content", // Adjust width to content
    },
    filterContainer: {
      marginBottom: "30px", // Spacing below the filter section
      maxWidth: "960px", // Match main container width
      margin: "0 auto 30px", // Center the filter section
    },
    filterLabel: {
      color: "#374151", // Darker label text
      fontWeight: 600,
      marginBottom: "10px", // Space below label
      display: "block", // Ensure label is on its own line
      fontSize: "0.95rem",
    },
    filterSelect: {
      maxWidth: "300px", // Limit width of the select box
      width: "100%", // Responsive width up to max
      padding: "10px 15px",
      borderRadius: "8px", // Rounded corners
      border: "1px solid #D1D5DB", // Subtle border
      fontSize: "0.95rem",
      color: "#374151",
      backgroundColor: "#FDFEFE", // Very light background
      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)", // Subtle inner shadow
      appearance: "none", // Remove default select arrow (for custom arrow)
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`, // Custom arrow (dark)
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 1rem center",
      backgroundSize: "0.65em 0.65em",
      cursor: "pointer",
    },
    messageText: {
      color: "#6B7280", // Soft gray for loading/empty messages
      fontSize: "1.1rem",
      textAlign: "center",
      marginTop: "30px",
      maxWidth: "960px",
      margin: "0 auto",
    },
    orderCard: {
      marginBottom: "25px", // Spacing between order cards
      padding: "30px", // Generous padding inside the card
      backgroundColor: "#FFFFFF", // Pure white background for cards
      borderRadius: "12px", // Clean rounded corners
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)", // Soft, natural shadow
      border: "1px solid #E5E7EB", // Subtle border
      // Note: Hover effects like transform/boxShadow require external CSS or JS state
    },
    orderHeader: {
      display: "flex",
      justifyContent: "space-between", // Space items evenly
      alignItems: "center", // Vertically center items
      marginBottom: "20px",
      borderBottom: "1px solid #F3F4F6", // Light separator
      paddingBottom: "15px",
    },
    orderId: {
      color: "#1F2937", // Dark text for Order ID
      fontWeight: 600,
      fontSize: "1.1rem",
      display: "flex", // For icon alignment
      alignItems: "center",
      gap: "8px", // Space between icon and text
    },
    orderDate: {
      color: "#6B7280", // Subtle date color
      fontSize: "0.9rem",
    },
    deliveryDetails: {
      marginBottom: "20px",
      fontSize: "0.95rem",
      color: "#4B5563", // Medium gray for details
      lineHeight: "1.7", // Improved line spacing for readability
      padding: "15px",
      backgroundColor: "#F9FAFB", // Slightly different background to differentiate
      borderRadius: "8px",
      border: "1px solid #EFF2F6",
    },
    deliveryDetailsStrong: {
      color: "#1F2937", // Darker for labels
      fontWeight: 600,
    },
    itemsTable: {
      width: "100%",
      borderCollapse: "separate", // Required for border-radius on container
      borderSpacing: "0",
      marginBottom: "20px",
      borderRadius: "8px", // Rounded corners for the table
      overflow: "hidden", // Ensures inner border radius works
      border: "1px solid #E5E7EB", // Border for the table itself
    },
    tableHead: {
      background: "#aecee0ff", // Light blue for table header background
    },
    tableHeaderCell: {
      padding: "12px 15px",
      fontWeight: 700,
      textAlign: "left",
      color: "#2563EB", // Darker blue text for header
      fontSize: "0.9rem",
      borderBottom: "1px solid #6e8ca8ff", // Light blue border below header cells
    },
    tableBodyCell: {
      padding: "12px 15px",
      color: "#4B5563", // Medium gray for table body text
      fontSize: "0.9rem",
      borderBottom: "1px solid #F3F4F6", // Light separator for rows
    },
    tableBodyCellLastRow: {
      borderBottom: "none", // No border on the last row for a cleaner look
    },
    itemName: {
      color: "#1F2937", // Darker for item names
      fontWeight: 600,
    },
    orderFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px",
      paddingTop: "15px",
      borderTop: "1px solid #F3F4F6", // Light separator above footer
    },
    orderStatus: {
      fontSize: "0.95rem",
      color: "#6B7280", // Subtle gray for "Status:" text
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    orderStatusValue: {
      fontWeight: 600,
      color: "#fff", // White text on status badge
      padding: "6px 12px", // Slightly larger badge padding
      borderRadius: "9999px", // Pill shape for status
      textTransform: "capitalize", // Capitalize status text
    },
    orderTotal: {
      fontWeight: 700,
      color: "#1F2937", // Darker for "Total:" text
      fontSize: "1.2rem",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    orderTotalAmount: {
        color: "#3B82F6", // Highlight total amount in primary blue
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#F59E0B"; // Amber for pending
      case "confirmed":
        return "#10B981"; // Green for confirmed
      case "shipped":
        return "#3B82F6"; // Blue for shipped
      case "delivered":
        return "#059669"; // Darker Green for delivered
      default:
        return "#6B7280"; // Gray for unknown status
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:3030/orders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  const filteredOrders = orders.filter(order =>
    filterStatus === "all" ? true : order.status === filterStatus
  );

  return (
    <div style={styles.pageContainer}>
      <Nav />
      <div style={styles.mainContentContainer}>
        <h2 style={styles.pageHeading}>
          Your Orders
        </h2>

        {/* Filter Dropdown */}
        <div style={styles.filterContainer}>
          <label htmlFor="statusFilter" style={styles.filterLabel}>
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {loading ? (
          <p style={styles.messageText}>Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p style={styles.messageText}>No orders found for selected status.</p>
        ) : (
          filteredOrders.map((order, orderIndex) => (
            <div
              key={order._id}
              style={styles.orderCard}
              // Note: Direct inline styling for :hover states and media queries is not possible.
              // For full interactivity and responsiveness, external CSS would be recommended.
            >
              <div style={styles.orderHeader}>
                <div style={styles.orderId}>
                  🧾 Order ID: {order._id}
                </div>
                <div style={styles.orderDate}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div style={styles.deliveryDetails}>
                <strong style={styles.deliveryDetailsStrong}>Name:</strong> {order.username} <br />
                <strong style={styles.deliveryDetailsStrong}>Phone:</strong> {order.phone} <br />
                <strong style={styles.deliveryDetailsStrong}>Address:</strong> {order.address}
              </div>

              <table style={styles.itemsTable}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={styles.tableHeaderCell}>Medicine</th>
                    <th style={styles.tableHeaderCell}>Price</th>
                    <th style={styles.tableHeaderCell}>Quantity</th>
                    <th style={styles.tableHeaderCell}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#FDFEFF' : '#FFFFFF' }}> {/* Zebra striping */}
                      <td style={{ ...styles.tableBodyCell, ...(idx === order.items.length - 1 ? styles.tableBodyCellLastRow : {}), ...styles.itemName }}>
                        {item.medicineId?.name || "Unknown"}
                      </td>
                      <td style={{ ...styles.tableBodyCell, ...(idx === order.items.length - 1 ? styles.tableBodyCellLastRow : {}) }}>₹{item.price}</td>
                      <td style={{ ...styles.tableBodyCell, ...(idx === order.items.length - 1 ? styles.tableBodyCellLastRow : {}) }}>{item.quantity}</td>
                      <td style={{ ...styles.tableBodyCell, ...(idx === order.items.length - 1 ? styles.tableBodyCellLastRow : {}) }}>
                        ₹{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={styles.orderFooter}>
                <div style={styles.orderStatus}>
                  Status:{" "}
                  <span
                    style={{
                      ...styles.orderStatusValue,
                      backgroundColor: getStatusColor(order.status),
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                <div style={styles.orderTotal}>
                  Total: <span style={styles.orderTotalAmount}>₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Corder;
