import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import '../styles/cart.css'; // Import the custom styles

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:3030/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (medicineId, newQty) => {
    if (newQty < 1) return; // Prevent quantity from going below 1
    try {
      await axios.put(`http://localhost:3030/cart/${userId}`, {
        medicineId,
        quantity: newQty
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const handleRemoveItem = async (medicineId) => {
    try {
      // Sending quantity: 0 typically signals removal in many APIs
      await axios.put(`http://localhost:3030/cart/${userId}`, {
        medicineId,
        quantity: 0
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const calculateTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => {
      const price = item.medicineId?.price || 0;
      return sum + price * item.quantity;
    }, 0);
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", minHeight: "100vh", margin: 0, padding: 0 }}>
      <Nav />
      
      {/* Hero Header */}
      <div style={{
        backgroundImage: `linear-gradient(135deg, rgb(180 94 152 / 90%) 0%, rgb(20 174 201 / 65%) 100%), url('https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=2070')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "80px 20px",
        textAlign: "center",
        color: "white",
        marginBottom: "40px"
      }}>
        <h1 style={{ 
          fontSize: "2.8rem", 
          fontWeight: "700", 
          marginBottom: "10px",
          textShadow: "2px 4px 8px rgba(0,0,0,0.3)",
          letterSpacing: "-0.5px"
        }}>
          🛒 Shopping Cart
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.95, margin: 0 }}>
          Review your items and proceed to checkout
        </p>
      </div>

      <div className="container py-4" style={{ maxWidth: "1200px" }}>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "3rem", color: "#0ea5e9", marginBottom: "20px" }}>
              <i className="fa-solid fa-spinner fa-spin"></i>
            </div>
            <p style={{ fontSize: "1.1rem", color: "#64748b" }}>Loading your cart...</p>
          </div>
        ) : !cart?.items?.length ? (
          <div style={{
            textAlign: "center",
            padding: "80px 20px",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}>
            <div style={{ fontSize: "5rem", color: "#e5e7eb", marginBottom: "20px" }}>
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <h3 style={{ color: "#1e293b", marginBottom: "12px", fontSize: "1.8rem" }}>Your cart is empty</h3>
            <p style={{ color: "#64748b", marginBottom: "30px", fontSize: "1.05rem" }}>Add some medicines to get started!</p>
            <button
              onClick={() => navigate("/home")}
              style={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: "12px",
                border: "none",
                fontSize: "1.05rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(14, 165, 233, 0.4)",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(14, 165, 233, 0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(14, 165, 233, 0.4)";
              }}
            >
              <i className="fa-solid fa-pills" style={{ marginRight: "8px" }}></i>
              Browse Medicines
            </button>
          </div> 
        ) : (
          <>
            {/* Cart Items */}
            <div className="row g-4 mb-4">
              <div className="col-lg-8">
                <div style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                }}>
                  <div style={{ backgroundColor: "#1B1F3B", padding: "20px" }}>
                    <h4 style={{ color: "#A8E6CF", fontWeight: "700", margin: 0, fontSize: "1.5rem" }}>
                      <i className="fa-solid fa-cart-shopping" style={{ marginRight: "12px" }}></i>
                      Cart Items ({cart.items.length})
                    </h4>
                  </div>

                  <div className="table-responsive">
                    <table className="table align-middle mb-0" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
                      <thead style={{ backgroundColor: "#A8E6CF" }}>
                        <tr>
                          <th style={{ padding: "16px 20px", fontWeight: "700", color: "#1B1F3B", fontSize: "0.95rem", borderBottom: "none" }}>Image</th>
                          <th style={{ padding: "16px 20px", fontWeight: "700", color: "#1B1F3B", fontSize: "0.95rem", borderBottom: "none" }}>Medicine</th>
                          <th style={{ padding: "16px 20px", fontWeight: "700", color: "#1B1F3B", fontSize: "0.95rem", borderBottom: "none" }}>Price</th>
                          <th style={{ padding: "16px 20px", fontWeight: "700", color: "#1B1F3B", fontSize: "0.95rem", borderBottom: "none", textAlign: "center" }}>Quantity</th>
                          <th style={{ padding: "16px 20px", fontWeight: "700", color: "#1B1F3B", fontSize: "0.95rem", borderBottom: "none" }}>Subtotal</th>
                          <th style={{ padding: "16px 20px", fontWeight: "700", color: "#1B1F3B", fontSize: "0.95rem", borderBottom: "none", textAlign: "center" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.items.map((item, index) => {
                          const med = item.medicineId;
                          return (
                            <tr key={item._id} style={{ 
                              backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                              transition: "background-color 0.2s ease"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f9ff"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f8fafc"}>
                              <td style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
                                {med?.imageUrl ? (
                                  <img
                                    src={`http://localhost:3030/${med.imageUrl}`}
                                    alt={med.name}
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      objectFit: "cover",
                                      borderRadius: "10px",
                                      border: "2px solid #e2e8f0"
                                    }}
                                  />
                                ) : (
                                  <div style={{
                                    width: "80px",
                                    height: "80px",
                                    backgroundColor: "#e5e7eb",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#9ca3af"
                                  }}>
                                    <i className="fa-solid fa-image" style={{ fontSize: "1.5rem" }}></i>
                                  </div>
                                )}
                              </td>
                              <td style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
                                <h6 style={{ color: "#1B1F3B", fontWeight: "700", marginBottom: "4px", fontSize: "1.05rem" }}>
                                  {med?.name || "Unknown Medicine"}
                                </h6>
                              </td>
                              <td style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
                                <span style={{ color: "#059669", fontWeight: "700", fontSize: "1.2rem" }}>
                                  ₹{med?.price || 0}
                                </span>
                              </td>
                              <td style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                                  <button
                                    onClick={() => updateQuantity(med?._id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      borderRadius: "6px",
                                      border: "2px solid #A8E6CF",
                                      backgroundColor: item.quantity <= 1 ? "#f1f5f9" : "#ffffff",
                                      color: item.quantity <= 1 ? "#cbd5e1" : "#1B1F3B",
                                      fontSize: "1.1rem",
                                      fontWeight: "700",
                                      cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                                      transition: "all 0.2s ease"
                                    }}
                                    onMouseOver={(e) => {
                                      if (item.quantity > 1) {
                                        e.target.style.backgroundColor = "#A8E6CF";
                                        e.target.style.color = "#1B1F3B";
                                      }
                                    }}
                                    onMouseOut={(e) => {
                                      if (item.quantity > 1) {
                                        e.target.style.backgroundColor = "#ffffff";
                                        e.target.style.color = "#1B1F3B";
                                      }
                                    }}
                                  >
                                    −
                                  </button>
                                  <span style={{ 
                                    minWidth: "35px", 
                                    textAlign: "center", 
                                    fontSize: "1.05rem", 
                                    fontWeight: "700",
                                    color: "#1B1F3B"
                                  }}>
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(med?._id, item.quantity + 1)}
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      borderRadius: "6px",
                                      border: "2px solid #A8E6CF",
                                      backgroundColor: "#ffffff",
                                      color: "#1B1F3B",
                                      fontSize: "1.1rem",
                                      fontWeight: "700",
                                      cursor: "pointer",
                                      transition: "all 0.2s ease"
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.backgroundColor = "#A8E6CF";
                                      e.target.style.color = "#1B1F3B";
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.backgroundColor = "#ffffff";
                                      e.target.style.color = "#1B1F3B";
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
                                <span style={{ color: "#1B1F3B", fontWeight: "700", fontSize: "1.2rem" }}>
                                  ₹{(med?.price || 0) * item.quantity}
                                </span>
                              </td>
                              <td style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>
                                <button
                                  onClick={() => handleRemoveItem(med?._id)}
                                  style={{
                                    width: "38px",
                                    height: "38px",
                                    borderRadius: "8px",
                                    border: "2px solid #fee2e2",
                                    backgroundColor: "#fef2f2",
                                    color: "#dc2626",
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                  }}
                                  onMouseOver={(e) => {
                                    e.target.style.backgroundColor = "#dc2626";
                                    e.target.style.color = "#ffffff";
                                    e.target.style.borderColor = "#dc2626";
                                  }}
                                  onMouseOut={(e) => {
                                    e.target.style.backgroundColor = "#fef2f2";
                                    e.target.style.color = "#dc2626";
                                    e.target.style.borderColor = "#fee2e2";
                                  }}
                                  title="Remove item"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="col-lg-4">
                <div style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  position: "sticky",
                  top: "20px"
                }}>
                  <h4 style={{ color: "#1e293b", fontWeight: "700", marginBottom: "24px", fontSize: "1.5rem" }}>
                    Order Summary
                  </h4>

                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span style={{ color: "#64748b", fontSize: "0.95rem" }}>Items ({cart.items.length})</span>
                      <span style={{ color: "#1e293b", fontWeight: "600" }}>₹{calculateTotal()}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span style={{ color: "#64748b", fontSize: "0.95rem" }}>Delivery</span>
                      <span style={{ color: "#059669", fontWeight: "600" }}>FREE</span>
                    </div>
                    <hr style={{ margin: "16px 0", borderTop: "2px solid #e2e8f0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#1e293b", fontSize: "1.15rem", fontWeight: "700" }}>Total</span>
                      <span style={{ color: "#059669", fontSize: "1.8rem", fontWeight: "700" }}>₹{calculateTotal()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg,rgba(25, 38, 138, 0.98) 0%, #06b6d4 100%)",
                      color: "#fff",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(14, 165, 233, 0.4)",
                      transition: "all 0.3s ease",
                      marginBottom: "16px"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 20px rgba(14, 165, 233, 0.5)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 15px rgba(14, 165, 233, 0.4)";
                    }}
                  >
                    <i className="fa-solid fa-lock" style={{ marginRight: "8px" }}></i>
                    Proceed to Checkout
                  </button>

                  <div style={{
                    backgroundColor: "#f0f9ff",
                    padding: "16px",
                    borderRadius: "10px",
                    borderLeft: "4px solid #0ea5e9"
                  }}>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#0c4a6e", lineHeight: "1.5" }}>
                      <i className="fa-solid fa-shield-halved" style={{ marginRight: "8px", color: "#0ea5e9" }}></i>
                      <strong>Secure Checkout:</strong> Your payment information is protected with industry-standard encryption.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
