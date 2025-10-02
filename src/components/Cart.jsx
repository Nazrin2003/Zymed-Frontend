import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

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

  const handleQuantityChange = async (medicineId, quantity) => {
    try {
      await axios.put(`http://localhost:3030/cart/${userId}`, {
        medicineId,
        quantity
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const handleRemoveItem = async (medicineId) => {
    try {
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
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <Nav />
      <div className="container py-5">
        <h2 className="mb-4 fw-bold" style={{ color: "#1b1f3b" }}>
          Your Cart
        </h2>

        {loading ? (
          <p>Loading cart...</p>
        ) : !cart?.items?.length ? (
          <p style={{ color: "#444" }}>Your cart is empty.</p>
        ) : (
          <div className="table-responsive shadow-sm rounded">
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
                            style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
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
                      <td style={{ color: "#1b1f3b", fontWeight: "500" }}>
                        {med?.name || "Unknown"}
                      </td>
                      <td style={{ color: "#444" }}>₹{med?.price || "—"}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(med?._id, parseInt(e.target.value))
                          }
                          style={{
                            width: "60px",
                            padding: "5px",
                            borderRadius: "6px",
                            border: "1px solid #ccc"
                          }}
                        />
                      </td>
                      <td style={{ color: "#444" }}>
                        ₹{(med?.price || 0) * item.quantity}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveItem(med?._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-end fw-bold" style={{ color: "#1b1f3b" }}>
                    Total:
                  </td>
                  <td className="fw-bold" style={{ color: "#1b1f3b" }}>
                    ₹{calculateTotal()}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
