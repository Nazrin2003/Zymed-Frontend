import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:3030/cart/${userId}`)
      .then(res => {
        setCart(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  const updateQuantity = async (medicineId, quantity) => {
    try {
      await axios.put(`http://localhost:3030/cart/${userId}`, { medicineId, quantity });
      const res = await axios.get(`http://localhost:3030/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (medicineId) => {
    await updateQuantity(medicineId, 0);
  };

  const getTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, item) => sum + item.medicineId.price * item.quantity, 0);
  };

  const handleConfirm = async () => {
    try {
      await axios.post(`http://localhost:3030/orders/confirm/${userId}`);
      navigate("/checkout");
    } catch (err) {
      console.error(err);
      alert("Failed to confirm order.");
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <Nav />
      <div className="container py-5">
        <h2 style={{ color: "#1b1f3b" }} className="text-center mb-4">My Cart</h2>

        {loading ? (
          <p className="text-center" style={{ color: "#444" }}>Loading cart...</p>
        ) : !cart || cart.items.length === 0 ? (
          <p className="text-center" style={{ color: "#444" }}>Your cart is empty.</p>
        ) : (
          <div className="table-responsive shadow-sm" style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "20px" }}>
            <table className="table align-middle">
              <thead style={{ backgroundColor: "#a8e6cf", color: "#1b1f3b", fontWeight: "600" }}>
                <tr>
                  <th>Medicine</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Manufacturer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ color: "#1b1f3b", fontWeight: "500" }}>{item.medicineId.name}</td>
                    <td style={{ color: "#16a34a", fontWeight: "600" }}>₹{item.medicineId.price}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <button
                          style={{
                            backgroundColor: "#f0f0f0",
                            border: "none",
                            borderRadius: "5px",
                            width: "28px",
                            height: "28px",
                            cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                            color: "#1b1f3b"
                          }}
                          onClick={() => updateQuantity(item.medicineId._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span style={{ minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                        <button
                          style={{
                            backgroundColor: "#f0f0f0",
                            border: "none",
                            borderRadius: "5px",
                            width: "28px",
                            height: "28px",
                            cursor: "pointer",
                            color: "#1b1f3b"
                          }}
                          onClick={() => updateQuantity(item.medicineId._id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td style={{ color: "#444" }}>{item.medicineId.category}</td>
                    <td style={{ color: "#444" }}>{item.medicineId.manufacturer}</td>
                    <td>
                      <button
  style={{
    backgroundColor: "#ff6b6b",
    border: "none",
    borderRadius: "6px",
    padding: "5px 10px",
    color: "#fff",
    cursor: "pointer"
  }}
  onClick={() => deleteItem(item.medicineId._id)}
>
  <i className="fas fa-trash"></i>
</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <h5 style={{ color: "#1b1f3b" }}>Total: <span style={{ color: "#16a34a" }}>₹{getTotal()}</span></h5>
              <button
                style={{
                  marginTop: "10px",
                  backgroundColor: "#2563EB",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
                onClick={handleConfirm}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
