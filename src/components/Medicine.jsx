import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3030/medicines")
      .then(res => setMedicines(res.data))
      .catch(err => console.error(err));
  }, []);

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
                  <button className="btn btn-outline-success w-100 mb-2">Add to Cart</button>
                  <button className="btn btn-outline-info w-100">Subscribe</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Medicine;
