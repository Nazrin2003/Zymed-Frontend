import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Medicine = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3030/medicines")
      .then(res => setMedicines(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = async (medicineId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) {
        alert("Please log in to add items to cart.");
        return;
      }

      await axios.post(`http://localhost:3030/cart/${userId}`, {
        medicineId,
        quantity: 1
      });

      alert("Item added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add item to cart.");
    }
  };

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Nav />
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
        <div className="container py-5">
          <h2 style={{ color: "#1b1f3b" }} className="text-center mb-4">
            Browse Medicines
          </h2>

          {/* Search Bar */}
          <div className="d-flex justify-content-center mb-4">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "10px 15px",
                borderRadius: "10px 0 0 10px",
                border: "1px solid #444",
                outline: "none",
                width: "300px",
                fontSize: "14px",
                color: "#1b1f3b"
              }}
            />
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#00769b",
                color: "#ffffff",
                border: "none",
                borderRadius: "0 10px 10px 0",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Search
            </button>
          </div>

          <div className="row g-4">
            {filteredMedicines.map((med) => (
              <div key={med._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer"
                  }}
                  className="h-100"
                >
                  <div style={{ padding: "15px" }}>
                    {/* Medicine Image */}
                    {med.imageUrl ? (
                      <img
                        src={`http://localhost:3030/${med.imageUrl}`}
                        alt={med.name}
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          marginBottom: "10px"
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "160px",
                          backgroundColor: "#e5e7eb",
                          borderRadius: "10px",
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6b7280",
                          fontWeight: "500"
                        }}
                      >
                        No Image
                      </div>
                    )}

                    <h5 style={{ color: "#1b1f3b", fontWeight: 600 }}>{med.name}</h5>
                    <p style={{ color: "#16a34a", fontWeight: 600 }}>₹{med.price}</p>
                    {/* <p style={{ color: "#444" }}>Qty: {med.quantity}</p> */}
                    <p style={{ color: "#444" }}>{med.manufacturer}</p>
                    <p style={{ color: "#6B7280", fontSize: "13px" }}>Category: {med.category}</p>

                    {med.quantity === 0 ? (
  <button
    disabled
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "10px",
      border: "none",
      backgroundColor: "#9ca3af",
      color: "#ffffff",
      fontWeight: "600",
      marginTop: "10px",
      cursor: "not-allowed"
    }}
  >
    Not Available
  </button>
) : med.prescriptionRequired ? (
  <button
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "10px",
      border: "none",
      backgroundColor: "#a8e6cf",
      color: "#1b1f3b",
      fontWeight: "600",
      marginTop: "10px"
    }}
    onClick={() => window.location.href = "/cprescription"}
  >
    Upload Prescription
  </button>
) : (
  <>
    <button
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#047857",
        color: "#ffffff",
        fontWeight: "600",
        marginTop: "10px"
      }}
      onClick={() => handleAddToCart(med._id)}
    >
      Add to Cart
    </button>

    <button
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#2563EB",
        color: "#ffffff",
        fontWeight: "600",
        marginTop: "8px"
      }}
    >
      Subscribe
    </button>
  </>
)}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Medicine;
