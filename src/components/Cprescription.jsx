import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

const Cprescription = () => {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !userId) {
      alert("Please select a file and make sure you're logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("notes", notes);

    try {
      await axios.post(
        `http://localhost:3030/prescriptions/upload/${userId}`,
        formData
      );
      setStatus("Prescription uploaded successfully!");
      setFile(null);
      setNotes("");
      fetchPrescriptions();
    } catch (err) {
      console.error(err);
      setStatus("Upload failed. Please try again.");
    }
  };

  // fetch prescriptions & also fetch reply if verified
  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3030/prescriptions/user/${userId}`
      );

      const prescriptionsWithReplies = await Promise.all(
        res.data.map(async (p) => {
          if (p.status === "verified") {
            try {
              const replyRes = await axios.get(
                `http://localhost:3030/prescriptions/${p._id}/reply`
              );
              return { ...p, reply: replyRes.data };
            } catch (err) {
              console.error("Reply fetch failed:", err);
              return p;
            }
          }
          return p;
        })
      );

      setPrescriptions(prescriptionsWithReplies);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) fetchPrescriptions();
  }, [userId]);

  return (
    <div style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <Nav />

      {/* Page Header */}
      <div
        style={{
          backgroundImage: `linear-gradient(135deg, rgb(159 113 157 / 90%) 0%, rgb(6 182 212 / 42%) 100%), url('https://images.unsplash.com/photo-1696861286643-341a8d7a79e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 0px",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontWeight: "700", fontSize: "3rem", textShadow: "2px 4px 8px rgba(0,0,0,0.3)", margin: 0, letterSpacing: "-0.5px" }}>💊 Prescription Management</h1>
          <p style={{ opacity: 0.95, fontSize: "1.2rem", marginTop: "12px", fontWeight: "400" }}>Upload, track, and manage your prescriptions seamlessly</p>
        </div>
      </div>


      <div className="container py-5" style={{ maxWidth: "1200px" }}>
        {/* Upload Form */}
        <div className="card shadow-lg border-0 mb-5" style={{ background: "#ffffff", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)", padding: "20px 30px" }}>
            <h4 style={{ color: "#ffffff", fontSize: "1.6rem", fontWeight: "700", margin: 0 }}>
              📤 Upload New Prescription
            </h4>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleUpload}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#4A5568", marginBottom: "8px" }}>
                  Choose Prescription File
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                  style={{ borderRadius: "8px", padding: "10px 15px", border: "1px solid #E2E8F0" }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#4A5568", marginBottom: "8px" }}>
                  Additional Notes
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ borderRadius: "8px", padding: "10px 15px", border: "1px solid #E2E8F0" }}
                />
              </div>
              <button
                type="submit"
                className="btn w-100 fw-semibold"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                  color: "#fff",
                  borderRadius: "10px",
                  transition: "all 0.3s ease",
                  border: "none",
                  padding: "14px 25px",
                  fontSize: "1.1rem",
                  boxShadow: "0 6px 20px rgba(14, 165, 233, 0.4)",
                  fontWeight: "600"
                }}
                onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
              >
                📤 Upload Prescription
              </button>
            </form>
            {status && (
              <div className="mt-3 text-center fw-semibold" style={{ 
                color: status.includes("success") ? "#059669" : "#dc2626", 
                fontSize: "1rem",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: status.includes("success") ? "#d1fae5" : "#fee2e2"
              }}>
                {status}
              </div>
            )}
          </div>
        </div>

        {/* Previous Prescriptions */}
        <div style={{ marginBottom: "30px" }}>
          <h3
            className="fw-bold"
            style={{
              color: "#0c4a6e",
              fontSize: "2.2rem",
              marginBottom: "8px",
              fontWeight: "700"
            }}
          >
            📋 Your Prescriptions
          </h3>
          <p style={{ color: "#64748b", fontSize: "1.05rem", margin: 0 }}>View and manage your prescription history</p>
        </div>

        {prescriptions.length === 0 ? (
          <p style={{ color: "#4A5568", fontSize: "1.1rem" }}>No prescriptions uploaded yet.</p>
        ) : (
          <div className="table-responsive shadow-sm rounded" style={{ borderRadius: "12px", overflow: "hidden" }}>
  <table className="table align-middle bg-white border" style={{ borderCollapse: "separate", borderSpacing: "0 10px", margin: "0", width: "100%" }}>
    <thead style={{ background: "#EBF8FF" }}>
      <tr>
        <th style={{ width: "10%", padding: "15px 20px", fontWeight: "600", color: "#2D3748" }}>File</th>
        <th style={{ width: "15%", padding: "15px 20px", fontWeight: "600", color: "#2D3748" }}>Notes</th>
        <th style={{ width: "55%", padding: "15px 20px", fontWeight: "600", color: "#2D3748" }}>Status / Medicines</th>
        <th style={{ width: "20%", padding: "15px 20px", fontWeight: "600", color: "#2D3748" }}>Uploaded At</th>
      </tr>
    </thead>
    <tbody>
      {prescriptions.map((presc) => (
        <tr key={presc._id} style={{ background: "#fff", marginBottom: "10px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
          <td style={{ padding: "15px 20px", borderBottom: "1px solid #E2E8F0" }}>
            <a
              href={`http://localhost:3030/${presc.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4299E1", fontWeight: "500", wordBreak: "break-word", textDecoration: "none" }}
            >
              View File
            </a>
          </td>
          <td style={{ color: "#4A5568", wordBreak: "break-word", padding: "15px 20px", borderBottom: "1px solid #E2E8F0" }}>
            {presc.notes || "—"}
          </td>
          <td style={{ padding: "15px 20px", borderBottom: "1px solid #E2E8F0" }}>
            <span
              className="badge px-3 py-2"
              style={{
                background:
                  presc.status === "verified"
                    ? "#38A169"
                    : presc.status === "rejected"
                      ? "#E53E3E"
                      : "#ED8936",
                color: "#fff",
                fontSize: "0.85rem",
                borderRadius: "9999px",
                padding: "8px 12px",
                fontWeight: "600"
              }}
            >
              {presc.status}
            </span>

            {presc.status === "verified" && presc.reply && (
                <div className="mt-3">
                  {/* Pharmacist Reply Message */}
                  {presc.reply.message && (
                    <div style={{
                      background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                      borderLeft: "5px solid #0284c7",
                      padding: "16px 20px",
                      borderRadius: "12px",
                      marginBottom: "20px",
                      boxShadow: "0 2px 8px rgba(14, 165, 233, 0.15)"
                    }}>
                      <p style={{ fontWeight: "700", color: "#0369a1", marginBottom: "8px", fontSize: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                        💊 Pharmacist's Instructions
                      </p>
                      <p style={{ color: "#0c4a6e", margin: 0, fontSize: "0.95rem", lineHeight: "1.6", fontWeight: "500" }}>
                        {presc.reply.message}
                      </p>
                    </div>
                  )}

                  {/* Medicines List */}
                  {presc.reply.medicines?.length > 0 && (
                    <div className="row g-4">
                      {presc.reply.medicines.map((m) => (
                      <div key={m.medicineId._id} className="col-md-6 col-lg-6">
                        <div
                          className="card h-100"
                          style={{ 
                            border: "none", 
                            borderRadius: "16px", 
                            boxShadow: "0 4px 20px rgba(14, 165, 233, 0.15)",
                            transition: "all 0.3s ease",
                            overflow: "hidden",
                            background: "#ffffff"
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.boxShadow = "0 8px 30px rgba(14, 165, 233, 0.25)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 20px rgba(14, 165, 233, 0.15)";
                          }}
                        >
                          <div style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)", padding: "16px 20px" }}>
                            <h6 className="fw-bold mb-0" style={{ color: "#ffffff", fontSize: "1.3rem" }}>
                              {m.medicineId.name}
                            </h6>
                          </div>
                          <div className="card-body p-4">
                            <div style={{ marginBottom: "20px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                <span style={{ color: "#64748b", fontSize: "0.95rem", fontWeight: "500" }}>💰 Price:</span>
                                <span style={{ color: "#059669", fontSize: "1.3rem", fontWeight: "700" }}>₹{m.medicineId.price}</span>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ color: "#64748b", fontSize: "0.95rem", fontWeight: "500" }}>📦 Quantity:</span>
                                <span style={{ color: "#0c4a6e", fontSize: "1.1rem", fontWeight: "600" }}>{m.quantity}</span>
                              </div>
                            </div>
                            <button
                              className="btn w-100 fw-semibold"
                              style={{
                                background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                                color: "#fff",
                                borderRadius: "10px",
                                border: "none",
                                padding: "12px 20px",
                                fontSize: "1.05rem",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
                                fontWeight: "600"
                              }}
                              onClick={async () => {
                                await axios.post(
                                  `http://localhost:3030/cart/${userId}`,
                                  {
                                    medicineId: m.medicineId._id,
                                    quantity: 1,
                                  }
                                );
                                alert("✅ Added to cart successfully!");
                              }}
                              onMouseOver={(e) => {
                                e.target.style.transform = "scale(1.02)";
                                e.target.style.boxShadow = "0 6px 16px rgba(5, 150, 105, 0.4)";
                              }}
                              onMouseOut={(e) => {
                                e.target.style.transform = "scale(1)";
                                e.target.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.3)";
                              }}
                            >
                              🛒 Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                  )}
                </div>
              )}
          </td>
          <td style={{ color: "#4A5568", whiteSpace: "nowrap", padding: "15px 20px", borderBottom: "1px solid #E2E8F0" }}>
            {new Date(presc.uploadedAt).toLocaleString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cprescription;
