import React, { useEffect, useState } from "react";
import axios from "axios";

const Phome = () => {
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    expiryDate: "",
    manufacturer: ""
  });
  const [editId, setEditId] = useState(null);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get("http://localhost:3030/medicines");
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:3030/medicines/${editId}`, formData);
        alert("Medicine updated");
      } else {
        await axios.post("http://localhost:3030/medicines", formData);
        alert("Medicine added");
      }
      setFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        expiryDate: "",
        manufacturer: ""
      });
      setEditId(null);
      fetchMedicines();
    } catch (err) {
      console.error(err);
      alert("Failed to save medicine");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/medicines/${id}`);
      fetchMedicines();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (med) => {
    setFormData({
      name: med.name,
      category: med.category,
      price: med.price,
      quantity: med.quantity,
      expiryDate: med.expiryDate.split("T")[0],
      manufacturer: med.manufacturer
    });
    setEditId(med._id);
  };

  // Styles
  const navStyle = {
    backgroundColor: "#1f2937",
    color: "#fff",
    padding: "16px 24px",
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  };

  const boxStyle = {
    background: "#16a34a",
    color: "#fff",
    padding: "16px",
    borderRadius: "10px",
    width: "180px",
    textAlign: "center",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  };

  const inputStyle = {
    padding: "10px",
    margin: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "200px"
  };

  const buttonStyle = {
    padding: "8px 16px",
    margin: "4px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  };

  const sectionStyle = {
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e5e7eb"
  };

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <div style={navStyle}>Zymed — Pharmacist Dashboard</div>

      <div style={{ padding: "24px", fontFamily: "Inter, sans-serif" }}>
        {/* Notification Boxes */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div style={boxStyle}>Medicines: {medicines.length}</div>
          <div style={{ ...boxStyle, background: "#f59e0b" }}>Orders: 0</div>
          <div style={{ ...boxStyle, background: "#dc2626" }}>Prescriptions: 0</div>
        </div>

        {/* Add/Update Medicine Form */}
        <div style={sectionStyle}>
          <h2>{editId ? "Update Medicine" : "Add Medicine"}</h2>
          <form onSubmit={handleAddOrUpdate}>
            {["name", "category", "price", "quantity", "expiryDate", "manufacturer"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                required={["name", "price", "quantity", "expiryDate"].includes(field)}
                style={inputStyle}
                type={field === "expiryDate" ? "date" : "text"}
              />
            ))}
            <br />
            <button type="submit" style={{ ...buttonStyle, background: editId ? "#f59e0b" : "#16a34a" }}>
              {editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setFormData({ name: "", category: "", price: "", quantity: "", expiryDate: "", manufacturer: "" }); }} style={{ ...buttonStyle, background: "#6b7280" }}>
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Medicine Table */}
        <div style={sectionStyle}>
          <h2>Medicine Inventory</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", overflow: "hidden" }}>
            <thead>
              <tr style={{ background: "#e5e7eb", textAlign: "left" }}>
                <th style={{ padding: "12px" }}>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Expiry</th>
                <th>Manufacturer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr key={med._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px" }}>{med.name}</td>
                  <td>{med.category}</td>
                  <td>₹{med.price}</td>
                  <td>{med.quantity}</td>
                  <td>{new Date(med.expiryDate).toLocaleDateString()}</td>
                  <td>{med.manufacturer}</td>
                  <td>
                    <button onClick={() => handleEdit(med)} style={buttonStyle}>Edit</button>
                    <button onClick={() => handleDelete(med._id)} style={{ ...buttonStyle, background: "#dc2626" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Phome;
