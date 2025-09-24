import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleCancel = () => {
  setEditId(null);
  setFormData({
    name: "",
    category: "",
    price: "",
    quantity: "",
    expiryDate: "",
    manufacturer: ""
  });
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isExpired = (date) => new Date(date) < new Date();

  // Styles
  const layout = {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#f9fafb"
  };

  const sidebar = {
    width: "220px",
    backgroundColor: "#1f2937",
    color: "#fff",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  };

  const navItem = {
    marginBottom: "16px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer"
  };

  const content = {
    flex: 1,
    padding: "32px"
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
    <div style={layout}>
      {/* Sidebar */}
      <div style={sidebar}>
       <div>
  <h2 style={{ marginBottom: "24px", color: "#fff" }}>Zymed</h2>

  <Link to="/phome" style={{ ...navItem, color: "#fff", textDecoration: "none" }}>
    <div style={{ padding: "8px", borderRadius: "6px", transition: "0.2s", cursor: "pointer" }}
         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#374151"}
         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
      Dashboard
    </div>
  </Link>

  <Link to="/orders" style={{ ...navItem, color: "#fff", textDecoration: "none" }}>
    <div style={{ padding: "8px", borderRadius: "6px", transition: "0.2s", cursor: "pointer" }}
         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#374151"}
         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
      Orders
    </div>
  </Link>

  <Link to="/prescriptions" style={{ ...navItem, color: "#fff", textDecoration: "none" }}>
    <div style={{ padding: "8px", borderRadius: "6px", transition: "0.2s", cursor: "pointer" }}
         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#374151"}
         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
      Prescriptions
    </div>
  </Link>
</div>

        <button onClick={handleLogout} style={{ ...buttonStyle, background: "#dc2626", width: "100%" }}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={content}>
        <h1 style={{ marginBottom: "20px" }}>Pharmacist Dashboard</h1>

        {/* Notification Boxes */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div style={boxStyle}>Medicines: {medicines.length}</div>
          <div style={{ ...boxStyle, background: "#f59e0b" }}>Orders: 0</div>
          <div style={{ ...boxStyle, background: "#dc2626" }}>Prescriptions: 0</div>
        </div>

        

        {/* Add/Update Medicine Form */}
   <div className="container-fluid bg-light py-5">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10">
        <div className="card shadow-sm p-4">
          <h3 className="card-title text-center text-success mb-4">Medicine Entry Form</h3>
          <form>
            <div className="row g-4">
              {/* Name */}
              <div className="col-12 col-sm-6 col-md-4">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              {/* Category */}
              <div className="col-12 col-sm-6 col-md-4">
                <label className="form-label">Category</label>
                <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} />
              </div>

              {/* Price */}
              <div className="col-12 col-sm-6 col-md-4">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
              </div>

              {/* Quantity */}
              <div className="col-12 col-sm-6 col-md-4">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleChange} required />
              </div>

              {/* Expiry Date */}
              <div className="col-12 col-sm-6 col-md-4">
                <label className="form-label">Expiry Date</label>
                <input type="date" className="form-control" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
              </div>

              {/* Manufacturer */}
              <div className="col-12 col-sm-6 col-md-4">
                <label className="form-label">Manufacturer</label>
                <input type="text" className="form-control" name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
              </div>

              {/* Buttons */}
              <div className="col-12 col-sm-6 col-md-4">
                <button type="submit" className="btn btn-success w-100" onClick={handleAddOrUpdate}>
                  {editId ? "Update" : "Add"}
                </button>
              </div>
              {editId && (
                <div className="col-12 col-sm-6 col-md-4">
                  <button type="button" className="btn btn-secondary w-100" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>



{/* Search Bar */}
        <input
          type="text"
          placeholder="Search medicine by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ ...inputStyle, width: "300px", marginBottom: "20px" }}
        />

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
              {filteredMedicines.map((med) => (
                <tr key={med._id} style={{ backgroundColor: isExpired(med.expiryDate) ? "#fee2e2" : "#fff", borderBottom: "1px solid #e5e7eb" }}>
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
