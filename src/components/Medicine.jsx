import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3030/medicines")
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

  return (
    <div className="bg-light min-vh-100">
      <Nav />
      <div className="container py-5">
        <h2 className="text-center text-success mb-4">Browse Medicines</h2>
        <div className="row g-4">
          {medicines.map((med) => (
            <div key={med._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm p-3">
                <div className="card-body">
                  <h5 className="card-title text-dark">{med.name}</h5>
                  <p className="card-text">₹{med.price}</p>
                  <p className="card-text">Qty: {med.quantity}</p>
                  <p className="card-text">{med.manufacturer}</p>
                  <p className="card-text text-muted">Category: {med.category}</p>
                  {med.prescriptionRequired ? (
                    <button
                      className="btn btn-outline-warning w-100"
                      onClick={() => window.location.href = "/prescriptions"}
                    >
                      Upload Prescription
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-success w-100 mb-2"
                        onClick={() => handleAddToCart(med._id)}
                      >
                        Add to Cart
                      </button>

                      <button className="btn btn-outline-info w-100">Subscribe</button>
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
  );
};

export default Medicine;
