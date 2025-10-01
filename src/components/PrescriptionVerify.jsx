import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PrescriptionVerify = () => {
  const { id } = useParams(); // prescriptionId
  const [medicines, setMedicines] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const pharmacist = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("http://localhost:3030/medicines").then(res => setMedicines(res.data));
  }, []);

  const toggleSelect = (medicine) => {
    if (selected.find(m => m.medicineId === medicine._id)) {
      setSelected(selected.filter(m => m.medicineId !== medicine._id));
    } else {
      setSelected([...selected, { medicineId: medicine._id, quantity: 1 }]);
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post(`http://localhost:3030/prescriptions/forward/${id}`, {
        pharmacistId: pharmacist.id,
        medicines: selected,
        message: "Selected medicines for this prescription"
      });
      alert("Prescription forwarded to customer!");
      navigate("/pprescription");
    } catch (err) {
      console.error(err);
      alert("Failed to forward prescription");
    }
  };

  return (
    <div className="container py-5">
      <h2>Select Medicines for Prescription</h2>
      <div className="row">
        {medicines.map(med => (
          <div key={med._id} className="col-md-4 mb-3">
            <div className={`card p-3 shadow-sm ${selected.find(m => m.medicineId === med._id) ? "border-success" : ""}`}>
              <h5>{med.name}</h5>
              <p>Price: ₹{med.price}</p>
              <button
                className={`btn ${selected.find(m => m.medicineId === med._id) ? "btn-danger" : "btn-primary"}`}
                onClick={() => toggleSelect(med)}
              >
                {selected.find(m => m.medicineId === med._id) ? "Remove" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-success mt-3" onClick={handleConfirm} disabled={selected.length === 0}>
        Confirm & Send to Customer
      </button>
    </div>
  );
};

export default PrescriptionVerify;
