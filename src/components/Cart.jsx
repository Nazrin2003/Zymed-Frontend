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
    await updateQuantity(medicineId, 0); // quantity 0 removes item
  };

  const getTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, item) => sum + item.medicineId.price * item.quantity, 0);
  };

  const handleConfirm = async () => {
    try {
      await axios.post(`http://localhost:3030/orders/confirm/${userId}`);
      navigate("/checkout"); // redirect to form page
    } catch (err) {
      console.error(err);
      alert("Failed to confirm order.");
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <Nav />
      <div className="container py-5">
        <h2 className="text-center text-success mb-4">My Cart</h2>

        {loading ? (
          <p className="text-center">Loading cart...</p>
        ) : !cart || cart.items.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover bg-white">
              <thead className="table-success">
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
                  <tr key={index}>
                    <td>{item.medicineId.name}</td>
                    <td>₹{item.medicineId.price}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary me-1"
                        onClick={() => updateQuantity(item.medicineId._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}>−</button>
                      {item.quantity}
                      <button className="btn btn-sm btn-outline-secondary ms-1"
                        onClick={() => updateQuantity(item.medicineId._id, item.quantity + 1)}>+</button>
                    </td>
                    <td>{item.medicineId.category}</td>
                    <td>{item.medicineId.manufacturer}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteItem(item.medicineId._id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-end mt-3">
              <h5>Total: ₹{getTotal()}</h5>
              <button className="btn btn-primary mt-2" onClick={handleConfirm}>
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
