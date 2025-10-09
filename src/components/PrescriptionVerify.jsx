import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PrescriptionVerify = () => {
  const { id } = useParams();
  const [medicines, setMedicines] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const pharmacist = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:3030/medicines")
      .then((res) => {
        setMedicines(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggleSelect = (medicine) => {
    if (selected.find((m) => m.medicineId === medicine._id)) {
      setSelected(selected.filter((m) => m.medicineId !== medicine._id));
    } else {
      setSelected([
        ...selected,
        { medicineId: medicine._id, price: medicine.price, quantity: 1 },
      ]);
    }
  };

  const handleConfirm = async () => {
    if (!replyMessage.trim()) {
      alert("⚠️ Please add a reply message for the customer.");
      return;
    }
    try {
      await axios.post(`http://localhost:3030/prescriptions/forward/${id}`, {
        pharmacistId: pharmacist.id,
        medicines: selected,
        message: replyMessage,
      });
      alert("✅ Prescription forwarded to customer!");
      navigate("/pprescription");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to forward prescription");
    }
  };

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#374151" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid rgba(107,114,128,0.3)",
              borderTop: "4px solid #4b5563",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          ></div>
          <p style={{ fontSize: "18px" }}>Loading medicines...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f9fafb 0%, #e5e7eb 100%)",
        padding: "40px",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <button
            onClick={() => navigate("/pprescription")}
            style={{
              background: "rgb(255 115 115)",
              color: "#374151",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "20px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d1d5db";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#e5e7eb";
            }}
          >
            ← Back to Dashboard
          </button>

          <h2
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "8px",
            }}
          >
            🏥 Prescription Verification
          </h2>
          <p style={{ color: "#4b5563", fontSize: "16px" }}>
            Select medicines and compose a message for the customer
          </p>
        </div>

        {/* Selected Medicines Summary */}
        {selected.length > 0 && (
          <div
            style={{
              background: "#10b981",
              padding: "20px 24px",
              borderRadius: "16px",
              marginBottom: "24px",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 12px rgba(16,185,129,0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                💊
              </div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  {selected.length} Medicine
                  {selected.length !== 1 ? "s" : ""} Selected
                </div>
                <div style={{ fontSize: "14px", opacity: 0.9 }}>
                  Total: ₹
                  {selected
                    .reduce((sum, item) => sum + item.price, 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelected([])}
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Message Box */}
        <div
          style={{
            background: "#ffffff",
            padding: "28px",
            borderRadius: "16px",
            marginBottom: "24px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h4
            style={{
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "10px",
              fontSize: "18px",
            }}
          >
            💬 Message to Customer
          </h4>
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Enter dosage instructions or recommendations..."
            rows="4"
            style={{
              width: "100%",
              padding: "14px",
              border: replyMessage.trim()
                ? "2px solid #10b981"
                : "2px solid #d1d5db",
              borderRadius: "12px",
              fontSize: "15px",
              resize: "vertical",
              outline: "none",
            }}
          />
        </div>

        {/* Search and Confirm Bar */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px 24px",
            borderRadius: "16px",
            marginBottom: "24px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "2px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <button
            onClick={handleConfirm}
            disabled={selected.length === 0 || !replyMessage.trim()}
            style={{
              background:
                selected.length === 0 || !replyMessage.trim()
                  ? "#9ca3af"
                  : "#10b981",
              color: "#fff",
              padding: "12px 28px",
              border: "none",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "16px",
              cursor:
                selected.length === 0 || !replyMessage.trim()
                  ? "not-allowed"
                  : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            ✉️ Confirm & Send
          </button>
        </div>

        {/* Medicine Cards */}
        {filteredMedicines.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "60px 24px",
              borderRadius: "16px",
              textAlign: "center",
              color: "#6b7280",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: "60px", marginBottom: "16px" }}>💊</div>
            <h3>No medicines found</h3>
            <p style={{ color: "#9ca3af" }}>
              {search
                ? `No results for "${search}"`
                : "The medicine inventory is empty"}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredMedicines.map((med) => {
              const isSelected = selected.find(
                (m) => m.medicineId === med._id
              );
              return (
                <div
                  key={med._id}
                  onClick={() => toggleSelect(med)}
                  style={{
                    background: "#fff",
                    padding: "24px",
                    borderRadius: "16px",
                    border: isSelected
                      ? "2px solid #10b981"
                      : "2px solid #e5e7eb",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "8px",
                    }}
                  >
                    {med.name}
                  </h4>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#10b981",
                      fontWeight: "600",
                      marginBottom: "12px",
                    }}
                  >
                    ₹{med.price}
                  </div>
                  <button
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "none",
                      background: isSelected ? "#ef4444" : "#3b82f6",
                      color: "#fff",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                  >
                    {isSelected
                      ? "✕ Remove from Selection"
                      : "+ Add to Selection"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionVerify;
