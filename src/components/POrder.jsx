import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const POrder = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3030/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3030/orders/${orderId}/status`, {
        status: newStatus
      });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusCounts = {
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const getStatusColor = (status) => {
    const colors = {
      pending: { bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", shadow: "rgba(245, 158, 11, 0.3)" },
      confirmed: { bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)", shadow: "rgba(16, 185, 129, 0.3)" },
      shipped: { bg: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", shadow: "rgba(59, 130, 246, 0.3)" },
      delivered: { bg: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", shadow: "rgba(6, 182, 212, 0.3)" }
    };
    return colors[status] || colors.pending;
  };

  const getActionButton = (order) => {
    const buttons = {
      pending: {
        text: "✓ Confirm Order",
        nextStatus: "confirmed",
        gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        shadow: "rgba(16, 185, 129, 0.3)"
      },
      confirmed: {
        text: "🚚 Ship Order",
        nextStatus: "shipped",
        gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
        shadow: "rgba(59, 130, 246, 0.3)"
      },
      shipped: {
        text: "📦 Mark Delivered",
        nextStatus: "delivered",
        gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
        shadow: "rgba(6, 182, 212, 0.3)"
      }
    };
    return buttons[order.status];
  };

  return (
    <>
      <style>{`
        .filter-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .filter-btn:active {
          transform: translateY(0);
        }
        
        .order-row {
          transition: all 0.2s ease;
        }
        
        .order-row:hover {
          background: #f8fafc !important;
          transform: scale(1.005);
        }
        
        .action-button {
          transition: all 0.2s ease;
        }
        
        .action-button:hover {
          transform: translateY(-2px);
        }
        
        .action-button:active {
          transform: translateY(0);
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
        
        .stat-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div style={{ 
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", 
        minHeight: "100vh", 
        display: "flex" 
      }}>
        <NavBar />

        <div style={{ 
          marginLeft: "260px", 
          flex: 1, 
          padding: "32px",
          maxWidth: "calc(100vw - 260px)" 
        }}>
          {/* Header */}
          <div style={{
            background: "#fff",
            padding: "24px 32px",
            borderRadius: "16px",
            marginBottom: "32px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)"
          }}>
            <h2 style={{ 
              margin: 0, 
              color: "#1e293b",
              fontSize: "28px",
              fontWeight: "700"
            }}>
              📦 Orders Dashboard
            </h2>
            <p style={{ 
              margin: "4px 0 0 0", 
              color: "#64748b",
              fontSize: "14px" 
            }}>
              Manage and track all pharmacy orders
            </p>
          </div>

          {/* Status Statistics Cards */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "20px", 
            marginBottom: "32px" 
          }}>
            <div 
              className="stat-card"
              onClick={() => setFilter("all")}
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                padding: "24px",
                borderRadius: "16px",
                color: "#fff",
                boxShadow: filter === "all" ? "0 8px 20px rgba(99, 102, 241, 0.4)" : "0 4px 16px rgba(99, 102, 241, 0.3)",
                border: filter === "all" ? "3px solid #fff" : "none"
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📊</div>
              <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                {orders.length}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.9, fontWeight: "500" }}>
                Total Orders
              </div>
            </div>

            <div 
              className="stat-card"
              onClick={() => setFilter("pending")}
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                padding: "24px",
                borderRadius: "16px",
                color: "#fff",
                boxShadow: filter === "pending" ? "0 8px 20px rgba(245, 158, 11, 0.4)" : "0 4px 16px rgba(245, 158, 11, 0.3)",
                border: filter === "pending" ? "3px solid #fff" : "none"
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>⏳</div>
              <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                {statusCounts.pending}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.9, fontWeight: "500" }}>
                Pending Orders
              </div>
            </div>

            <div 
              className="stat-card"
              onClick={() => setFilter("confirmed")}
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                padding: "24px",
                borderRadius: "16px",
                color: "#fff",
                boxShadow: filter === "confirmed" ? "0 8px 20px rgba(16, 185, 129, 0.4)" : "0 4px 16px rgba(16, 185, 129, 0.3)",
                border: filter === "confirmed" ? "3px solid #fff" : "none"
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>✓</div>
              <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                {statusCounts.confirmed}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.9, fontWeight: "500" }}>
                Confirmed Orders
              </div>
            </div>

            <div 
              className="stat-card"
              onClick={() => setFilter("shipped")}
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                padding: "24px",
                borderRadius: "16px",
                color: "#fff",
                boxShadow: filter === "shipped" ? "0 8px 20px rgba(59, 130, 246, 0.4)" : "0 4px 16px rgba(59, 130, 246, 0.3)",
                border: filter === "shipped" ? "3px solid #fff" : "none"
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🚚</div>
              <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                {statusCounts.shipped}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.9, fontWeight: "500" }}>
                Shipped Orders
              </div>
            </div>

            <div 
              className="stat-card"
              onClick={() => setFilter("delivered")}
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                padding: "24px",
                borderRadius: "16px",
                color: "#fff",
                boxShadow: filter === "delivered" ? "0 8px 20px rgba(6, 182, 212, 0.4)" : "0 4px 16px rgba(6, 182, 212, 0.3)",
                border: filter === "delivered" ? "3px solid #fff" : "none"
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📦</div>
              <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                {statusCounts.delivered}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.9, fontWeight: "500" }}>
                Delivered Orders
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)"
          }}>
            <div style={{ 
              padding: "24px 32px", 
              borderBottom: "2px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h3 style={{ 
                  margin: 0, 
                  color: "#1e293b",
                  fontSize: "20px",
                  fontWeight: "700"
                }}>
                  {filter === "all" ? "All Orders" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Orders`}
                </h3>
                <p style={{ 
                  margin: "4px 0 0 0", 
                  color: "#64748b",
                  fontSize: "14px" 
                }}>
                  {filteredOrders.length} orders found
                </p>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div style={{ 
                padding: "60px 32px", 
                textAlign: "center",
                color: "#64748b"
              }}>
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>📭</div>
                <h4 style={{ color: "#475569", marginBottom: "8px" }}>No orders found</h4>
                <p style={{ fontSize: "14px" }}>There are no orders matching your current filter.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle mb-0" style={{ minWidth: "900px" }}>
                  <thead style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                    <tr>
                      <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Customer
                      </th>
                      <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Contact
                      </th>
                      <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Items
                      </th>
                      <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Total
                      </th>
                      <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Status
                      </th>
                      <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => {
                      const actionBtn = getActionButton(order);
                      return (
                        <tr 
                          key={order._id} 
                          className="order-row"
                          style={{ borderBottom: "1px solid #e2e8f0" }}
                        >
                          <td style={{ padding: "20px 24px" }}>
                            <div>
                              <div style={{ fontWeight: "600", color: "#1e293b", marginBottom: "2px" }}>
                                {order.username}
                              </div>
                              <div style={{ fontSize: "13px", color: "#64748b" }}>
                                {order.address}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "20px 24px" }}>
                            <div style={{ 
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "6px 12px",
                              background: "#f1f5f9",
                              borderRadius: "8px",
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "#475569"
                            }}>
                              📞 {order.phone}
                            </div>
                          </td>
                          <td style={{ padding: "20px 24px" }}>
                            <div style={{ maxWidth: "250px" }}>
                              {order.items.map((item, index) => (
                                <div 
                                  key={index} 
                                  style={{ 
                                    fontSize: "13px",
                                    color: "#475569",
                                    marginBottom: "4px",
                                    padding: "4px 8px",
                                    background: "#f8fafc",
                                    borderRadius: "4px",
                                    display: "inline-block",
                                    marginRight: "4px"
                                  }}
                                >
                                  💊 {item.medicineId?.name || "Unknown"} × {item.quantity}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td style={{ padding: "20px 24px" }}>
                            <div style={{ 
                              fontWeight: "700",
                              fontSize: "16px",
                              color: "#10b981"
                            }}>
                              ₹{order.totalAmount.toLocaleString()}
                            </div>
                          </td>
                          <td style={{ padding: "20px 24px" }}>
                            <span
                              className="status-badge"
                              style={{
                                display: "inline-block",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                fontSize: "13px",
                                fontWeight: "700",
                                color: "#fff",
                                background: getStatusColor(order.status).bg,
                                boxShadow: `0 4px 12px ${getStatusColor(order.status).shadow}`,
                                textTransform: "capitalize"
                              }}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td style={{ padding: "20px 24px" }}>
                            {actionBtn ? (
                              <button
                                className="action-button"
                                onClick={() => updateStatus(order._id, actionBtn.nextStatus)}
                                style={{
                                  background: actionBtn.gradient,
                                  color: "#fff",
                                  border: "none",
                                  padding: "10px 20px",
                                  borderRadius: "8px",
                                  fontWeight: "600",
                                  fontSize: "13px",
                                  cursor: "pointer",
                                  boxShadow: `0 4px 12px ${actionBtn.shadow}`,
                                  whiteSpace: "nowrap"
                                }}
                              >
                                {actionBtn.text}
                              </button>
                            ) : (
                              <span style={{ 
                                color: "#64748b",
                                fontSize: "13px",
                                fontWeight: "500"
                              }}>
                                ✓ Completed
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default POrder;