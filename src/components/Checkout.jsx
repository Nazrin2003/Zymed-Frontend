import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

const Checkout = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const localUser = JSON.parse(localStorage.getItem("user"));
  const userId = localUser?.id;

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const res = await axios.post(`http://localhost:3030/orders/confirm/${userId}`);
        setUser(res.data.user);
        setItems(res.data.items);
        setTotalAmount(res.data.totalAmount);
      } catch (err) {
        console.error("Failed to load checkout data:", err);
      }
    };

    if (userId) fetchCheckoutData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !phone) {
      alert("Please enter address and phone number.");
      return;
    }

    try {
      const orderPayload = {
        userId,
        username: user?.name || "Unknown",
        address,
        phone,
        items: items.map((item) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount
      };

      await axios.post("http://localhost:3030/orders/place", orderPayload);
      setStatus("Order placed successfully!");
    } catch (err) {
      console.error("Order placement failed:", err);
      setStatus("Failed to place order. Try again.");
    }
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <Nav />
      <div className="container py-5">
        <h2 className="mb-4 fw-bold" style={{ color: "#1b1f3b" }}>
          Checkout
        </h2>

        {items.length === 0 ? (
          <p>Loading order details...</p>
        ) : (
          <>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Order Summary</h5>
                {items.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between mb-2">
                    <div>
                      <strong>{item.name}</strong> × {item.quantity}
                    </div>
                    <div>₹{item.price * item.quantity}</div>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <div>Total Amount</div>
                  <div>₹{totalAmount}</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="card shadow-sm p-4">
              <h5 className="fw-bold mb-3">Delivery Details</h5>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn fw-semibold w-100"
                style={{ background: "#2563EB", color: "#fff", borderRadius: "8px" }}
              >
                Confirm & Place Order
              </button>
              {status && (
                <p className="mt-3 text-center fw-semibold" style={{ color: "#16a34a" }}>
                  {status}
                </p>
              )}
            </form>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
