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
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <Nav />
      <div className="container py-5">
        <h2 className="mb-4 fw-bold" style={{ color: "#1b1f3b" }}>
          Your Orders
        </h2>

        {/* Filter Dropdown */}
        <div className="mb-4">
          <label htmlFor="statusFilter" className="form-label fw-semibold" style={{ color: "#374151" }}>
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ maxWidth: "300px" }}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {loading ? (
          <p>Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p style={{ color: "#444" }}>No orders found for selected status.</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="mb-4 p-4 bg-white rounded shadow-sm border"
            >
              <div className="d-flex justify-content-between mb-3">
                <div style={{ color: "#1b1f3b", fontWeight: "500" }}>
                  🧾 Order ID: {order._id}
                </div>
                <div style={{ color: "#6b7280", fontSize: "14px" }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div style={{ marginBottom: "10px", fontSize: "14px", color: "#374151" }}>
                <strong>Name:</strong> {order.username} <br />
                <strong>Phone:</strong> {order.phone} <br />
                <strong>Address:</strong> {order.address}
              </div>

              <table className="table table-sm align-middle">
                <thead style={{ background: "#e0f2f1" }}>
                  <tr>
                    <th>Medicine</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ color: "#1b1f3b", fontWeight: "500" }}>
                        {item.medicineId?.name || "Unknown"}
                      </td>
                      <td style={{ color: "#444" }}>₹{item.price}</td>
                      <td>{item.quantity}</td>
                      <td style={{ color: "#444" }}>
                        ₹{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-between mt-3">
                <div style={{ fontSize: "14px", color: "#6b7280" }}>
                  Status: <span style={{ fontWeight: "500", color: "#00769b" }}>{order.status}</span>
                </div>
                <div className="fw-bold" style={{ color: "#1b1f3b" }}>
                  Total: ₹{order.totalAmount}
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
