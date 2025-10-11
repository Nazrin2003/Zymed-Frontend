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

  const printReceipt = (order) => {
    const printWindow = window.open('', '_blank');
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - Order #${order._id.slice(-8).toUpperCase()}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            background: #ffffff;
          }
          
          .receipt-header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 3px solid #3b82f6;
          }
          
          .receipt-header h1 {
            color: #1e293b;
            font-size: 32px;
            margin-bottom: 8px;
          }
          
          .receipt-header .tagline {
            color: #64748b;
            font-size: 14px;
            font-style: italic;
          }
          
          .order-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            padding: 18px;
            background: #f8fafc;
            border-radius: 8px;
          }
          
          .order-info-section h3 {
            color: #1e293b;
            font-size: 14px;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .order-info-section p {
            color: #475569;
            font-size: 14px;
            line-height: 1.6;
          }
          
          .customer-details {
            margin-bottom: 25px;
            padding: 20px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
          }
          
          .customer-details h3 {
            color: #1e293b;
            font-size: 16px;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .customer-details table {
            width: 100%;
            border-collapse: collapse;
          }
          
          .customer-details td {
            padding: 8px 12px;
            font-size: 14px;
          }
          
          .customer-details td:first-child {
            color: #64748b;
            font-weight: 600;
            width: 120px;
          }
          
          .customer-details td:last-child {
            color: #1e293b;
          }
          
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          
          .items-table thead {
            background: #A8E6CF;
          }
          
          .items-table th {
            padding: 12px;
            text-align: left;
            color: #1B1F3B;
            font-weight: 700;
            font-size: 13px;
            border-bottom: 2px solid #6e8ca8;
          }
          
          .items-table td {
            padding: 12px;
            color: #475569;
            font-size: 14px;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .items-table tbody tr:last-child td {
            border-bottom: none;
          }
          
          .items-table tbody tr:nth-child(even) {
            background: #f8fafc;
          }
          
          .items-table .item-name {
            color: #1e293b;
            font-weight: 600;
          }
          
          .items-table th:last-child,
          .items-table td:last-child {
            text-align: right;
          }
          
          .items-table th:nth-child(3),
          .items-table td:nth-child(3) {
            text-align: center;
          }
          
          .total-section {
            margin-top: 15px;
            padding: 15px;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 8px;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
          }
          
          .total-row.grand-total {
            border-top: 2px solid #3b82f6;
            padding-top: 16px;
            margin-top: 8px;
          }
          
          .total-label {
            color: #64748b;
            font-size: 16px;
            font-weight: 600;
          }
          
          .total-label.grand {
            color: #1e293b;
            font-size: 18px;
          }
          
          .total-amount {
            color: #059669;
            font-size: 24px;
            font-weight: 700;
          }
          
          .status-section {
            margin-top: 15px;
            padding: 16px;
            background: #f8fafc;
            border-left: 4px solid ${order.status === 'delivered' ? '#059669' : '#3b82f6'};
            border-radius: 4px;
          }
          
          .status-section p {
            color: #475569;
            font-size: 14px;
          }
          
          .status-badge {
            display: inline-block;
            padding: 6px 16px;
            background: ${getStatusColor(order.status)};
            color: white;
            border-radius: 20px;
            font-weight: 700;
            font-size: 13px;
            text-transform: capitalize;
            margin-left: 8px;
          }
          
          .footer {
            margin-top: 10px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            color: #64748b;
            font-size: 12px;
          }
          
          .footer p {
            margin: 4px 0;
          }
          
          .print-date {
            margin-top: 30px;
            text-align: right;
            color: #94a3b8;
            font-size: 12px;
          }
          
          @media print {
            body {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-header">
          <h1>ZYMED PHARMACY</h1>
          <p class="tagline">Your Health, Our Priority</p>
        </div>
        
        <div class="order-info">
          <div class="order-info-section">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> #${order._id.slice(-8).toUpperCase()}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div class="order-info-section">
            <h3>Status</h3>
            <p>Order Status: <span class="status-badge">${order.status}</span></p>
          </div>
        </div>
        
        <div class="customer-details">
          <h3>Customer Information</h3>
          <table>
            <tr>
              <td>Customer Name:</td>
              <td>${order.username}</td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td>${order.phone}</td>
            </tr>
            <tr>
              <td>Delivery Address:</td>
              <td>${order.address}</td>
            </tr>
          </table>
        </div>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td class="item-name">${item.medicineId?.name || "Unknown"}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price * item.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="total-section">
          <div class="total-row">
            <span class="total-label">Subtotal:</span>
            <span style="color: #475569; font-size: 18px; font-weight: 600;">₹${order.totalAmount}</span>
          </div>
          <div class="total-row">
            <span class="total-label">Tax (0%):</span>
            <span style="color: #475569; font-size: 18px; font-weight: 600;">₹0</span>
          </div>
          <div class="total-row grand-total">
            <span class="total-label grand">Grand Total:</span>
            <span class="total-amount">₹${order.totalAmount}</span>
          </div>
        </div>
        
        <div class="status-section">
          <p><strong>Note:</strong> Please keep this receipt for your records. For any queries, contact our customer support.</p>
        </div>
        
        <div class="print-date">
          <p>Receipt generated on: ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
        
        <div class="footer">
          <p><strong>ZYMED PHARMACY</strong></p>
          <p>Thank you for choosing us for your healthcare needs!</p>
          <p>📞 Support: +91-XXXX-XXXXXX | 📧 Email: support@zymed.com</p>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    
    // Wait for content to load before printing
    printWindow.onload = function() {
      printWindow.print();
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#F59E0B";
      case "confirmed":
        return "#10B981";
      case "shipped":
        return "#3B82F6";
      case "delivered":
        return "#059669";
      default:
        return "#6B7280";
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
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <style>{`
        .order-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .order-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
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

        .info-table {
          transition: all 0.2s ease;
        }

        .info-table tr:hover {
          background: #f8fafc;
        }

        .print-btn {
          transition: all 0.2s ease;
        }

        .print-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        /* Print Styles */
        @media print {
          body * {
            visibility: hidden;
          }
          
          .receipt-print, .receipt-print * {
            visibility: visible;
          }
          
          .receipt-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }

          .no-print {
            display: none !important;
          }

          @page {
            margin: 0.5cm;
          }
        }
      `}</style>
      
      <div style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", minHeight: "100vh" }}>
        <Nav />
        
        {/* Hero Header */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgba(27, 31, 59, 0.9) 0%, rgba(168, 230, 207, 0.7) 100%), url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "80px 20px 60px",
          textAlign: "center",
          color: "white",
          marginBottom: "32px"
        }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "700", 
            marginBottom: "8px",
            textShadow: "2px 4px 8px rgba(0,0,0,0.3)",
            letterSpacing: "-0.5px"
          }}>
            📦 My Orders
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.95, margin: 0 }}>
            Track and manage your medicine orders
          </p>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 50px" }}>
          {/* Stats and Filter Section */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
            gap: "16px", 
            marginBottom: "32px" 
          }}>
            <div 
              className="filter-btn"
              onClick={() => setFilterStatus("all")}
              style={{
                background: filterStatus === "all" 
                  ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" 
                  : "#ffffff",
                color: filterStatus === "all" ? "#fff" : "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: filterStatus === "all" 
                  ? "0 6px 16px rgba(59, 130, 246, 0.4)" 
                  : "0 2px 12px rgba(0, 0, 0, 0.06)",
                border: filterStatus === "all" ? "none" : "2px solid #e2e8f0"
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "6px" }}>📊</div>
              <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "2px" }}>
                {orders.length}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.9, fontWeight: "500" }}>
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
                padding: "20px",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: filterStatus === "pending" 
                  ? "0 6px 16px rgba(245, 158, 11, 0.4)" 
                  : "0 2px 12px rgba(0, 0, 0, 0.06)",
                border: filterStatus === "pending" ? "none" : "2px solid #e2e8f0"
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "6px" }}>⏳</div>
              <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "2px" }}>
                {orders.filter(o => o.status === "pending").length}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.9, fontWeight: "500" }}>
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
                padding: "20px",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: filterStatus === "confirmed" 
                  ? "0 6px 16px rgba(16, 185, 129, 0.4)" 
                  : "0 2px 12px rgba(0, 0, 0, 0.06)",
                border: filterStatus === "confirmed" ? "none" : "2px solid #e2e8f0"
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "6px" }}>✓</div>
              <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "2px" }}>
                {orders.filter(o => o.status === "confirmed").length}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.9, fontWeight: "500" }}>
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
                padding: "20px",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: filterStatus === "shipped" 
                  ? "0 6px 16px rgba(59, 130, 246, 0.4)" 
                  : "0 2px 12px rgba(0, 0, 0, 0.06)",
                border: filterStatus === "shipped" ? "none" : "2px solid #e2e8f0"
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "6px" }}>🚚</div>
              <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "2px" }}>
                {orders.filter(o => o.status === "shipped").length}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.9, fontWeight: "500" }}>
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
                padding: "20px",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: filterStatus === "delivered" 
                  ? "0 6px 16px rgba(6, 182, 212, 0.4)" 
                  : "0 2px 12px rgba(0, 0, 0, 0.06)",
                border: filterStatus === "delivered" ? "none" : "2px solid #e2e8f0"
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "6px" }}>📦</div>
              <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "2px" }}>
                {orders.filter(o => o.status === "delivered").length}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.9, fontWeight: "500" }}>
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
              padding: "60px 20px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)"
            }}>
              <div style={{ fontSize: "4rem", color: "#e5e7eb", marginBottom: "16px" }}>📦</div>
              <h3 style={{ color: "#1e293b", marginBottom: "8px", fontSize: "1.5rem" }}>No orders found</h3>
              <p style={{ color: "#64748b", marginBottom: "20px", fontSize: "1rem" }}>
                {filterStatus === "all" 
                  ? "You haven't placed any orders yet." 
                  : `No ${filterStatus} orders at this time.`}
              </p>
            </div>
          ) : (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="order-card"
              style={{
                marginBottom: "20px",
                padding: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                border: "1px solid #e2e8f0"
              }}
            >
              {/* Compact Order Header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                paddingBottom: "12px",
                borderBottom: "1px solid #f1f5f9"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    color: "#fff"
                  }}>
                    📦
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "2px" }}>
                      Order ID
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1e293b" }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "2px" }}>
                      Order Date
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1e293b" }}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                  <span
                    className="status-badge"
                    style={{
                      padding: "6px 14px",
                      borderRadius: "16px",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      color: "#fff",
                      textTransform: "capitalize",
                      background: getStatusColor(order.status),
                      boxShadow: `0 2px 8px ${getStatusColor(order.status)}40`
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Delivery Details in Single Row Table */}
              <div style={{ marginBottom: "16px" }}>
                <table className="info-table" style={{ 
                  width: "100%", 
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <tbody>
                    <tr style={{ background: "#f8fafc" }}>
                      <td style={{ 
                        padding: "10px 14px", 
                        fontSize: "0.85rem", 
                        fontWeight: "600",
                        color: "#475569",
                        width: "20%",
                        borderRight: "1px solid #e2e8f0"
                      }}>
                        👤 Name
                      </td>
                      <td style={{ 
                        padding: "10px 14px", 
                        fontSize: "0.85rem", 
                        color: "#1e293b",
                        borderRight: "1px solid #e2e8f0"
                      }}>
                        {order.username}
                      </td>
                      <td style={{ 
                        padding: "10px 14px", 
                        fontSize: "0.85rem", 
                        fontWeight: "600",
                        color: "#475569",
                        width: "20%",
                        borderRight: "1px solid #e2e8f0"
                      }}>
                        📞 Phone
                      </td>
                      <td style={{ 
                        padding: "10px 14px", 
                        fontSize: "0.85rem", 
                        color: "#1e293b"
                      }}>
                        {order.phone}
                      </td>
                    </tr>
                    <tr style={{ background: "#ffffff" }}>
                      <td style={{ 
                        padding: "10px 14px", 
                        fontSize: "0.85rem", 
                        fontWeight: "600",
                        color: "#475569",
                        borderRight: "1px solid #e2e8f0",
                        borderTop: "1px solid #e2e8f0"
                      }}>
                        📍 Address
                      </td>
                      <td colSpan="3" style={{ 
                        padding: "10px 14px", 
                        fontSize: "0.85rem", 
                        color: "#1e293b",
                        borderTop: "1px solid #e2e8f0"
                      }}>
                        {order.address}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Items Table */}
              <div style={{ 
                borderRadius: "8px", 
                overflow: "hidden", 
                border: "1px solid #e2e8f0",
                marginBottom: "12px"
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ background: "#A8E6CF" }}>
                    <tr>
                      <th style={{ 
                        padding: "10px 14px", 
                        textAlign: "left", 
                        color: "#1B1F3B", 
                        fontWeight: "700",
                        fontSize: "0.85rem"
                      }}>
                        Medicine
                      </th>
                      <th style={{ 
                        padding: "10px 14px", 
                        textAlign: "left", 
                        color: "#1B1F3B", 
                        fontWeight: "700",
                        fontSize: "0.85rem"
                      }}>
                        Price
                      </th>
                      <th style={{ 
                        padding: "10px 14px", 
                        textAlign: "center", 
                        color: "#1B1F3B", 
                        fontWeight: "700",
                        fontSize: "0.85rem"
                      }}>
                        Qty
                      </th>
                      <th style={{ 
                        padding: "10px 14px", 
                        textAlign: "right", 
                        color: "#1B1F3B", 
                        fontWeight: "700",
                        fontSize: "0.85rem"
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
                          padding: "10px 14px", 
                          color: "#1e293b", 
                          fontWeight: "600",
                          fontSize: "0.85rem"
                        }}>
                          💊 {item.medicineId?.name || "Unknown"}
                        </td>
                        <td style={{ 
                          padding: "10px 14px", 
                          color: "#64748b",
                          fontSize: "0.85rem"
                        }}>
                          ₹{item.price}
                        </td>
                        <td style={{ 
                          padding: "10px 14px", 
                          textAlign: "center",
                          fontSize: "0.85rem"
                        }}>
                          <span style={{
                            background: "#e0f2fe",
                            color: "#0369a1",
                            padding: "3px 10px",
                            borderRadius: "6px",
                            fontWeight: "600",
                            fontSize: "0.8rem"
                          }}>
                            {item.quantity}
                          </span>
                        </td>
                        <td style={{ 
                          padding: "10px 14px", 
                          textAlign: "right",
                          color: "#1e293b",
                          fontWeight: "700",
                          fontSize: "0.9rem"
                        }}>
                          ₹{item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Compact Order Footer */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "12px",
                borderTop: "1px solid #f1f5f9"
              }}>
                <button
                  onClick={() => printReceipt(order)}
                  className="print-btn no-print"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)"
                  }}
                >
                  <span>🖨️</span>
                  <span>Print Receipt</span>
                </button>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px",
                  padding: "8px 16px",
                  background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  borderRadius: "10px"
                }}>
                  <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: "600" }}>Total:</span>
                  <span style={{ 
                    color: "#059669", 
                    fontWeight: "700", 
                    fontSize: "1.3rem" 
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