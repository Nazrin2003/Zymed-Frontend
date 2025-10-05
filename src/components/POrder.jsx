import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./NavBar";
import Footer from "./Footer";
import NavBar from "./NavBar";

const sidebar = {
  width: "220px",
  background: "#1f2937",
  padding: "20px",
  minHeight: "100vh",
  position: "fixed",
  top: 0,
  left: 0
};

const sidebarItem = {
  display: "block",
  color: "#fff",
  padding: "10px 15px",
  marginBottom: "10px",
  textDecoration: "none",
  borderRadius: "6px",
  backgroundColor: "#4b5563"
};

const POrder = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

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

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", display: "flex" }}>
      {/* Sidebar */}
      
      <NavBar/>

      {/* Main Content */}
      <div className="container py-5" style={{ marginLeft: "240px", flex: 1 }}>
        <h2 className="mb-4 fw-bold" style={{ color: "#1b1f3b" }}>
          Pharmacist Orders Dashboard
        </h2>

        {/* Status Summary Buttons */}
        <div className="d-flex gap-3 mb-4 flex-wrap">
          {["all", "pending", "confirmed", "shipped", "delivered"].map((status) => (
            <button
              key={status}
              className={`btn ${
                filter === status ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setFilter(status)}
            >
              {status === "all"
                ? `All Orders (${orders.length})`
                : `${status.charAt(0).toUpperCase() + status.slice(1)} (${statusCounts[status]})`}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="table-responsive shadow-sm rounded">
            <table className="table align-middle bg-white border">
              <thead style={{ background: "#a8e6cf" }}>
                <tr>
                  <th>User</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Medicines</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.username}</td>
                    <td>{order.address}</td>
                    <td>{order.phone}</td>
                    <td>
                      <ul className="list-unstyled">
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.medicineId?.name || "Unknown"} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>₹{order.totalAmount}</td>
                    <td>
                      <span
                        className="badge px-3 py-2"
                        style={{
                          background:
                            order.status === "confirmed"
                              ? "#16a34a"
                              : order.status === "shipped"
                              ? "#2563EB"
                              : order.status === "delivered"
                              ? "#0f766e"
                              : "#f59e0b",
                          color: "#fff",
                          fontSize: "0.9rem",
                          borderRadius: "6px"
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {order.status === "pending" && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => updateStatus(order._id, "confirmed")}
                        >
                          Confirm
                        </button>
                      )}
                      {order.status === "confirmed" && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => updateStatus(order._id, "shipped")}
                        >
                          Ship
                        </button>
                      )}
                      {order.status === "shipped" && (
                        <button
                          className="btn btn-sm btn-dark"
                          onClick={() => updateStatus(order._id, "delivered")}
                        >
                          Deliver
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default POrder;
