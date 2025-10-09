import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";
import '../styles/checkout.css'; // Import the custom styles

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
        // This endpoint would typically fetch the cart content and user details for checkout
        const res = await axios.post(`http://localhost:3030/orders/confirm/${userId}`);
        setUser(res.data.user);
        setItems(res.data.items);
        setTotalAmount(res.data.totalAmount);
      } catch (err) {
        console.error("Failed to load checkout data:", err);
        setStatus("Failed to load order details. Please try again.");
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
          medicineId: item.medicineId, // Assuming item.medicineId contains the ID
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount
      };

      await axios.post("http://localhost:3030/orders/place", orderPayload);
      setStatus("Order placed successfully! You will receive a confirmation shortly.");
      // Optionally clear cart or redirect to order confirmation page
      // navigate("/order-confirmation");
    } catch (err) {
      console.error("Order placement failed:", err);
      setStatus("Failed to place order. Please check your details and try again.");
    }
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}> {/* This inline style is mostly overridden by CSS */}
      <Nav />
      <div className="container py-5">
        <h2 className="mb-4 fw-bold" style={{ color: "#1b1f3b" }}> {/* This inline style is mostly overridden by CSS */}
          Checkout
        </h2>

        {items.length === 0 ? (
          <p className="text-center text-muted mt-4">Loading order details...</p>
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

            {/* Important Checkout Information Section */}
            <div style={{
              backgroundColor: "#E6FFFA", // Light teal background
              borderLeft: "5px solid #38B2AC", // Teal left border
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "30px",
              color: "#2D3748",
              fontSize: "0.95rem",
              lineHeight: "1.6",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
            }}>
              <h5 style={{
                color: "#2C7A7B", // Darker teal heading
                fontWeight: "bold",
                marginBottom: "10px",
                fontSize: "1.1rem"
              }}>Important Checkout Information</h5>
              <ul style={{ paddingLeft: "20px", margin: "0", listStyleType: "disc" }}>
                <li style={{ marginBottom: "5px" }}>Double-check your order summary for accuracy.</li>
                <li style={{ marginBottom: "5px" }}>Ensure your delivery address is complete and correct.</li>
                <li style={{ marginBottom: "5px" }}>Provide a reachable phone number for delivery updates.</li>
                <li>Once confirmed, orders cannot be easily modified or cancelled.</li>
              </ul>
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
                style={{ background: "#2563EB", color: "#fff", borderRadius: "8px" }} // This inline style is mostly overridden by CSS
              >
                Confirm & Place Order
              </button>
              {status && (
                <p
                  className="mt-3 text-center fw-semibold"
                  style={{ color: status.includes("successfully") ? "#16a34a" : "#e53e3e" }} // Dynamic status color
                >
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
