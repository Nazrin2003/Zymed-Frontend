import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import NavBar from "./NavBar";

const Notification = () => {
  const [medicines, setMedicines] = useState([]);
  const [expired, setExpired] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  const [emailSent, setEmailSent] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:3030/medicines");
      const today = new Date();

      const expiredMeds = res.data.filter((med) => new Date(med.expiryDate) < today);
      const outOfStockMeds = res.data.filter((med) => med.quantity === 0);

      setMedicines(res.data);
      setExpired(expiredMeds);
      setOutOfStock(outOfStockMeds);
    } catch (err) {
      console.error("Failed to fetch medicines:", err);
    }
  };

  const sendEmailNotification = async () => {
    try {
      await axios.post("http://localhost:3030/notifications/email", {
        expired,
        outOfStock
      });
      setEmailSent(true);
    } catch (err) {
      console.error("Failed to send email:", err);
    }
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

      // ✅ Auto-send email if any issues
      if (expiredMeds.length > 0 || outOfStockMeds.length > 0) {
        await axios.post("http://localhost:3030/notifications/email", {
          expired: expiredMeds,
          outOfStock: outOfStockMeds
        });
        setEmailSent(true);
      }
    } catch (err) {
      console.error("Failed to fetch or notify:", err);
    }
  };

  fetchAndNotify();
}, []);


  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", display: "flex" }}>
      <NavBar />
      <div style={{ marginLeft: "240px", padding: "30px", flex: 1 }}>
        <h2 className="mb-4 fw-bold" style={{ color: "#1b1f3b" }}>
          Notifications
        </h2>

        {/* 📊 Summary Stats */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div style={{ ...cardStyle, borderTop: "4px solid #16a34a", flex: 1 }}>
            <h5>Total Medicines</h5>
            <p>{medicines.length}</p>
          </div>
          <div style={{ ...cardStyle, borderTop: "4px solid #dc2626", flex: 1 }}>
            <h5>Expired Medicines</h5>
            <p>{expired.length}</p>
          </div>
          <div style={{ ...cardStyle, borderTop: "4px solid #f59e0b", flex: 1 }}>
            <h5>Out of Stock</h5>
            <p>{outOfStock.length}</p>
          </div>
        </div>

        {/* 📧 Email Notification Button */}
        {/* <div style={{ marginBottom: "20px" }}>
          <button
            className="btn btn-danger"
            onClick={sendEmailNotification}
            disabled={emailSent}
          >
            {emailSent ? "Email Sent ✅" : "Send Email Notification 📧"}
          </button>
        </div> */}

        {/* 💀 Expired Medicines */}
        <div style={cardStyle}>
          <h4 style={{ color: "#dc2626" }}>💀 Expired Medicines</h4>
          {expired.length === 0 ? (
            <p>All medicines are within expiry.</p>
          ) : (
            <ul>
              {expired.map((med) => (
                <li key={med._id}>
                  <strong>{med.name}</strong> — Expired on {format(new Date(med.expiryDate), "dd MMM yyyy")}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 📦 Out of Stock Medicines */}
        <div style={cardStyle}>
          <h4 style={{ color: "#f59e0b" }}>📦 Out of Stock</h4>
          {outOfStock.length === 0 ? (
            <p>All medicines are in stock.</p>
          ) : (
            <ul>
              {outOfStock.map((med) => (
                <li key={med._id}>
                  <strong>{med.name}</strong> — Quantity: 0
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
