import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

const Cart = () => {

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;

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

  const getTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, item) => {
      return sum + item.medicineId.price * item.quantity;
    }, 0);
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
          <div className="row g-4">
            {cart.items.map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{item.medicineId.name}</h5>
                    <p className="card-text">Price: ₹{item.medicineId.price}</p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <p className="card-text text-muted">Category: {item.medicineId.category}</p>
                    <p className="card-text">{item.medicineId.manufacturer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total and Confirm Button */}
        {!loading && cart && cart.items.length > 0 && (
          <div className="text-center mt-4">
            <h4>Total: ₹{getTotal()}</h4>
            <button
              className="btn btn-primary mt-2"
              onClick={async () => {
                try {
                  const res = await axios.post(`http://localhost:3030/orders/confirm/${userId}`);
                  alert("Order Confirmed!");
                  setCart(null); // clear cart view
                } catch (err) {
                  console.error(err);
                  alert("Failed to confirm order.");
                }
              }}
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
