import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PrescriptionVerify = () => {
  const { id } = useParams(); // prescriptionId
  const [medicines, setMedicines] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const pharmacist = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("http://localhost:3030/medicines").then((res) => setMedicines(res.data));
  }, []);

  const toggleSelect = (medicine) => {
  if (selected.find((m) => m.medicineId === medicine._id)) {
    setSelected(selected.filter((m) => m.medicineId !== medicine._id));
  } else {
    setSelected([
      ...selected,
      {
        medicineId: medicine._id,
        price: medicine.price,
        quantity: 1
      }
    ]);
  }
};


  const handleConfirm = async () => {
    try {
      await axios.post(`http://localhost:3030/prescriptions/forward/${id}`, {
        pharmacistId: pharmacist.id,
        medicines: selected,
        message: "Selected medicines for this prescription",
      });
      alert("✅ Prescription forwarded to customer!");
      navigate("/pprescription");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to forward prescription");
    }
  };

  // filter medicines based on search
  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "40px", fontFamily: "Inter, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      {/* Header with Search + Confirm Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ fontWeight: "600", color: "#111827" }}>Select Medicines for Prescription</h2>
        <div style={{ display: "flex", gap: "15px" }}>
          <input
            type="text"
            placeholder="🔍 Search medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px 15px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              width: "250px",
              outline: "none",
            }}
          />
          <button
            onClick={handleConfirm}
            disabled={selected.length === 0}
            style={{
              backgroundColor: selected.length === 0 ? "#9ca3af" : "#16a34a",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: selected.length === 0 ? "not-allowed" : "pointer",
              fontWeight: "500",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
             Confirm & Send
          </button>
        </div>
      </div>

      {/* Medicines Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredMedicines.length === 0 ? (
          <p>No medicines found.</p>
        ) : (
          filteredMedicines.map((med) => {
            const isSelected = selected.find((m) => m.medicineId === med._id);
            return (
              <div
                key={med._id}
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  border: isSelected ? "2px solid #16a34a" : "1px solid #e5e7eb",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onClick={() => toggleSelect(med)}
              >
                <h4 style={{ fontSize: "18px", marginBottom: "10px", color: "#111827" }}>{med.name}</h4>
                <p style={{ color: "#6b7280", marginBottom: "8px" }}> Price: ₹{med.price}</p>
                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: isSelected ? "#dc2626" : "#2563eb",
                    color: "#fff",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  {isSelected ? "Remove" : "Select"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PrescriptionVerify;