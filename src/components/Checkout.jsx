import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully! Payment on delivery.");
    // You can send formData to backend if needed
  };

  return (
    <div className="bg-light min-vh-100">
      <Nav />
      <div className="container py-5">
        <h2 className="text-center text-primary mb-4">Delivery Details</h2>
        <form className="bg-white p-4 shadow-sm rounded" onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }}>
          <div className="mb-3">
            <label>Name</label>
            <input type="text" name="name" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <textarea name="address" className="form-control" required onChange={handleChange}></textarea>
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input type="tel" name="phone" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Additional Notes</label>
            <textarea name="notes" className="form-control" onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="btn btn-success w-100">Place Order</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
