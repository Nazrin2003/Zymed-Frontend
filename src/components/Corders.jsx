import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

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

  const filteredOrders = orders
    .filter(order => filterStatus === "all" ? true : order.status === filterStatus)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first

  return (
    <>
      <style>{`
        .order-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .order-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }
        
        .filter-btn {
          transition: all 0.2s ease;
        }
        
        .filter-btn:hover {
          transform: translateY(-2px);
        }
        
        .status-badge {
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", minHeight: "100vh" }}>
        <Nav />
        
        {/* Hero Header */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(27, 31, 59, 0.9) 0%, rgba(168, 230, 207, 0.7) 100%), url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 20px",
          textAlign: "center",
          color: "white",
          marginBottom: "40px"
        }}>
          <h1 style={{ 
            fontSize: "2.8rem", 
            fontWeight: "700", 
            marginBottom: "12px",
            textShadow: "2px 4px 8px rgba(0,0,0,0.3)",
            letterSpacing: "-0.5px"
          }}>
            📦 My Orders
          </h1>
          <p style={{ fontSize: "1.15rem", opacity: 0.95, margin: 0 }}>
            Track and manage your medicine orders
          </p>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 60px" }}>
          {/* Stats and Filter Section */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "20px", 
            marginBottom: "40px" 
          }}>
            <div 
              className="filter-btn"
              onClick={() => setFilterStatus("all")}
              style={{
                background: filterStatus === "all" 
                  ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" 
                  : "#ffffff",
                color: filterStatus === "all" ? "#fff" : "#1e293b",
                padding: "24px",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: filterStatus === "all" 
                  ? "0 8px 20px rgba(59, 130, 246, 0.4)" 
                  : "0 4px 16px rgba(0, 0, 0, 0.08)",
                border: filterStatus === "all" ? "none" : "2px solid #e2e8f0"
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📊</div>
              <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                {orders.length}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9, fontWeight: "500" }}>
                Total Orders
              </div>
            </div>

            <div 
              className="filter-btn"
              onClick={() => setFilterStatus("pending")}
              style={{
                background: filterStatus === "pending" 
                  ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" 
                  : "#ffffff",
                color: filterStatus === "pending" ? "#fff" : "#1e293b",
                padding: "24px",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: filterStatus === "pending" 
                  ? "0 8px 20px rgba(245, 158, 11, 0.4)" 
                  : "0 4px 16px rgba(0, 0, 0, 0.08)",
                border: filterStatus === "pending" ? "none" : "2px solid #e2e8f0"
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>⏳</div>
              <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                {orders.filter(o => o.status === "pending").length}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9, fontWeight: "500" }}>
                Pending
              </div>
            </div>

            <div 
              className="filter-btn"
              onClick={() => setFilterStatus("confirmed")}
              style={{
                background: filterStatus === "confirmed" 
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                  : "#ffffff",
                color: filterStatus === "confirmed" ? "#fff" : "#1e293b",
                padding: "24px",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: filterStatus === "confirmed" 
                  ? "0 8px 20px rgba(16, 185, 129, 0.4)" 
                  : "0 4px 16px rgba(0, 0, 0, 0.08)",
                border: filterStatus === "confirmed" ? "none" : "2px solid #e2e8f0"
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>✓</div>
              <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                {orders.filter(o => o.status === "confirmed").length}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9, fontWeight: "500" }}>
                Confirmed
              </div>
            </div>

            <div 
              className="filter-btn"
              onClick={() => setFilterStatus("shipped")}
              style={{
                background: filterStatus === "shipped" 
                  ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" 
                  : "#ffffff",
                color: filterStatus === "shipped" ? "#fff" : "#1e293b",
                padding: "24px",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: filterStatus === "shipped" 
                  ? "0 8px 20px rgba(59, 130, 246, 0.4)" 
                  : "0 4px 16px rgba(0, 0, 0, 0.08)",
                border: filterStatus === "shipped" ? "none" : "2px solid #e2e8f0"
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🚚</div>
              <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                {orders.filter(o => o.status === "shipped").length}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9, fontWeight: "500" }}>
                Shipped
              </div>
            </div>

            <div 
              className="filter-btn"
              onClick={() => setFilterStatus("delivered")}
              style={{
                background: filterStatus === "delivered" 
                  ? "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" 
                  : "#ffffff",
                color: filterStatus === "delivered" ? "#fff" : "#1e293b",
                padding: "24px",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: filterStatus === "delivered" 
                  ? "0 8px 20px rgba(6, 182, 212, 0.4)" 
                  : "0 4px 16px rgba(0, 0, 0, 0.08)",
                border: filterStatus === "delivered" ? "none" : "2px solid #e2e8f0"
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📦</div>
              <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                {orders.filter(o => o.status === "delivered").length}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9, fontWeight: "500" }}>
                Delivered
              </div>
            </div>
          </div>

          {/* Orders List */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div className="loading-spinner" style={{ margin: "0 auto 20px" }}></div>
              <p style={{ fontSize: "1.1rem", color: "#64748b" }}>Loading your orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "80px 20px",
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
            }}>
              <div style={{ fontSize: "5rem", color: "#e5e7eb", marginBottom: "20px" }}>📦</div>
              <h3 style={{ color: "#1e293b", marginBottom: "12px", fontSize: "1.8rem" }}>No orders found</h3>
              <p style={{ color: "#64748b", marginBottom: "30px", fontSize: "1.05rem" }}>
                {filterStatus === "all" 
                  ? "You haven't placed any orders yet." 
                  : `No ${filterStatus} orders at this time.`}
              </p>
            </div>
          ) : (
          filteredOrders.map((order, orderIndex) => (
            <div
              key={order._id}
              className="order-card"
              style={{
                marginBottom: "24px",
                padding: "32px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0"
              }}
            >
              {/* Order Header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
                paddingBottom: "16px",
                borderBottom: "2px solid #f1f5f9"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    color: "#fff"
                  }}>
                    📦
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "4px" }}>
                      Order ID
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1e293b" }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "4px" }}>
                    Order Date
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1e293b" }}>
                    {new Date(order.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div style={{
                padding: "20px",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                marginBottom: "24px",
                border: "1px solid #e2e8f0"
              }}>
                <h4 style={{ 
                  fontSize: "1rem", 
                  fontWeight: "700", 
                  color: "#1e293b", 
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  🚚 Delivery Information
                </h4>
                <div style={{ display: "grid", gap: "8px", fontSize: "0.95rem" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ color: "#64748b", minWidth: "80px" }}>Name:</span>
                    <span style={{ color: "#1e293b", fontWeight: "600" }}>{order.username}</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ color: "#64748b", minWidth: "80px" }}>Phone:</span>
                    <span style={{ color: "#1e293b", fontWeight: "600" }}>{order.phone}</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ color: "#64748b", minWidth: "80px" }}>Address:</span>
                    <span style={{ color: "#1e293b", fontWeight: "600" }}>{order.address}</span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div style={{ 
                borderRadius: "12px", 
                overflow: "hidden", 
                border: "1px solid #e2e8f0",
                marginBottom: "24px"
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ background: "#A8E6CF" }}>
                    <tr>
                      <th style={{ 
                        padding: "16px 20px", 
                        textAlign: "left", 
                        color: "#1B1F3B", 
                        fontWeight: "700",
                        fontSize: "0.9rem"
                      }}>
                        Medicine
                      </th>
                      <th style={{ 
                        padding: "16px 20px", 
                        textAlign: "left", 
                        color: "#1B1F3B", 
                        fontWeight: "700",
                        fontSize: "0.9rem"
                      }}>
                        Price
                      </th>
                      <th style={{ 
                        padding: "16px 20px", 
                        textAlign: "center", 
                        color: "#1B1F3B", 
                        fontWeight: "700",
                        fontSize: "0.9rem"
                      }}>
                        Qty
                      </th>
                      <th style={{ 
                        padding: "16px 20px", 
                        textAlign: "right", 
                        color: "#1B1F3B", 
                        fontWeight: "700",
                        fontSize: "0.9rem"
                      }}>
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr 
                        key={idx} 
                        style={{ 
                          backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                          borderBottom: idx === order.items.length - 1 ? "none" : "1px solid #e2e8f0"
                        }}
                      >
                        <td style={{ 
                          padding: "16px 20px", 
                          color: "#1e293b", 
                          fontWeight: "600",
                          fontSize: "0.95rem"
                        }}>
                          💊 {item.medicineId?.name || "Unknown"}
                        </td>
                        <td style={{ 
                          padding: "16px 20px", 
                          color: "#64748b",
                          fontSize: "0.95rem"
                        }}>
                          ₹{item.price}
                        </td>
                        <td style={{ 
                          padding: "16px 20px", 
                          textAlign: "center",
                          color: "#64748b",
                          fontSize: "0.95rem"
                        }}>
                          <span style={{
                            background: "#e0f2fe",
                            color: "#0369a1",
                            padding: "4px 12px",
                            borderRadius: "6px",
                            fontWeight: "600"
                          }}>
                            {item.quantity}
                          </span>
                        </td>
                        <td style={{ 
                          padding: "16px 20px", 
                          textAlign: "right",
                          color: "#1e293b",
                          fontWeight: "700",
                          fontSize: "1rem"
                        }}>
                          ₹{item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Footer */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "20px",
                borderTop: "2px solid #f1f5f9"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "#64748b", fontSize: "0.95rem" }}>Status:</span>
                  <span
                    className="status-badge"
                    style={{
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      fontWeight: "700",
                      color: "#fff",
                      textTransform: "capitalize",
                      background: getStatusColor(order.status),
                      boxShadow: `0 4px 12px ${getStatusColor(order.status)}40`
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px",
                  padding: "12px 20px",
                  background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  borderRadius: "12px"
                }}>
                  <span style={{ color: "#64748b", fontSize: "1rem" }}>Total:</span>
                  <span style={{ 
                    color: "#059669", 
                    fontWeight: "700", 
                    fontSize: "1.5rem" 
                  }}>
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Corder;
