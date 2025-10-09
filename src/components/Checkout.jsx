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
  const [showPayment, setShowPayment] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [payment, setPayment] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

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

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!address || !phone) {
      alert("Please enter address and phone number.");
      return;
    }
    if (address.length < 20) {
      alert("Please enter a complete address with pincode (minimum 20 characters).");
      return;
    }
    if (phone.length < 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setShowPayment(true);
  };

  const placeOrder = async () => {
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
      setStatus("Payment successful! Order placed successfully. You will receive a confirmation shortly.");
    } catch (err) {
      console.error("Order placement failed:", err);
      setStatus("Payment successful, but failed to place order. Please try again.");
    }
  };

  const handleMockPayment = async () => {
    // Accept any payment details and simulate success
    setIsPaying(true);
    setStatus("Processing payment...");
    setTimeout(async () => {
      setIsPaying(false);
      setShowPayment(false);
      setStatus("Payment successful! Placing your order...");
      await placeOrder();
    }, 1200);
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)", minHeight: "100vh" }}>
      <Nav />
      <div className="container py-4" style={{ maxWidth: "900px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#1b1f3b", fontSize: "2rem", marginBottom: "8px" }}>Checkout</h2>
          <p className="text-muted" style={{ fontSize: "0.95rem" }}>Review your order and complete payment</p>
        </div>
        {items.length === 0 ? (
          <p className="text-center text-muted mt-4">Loading order details...</p>
        ) : (
          <>
            <div className="card mb-3 shadow-sm" style={{ borderRadius: "12px", border: "none" }}>
              <div className="card-body" style={{ padding: "24px" }}>
                <h5 className="fw-bold mb-3" style={{ color: "#1b1f3b", fontSize: "1.25rem" }}>Order Summary</h5>
                {items.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2" style={{ padding: "8px 0" }}>
                    <div>
                      <strong style={{ color: "#374151" }}>{item.name}</strong>
                      <span className="text-muted" style={{ fontSize: "0.9rem" }}> × {item.quantity}</span>
                    </div>
                    <div className="fw-semibold" style={{ color: "#1b1f3b" }}>₹{item.price * item.quantity}</div>
                  </div>
                ))}
                <hr style={{ margin: "16px 0", borderTop: "2px solid #e5e7eb" }} />
                <div className="d-flex justify-content-between fw-bold" style={{ fontSize: "1.15rem", color: "#1b1f3b" }}>
                  <div>Total Amount</div>
                  <div style={{ color: "#16a34a" }}>₹{totalAmount}</div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: "#E0F2FE",
              borderLeft: "4px solid #0284c7",
              padding: "16px 20px",
              borderRadius: "10px",
              marginBottom: "20px",
              color: "#0c4a6e",
              fontSize: "0.9rem",
              lineHeight: "1.5"
            }}>
              <h6 style={{
                color: "#0369a1",
                fontWeight: "600",
                marginBottom: "8px",
                fontSize: "1rem"
              }}>📋 Important Information</h6>
              <ul style={{ paddingLeft: "20px", margin: "0", listStyleType: "disc" }}>
                <li style={{ marginBottom: "4px" }}>Double-check your order summary for accuracy</li>
                <li style={{ marginBottom: "4px" }}>Provide a reachable phone number for delivery updates</li>
                <li>Orders cannot be modified after confirmation</li>
              </ul>
            </div>
            <form onSubmit={handleProceedToPayment} className="card shadow-sm" style={{ borderRadius: "12px", border: "none", padding: "28px" }}>
              <h5 className="fw-bold mb-3" style={{ color: "#1b1f3b", fontSize: "1.25rem" }}>Delivery Details</h5>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#374151", fontSize: "0.95rem" }}>Delivery Address *</label>
                <textarea
                  className="form-control"
                  style={{ borderRadius: "8px", padding: "12px", fontSize: "0.95rem", border: "1.5px solid #d1d5db" }}
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your complete address including street, city, state, and pincode (e.g., 123 Main St, Mumbai, Maharashtra - 400001)"
                  required
                  minLength={20}
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ color: "#374151", fontSize: "0.95rem" }}>Phone Number *</label>
                <input
                  type="tel"
                  className="form-control"
                  style={{ borderRadius: "8px", padding: "12px", fontSize: "0.95rem", border: "1.5px solid #d1d5db" }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn fw-semibold w-100"
                style={{ 
                  background: "linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)", 
                  color: "#fff", 
                  borderRadius: "10px",
                  padding: "14px",
                  fontSize: "1.05rem",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                  transition: "all 0.3s ease"
                }}
              >
                🛒 Proceed to Payment
              </button>
              {status && (
                <div
                  className="mt-3 text-center fw-semibold"
                  style={{ 
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: status.includes("success") ? "#dcfce7" : status.includes("Processing") ? "#dbeafe" : "#fee2e2",
                    color: status.includes("success") ? "#16a34a" : status.includes("Processing") ? "#2563EB" : "#dc2626",
                    fontSize: "0.95rem"
                  }}
                >
                  {status}
                </div>
              )}
            </form>

            {showPayment && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1050, backdropFilter: "blur(4px)" }}>
                <div className="card shadow-lg" style={{ width: "100%", maxWidth: 500, borderRadius: "16px", border: "none" }}>
                  <div className="card-body" style={{ padding: "32px" }}>
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div>
                        <h4 className="fw-bold mb-1" style={{ color: "#1b1f3b", fontSize: "1.5rem" }}>🔐 Secure Payment</h4>
                        <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>Complete your order of <strong style={{ color: "#16a34a" }}>₹{totalAmount}</strong></p>
                      </div>
                      <button type="button" className="btn-close" onClick={() => setShowPayment(false)} disabled={isPaying} aria-label="Close"></button>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#374151", fontSize: "0.875rem", marginBottom: "8px" }}>Name on Card</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ padding: "12px 16px", fontSize: "0.95rem", borderRadius: "8px", border: "1.5px solid #d1d5db" }}
                        value={payment.name}
                        onChange={(e) => setPayment({ ...payment, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#374151", fontSize: "0.875rem", marginBottom: "8px" }}>Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ padding: "12px 16px", fontSize: "0.95rem", borderRadius: "8px", letterSpacing: "0.05em", border: "1.5px solid #d1d5db" }}
                        value={payment.cardNumber}
                        onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                      />
                    </div>
                    <div className="row g-3 mb-4">
                      <div className="col-7">
                        <label className="form-label fw-semibold" style={{ color: "#374151", fontSize: "0.875rem", marginBottom: "8px" }}>Expiry Date</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ padding: "12px 16px", fontSize: "0.95rem", borderRadius: "8px", border: "1.5px solid #d1d5db" }}
                          value={payment.expiry}
                          onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div className="col-5">
                        <label className="form-label fw-semibold" style={{ color: "#374151", fontSize: "0.875rem", marginBottom: "8px" }}>CVV</label>
                        <input
                          type="password"
                          className="form-control"
                          style={{ padding: "12px 16px", fontSize: "0.95rem", borderRadius: "8px", border: "1.5px solid #d1d5db" }}
                          value={payment.cvv}
                          onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn w-100 fw-semibold"
                      style={{ 
                        background: isPaying ? "#9CA3AF" : "linear-gradient(135deg, #16a34a 0%, #15803d 100%)", 
                        color: "#fff", 
                        borderRadius: "10px", 
                        padding: "14px",
                        fontSize: "1rem",
                        border: "none",
                        boxShadow: isPaying ? "none" : "0 4px 12px rgba(22, 163, 74, 0.3)",
                        transition: "all 0.3s ease"
                      }}
                      onClick={handleMockPayment}
                      disabled={isPaying}
                    >
                      {isPaying ? (
                        <span>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing Payment...
                        </span>
                      ) : (
                        <span>🔒 Pay ₹{totalAmount}</span>
                      )}
                    </button>
                    <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: "0.75rem" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-shield-check me-1" viewBox="0 0 16 16">
                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                        <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                      Secured by 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
