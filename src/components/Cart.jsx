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
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}> {/* This style will be overridden by cart.css */}
      <Nav />
      <div className="container py-5">
        <h2 className="mb-4 fw-bold" style={{ color: "#1b1f3b" }}> {/* This style will be overridden by cart.css */}
          Your Cart
        </h2>

        {loading ? (
          <p>Loading cart...</p>
        ) : !cart?.items?.length ? (
          <p style={{ color: "#444" }}>Your cart is empty.</p> 
        ) : (
          <>
            <div className="table-responsive shadow-sm rounded mb-4">
              <table className="table align-middle bg-white border">
                <thead style={{ background: "#a8e6cf" }}> 
                  <tr>
                    <th>Image</th>
                    <th>Medicine</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => {
                    const med = item.medicineId;
                    return (
                      <tr key={item._id}>
                        <td>
                          {med?.imageUrl ? (
                            <img
                              src={`http://localhost:3030/${med.imageUrl}`}
                              alt={med.name}
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "6px"
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: "#e5e7eb",
                                borderRadius: "6px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#6b7280",
                                fontSize: "12px"
                              }}
                            >
                              No Image
                            </div>
                          )}
                        </td>
                        <td style={{ color: "#1b1f3b", fontWeight: "500" }}> {/* This style will be overridden by cart.css */}
                          {med?.name || "Unknown"}
                        </td>
                        <td style={{ color: "#444" }}>₹{med?.price || "—"}</td> {/* This style will be overridden by cart.css */}
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => updateQuantity(med?._id, item.quantity - 1)}
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => updateQuantity(med?._id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td style={{ color: "#444" }}> {/* This style will be overridden by cart.css */}
                          ₹{(med?.price || 0) * item.quantity}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveItem(med?._id)}
                            title="Remove"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="text-end fw-bold" style={{ color: "#1b1f3b" }}> {/* This style will be overridden by cart.css */}
                      Total:
                    </td>
                    <td className="fw-bold" style={{ color: "#1b1f3b" }}> {/* This style will be overridden by cart.css */}
                      ₹{calculateTotal()}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="text-end">
              <button
                className="btn fw-semibold"
                style={{ background: "#2563EB", color: "#fff", borderRadius: "8px" }} // This style will be overridden by cart.css
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
