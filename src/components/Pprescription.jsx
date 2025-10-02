import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Pprescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filter, setFilter] = useState("all"); // ✅ filter state
  const navigate = useNavigate();

  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get("http://localhost:3030/prescriptions");
      setPrescriptions(res.data);
    } catch (err) {
      console.error(err);
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

  const layout = {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#f9fafb",
  };

  const sidebar = {
    width: "220px",
    backgroundColor: "#1f2937",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const sidebarItem = {
    display: "block",
    padding: "12px 20px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    borderRadius: "6px",
    transition: "0.2s",
    margin: "4px 10px",
  };

  const content = {
    flex: 1,
    padding: "32px",
  };

  const boxStyle = {
    color: "#fff",
    padding: "16px",
    borderRadius: "10px",
    width: "180px",
    textAlign: "center",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.2s",
  };

  const buttonStyle = {
    padding: "6px 12px",
    margin: "4px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  // ✅ Apply filter on prescriptions
  const filteredPrescriptions =
    filter === "all"
      ? prescriptions
      : prescriptions.filter((p) => p.status === filter);

  return (
    <div style={layout}>
      {/* Sidebar */}
      <div style={sidebar}>
        <div>
          <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "30px" }}>
            Zymed
          </h2>
          <Link to="/phome" style={sidebarItem}>
            📊 Dashboard
          </Link>
          <Link to="/orders" style={sidebarItem}>
            📦 Orders
          </Link>
          <Link
            to="/pprescription"
            style={{ ...sidebarItem, backgroundColor: "#374151" }}
          >
            💊 Prescriptions
          </Link>
        </div>
        <button
          onClick={handleLogout}
          style={{
            margin: "20px",
            padding: "10px",
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={content}>
        <h1 style={{ marginBottom: "20px" }}>Prescriptions Dashboard</h1>

        {/* Dashboard Cards */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div
            style={{ ...boxStyle, background: "#16a34a" }}
            onClick={() => setFilter("all")}
          >
            Total: {prescriptions.length}
          </div>
          <div
            style={{ ...boxStyle, background: "#f59e0b" }}
            onClick={() => setFilter("pending")}
          >
            Pending: {prescriptions.filter((p) => p.status === "pending").length}
          </div>
          <div
            style={{ ...boxStyle, background: "#16a34a" }}
            onClick={() => setFilter("verified")}
          >
            Verified: {prescriptions.filter((p) => p.status === "verified").length}
          </div>
          <div
            style={{ ...boxStyle, background: "#dc2626" }}
            onClick={() => setFilter("rejected")}
          >
            Rejected: {prescriptions.filter((p) => p.status === "rejected").length}
          </div>
        </div>

        {/* Prescription Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "20px",
          }}
        >
          {filteredPrescriptions.length === 0 ? (
            <p>No prescriptions found.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#e5e7eb", textAlign: "left" }}>
                  <th style={{ padding: "12px" }}>Customer</th>
                  <th>File</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th>Uploaded At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrescriptions.map((presc) => (
                  <tr key={presc._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px" }}>
                      {presc.userId?.name || "Unknown"}
                    </td>
                    <td>
                      <a
                        href={`http://localhost:3030/${presc.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View File
                      </a>
                    </td>
                    <td>{presc.notes || "—"}</td>
                    <td>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "#fff",
                          backgroundColor:
                            presc.status === "verified"
                              ? "#16a34a"
                              : presc.status === "rejected"
                              ? "#dc2626"
                              : "#f59e0b",
                        }}
                      >
                        {presc.status}
                      </span>
                    </td>
                    <td>{new Date(presc.uploadedAt).toLocaleString()}</td>
                    <td>
                      <button
                        style={{ ...buttonStyle, background: "#16a34a", color: "#fff" }}
                        onClick={() => navigate(`/verify-prescription/${presc._id}`)}
                      >
                        Verify
                      </button>
                      <button
                        style={{ ...buttonStyle, background: "#dc2626", color: "#fff" }}
                        onClick={() => updateStatus(presc._id, "rejected")}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pprescription;
