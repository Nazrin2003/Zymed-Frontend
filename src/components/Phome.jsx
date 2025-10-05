import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "./NavBar"; // adjust path if needed


const Phome = () => {
    const [medicines, setMedicines] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        expiryDate: "",
        manufacturer: "",
        prescriptionRequired: false,
        image: null
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

    const fetchPrescriptions = async () => {
        try {
            const res = await axios.get("http://localhost:3030/prescriptions");
            setPrescriptions(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMedicines();
        fetchPrescriptions();
        fetchPendingOrders();
    }, []);

    const [pendingOrders, setPendingOrders] = useState(0);

    const fetchPendingOrders = async () => {
        try {
            const res = await axios.get("http://localhost:3030/orders/pending/count");
            setPendingOrders(res.data.count);
        } catch (err) {
            console.error("Failed to fetch pending orders:", err);
        }
    };


    const handleAddOrUpdate = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (let key in formData) {
            form.append(key, formData[key]);
        }

        const url = editId
            ? `http://localhost:3030/medicines/${editId}`
            : "http://localhost:3030/medicines";

        const method = editId ? "put" : "post";

        await axios[method](url, form, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        alert(editId ? "Medicine updated" : "Medicine added");
        fetchMedicines();
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
            manufacturer: "",
            prescriptionRequired: false,
            image: null
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
            manufacturer: med.manufacturer,
            prescriptionRequired: med.prescriptionRequired,
            image: null
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
    const pendingPrescriptions = prescriptions.filter(p => p.status === "pending");

    // Layout styles
    const layout = {
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#f3f4f6"
    };

    const sidebar = {
        width: "240px",
        backgroundColor: "#1f2937",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 0"
    };

    const sidebarItem = {
        padding: "12px 24px",
        color: "#d1d5db",
        fontWeight: "500",
        textDecoration: "none",
        display: "block",
        transition: "0.3s"
    };

    const content = {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    };

    const navbar = {
        background: "#fff",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    };

    const statsContainer = {
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
        marginTop: "20px"
    };

    const statBox = {
        flex: 1,
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        fontWeight: "600",
        textAlign: "center"
    };

    return (
        <div style={{ background: "#f8f9fa", minHeight: "100vh", display: "flex" }}>
            {/* Sidebar */}
            <NavBar />
            <div style={sidebar}>
                <div>
                    <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "30px" }}>Zymed</h2>
                    <Link to="/phome" style={sidebarItem}>📊 Dashboard</Link>
                    <Link to="/porder" style={sidebarItem}>📦 Manage Orders</Link>
                    <Link to="/pprescription" style={sidebarItem}>💊 Prescription Requests</Link>
                    <Link to="notification" style={sidebarItem}>🔔 Notifications</Link>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        margin: "20px",
                        padding: "10px",
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            </div>


            {/* Main Content */}
            <div style={content}>
                {/* Top Navbar */}
                <div style={navbar}>
                    <h2>Pharmacist Dashboard</h2>
                    <input
                        type="text"
                        placeholder="🔍 Search medicines..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: "8px 14px",
                            border: "1px solid #ccc",
                            borderRadius: "20px",
                            width: "250px",
                            outline: "none"
                        }}
                    />
                </div>

                <div style={{ padding: "24px" }}>
                    {/* Stats */}
                    <div style={statsContainer}>
                        <div style={{ ...statBox, borderTop: "4px solid #16a34a" }}>
                            Medicines: {medicines.length}
                        </div>
                        <div style={{ ...statBox, borderTop: "4px solid #f59e0b" }}>
                            Pending Orders: {pendingOrders}
                        </div>
                        <div style={{ ...statBox, borderTop: "4px solid #dc2626" }}>
                            Pending Prescriptions: {pendingPrescriptions.length}
                        </div>
                    </div>

                    {/* Medicine Form */}
                    <div className="card shadow-sm p-4 mb-4">
                        <h3 className="mb-3">Medicine Entry Form</h3>
                        <form className="row g-3" onSubmit={handleAddOrUpdate}>
                            <div className="col-md-4">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Category</label>
                                <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Price</label>
                                <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Quantity</label>
                                <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Expiry Date</label>
                                <input type="date" className="form-control" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Manufacturer</label>
                                <input type="text" className="form-control" name="manufacturer" value={formData.manufacturer} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Requires Prescription</label>
                                <select
                                    className="form-select"
                                    name="prescriptionRequired"
                                    value={formData.prescriptionRequired}
                                    onChange={(e) =>
                                        setFormData({ ...formData, prescriptionRequired: e.target.value === "true" })
                                    }
                                >
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Medicine Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                />


                            </div>
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-success w-100">{editId ? "Update" : "Add"}</button>
                            </div>
                            {editId && (
                                <div className="col-md-4">
                                    <button type="button" className="btn btn-secondary w-100" onClick={handleCancel}>Cancel</button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Medicine Table */}
                    <h3>Medicine Inventory</h3>
                    <div className="table-responsive">
                        <table className="table table-hover bg-white shadow-sm rounded">
                            <thead className="table-light">
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
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
                                    <tr key={med._id} style={{ backgroundColor: isExpired(med.expiryDate) ? "#fee2e2" : "#fff" }}>
                                        <td>
                                            {med.imageUrl ? (
                                                <img src={`http://localhost:3030/${med.imageUrl}`} alt={med.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                                            ) : (
                                                <span>—</span>
                                            )}
                                        </td>
                                        <td>{med.name}</td>
                                        <td>{med.category}</td>
                                        <td>₹{med.price}</td>
                                        <td>{med.quantity}</td>
                                        <td>{new Date(med.expiryDate).toLocaleDateString()}</td>
                                        <td>{med.manufacturer}</td>
                                        <td>
                                            <button onClick={() => handleEdit(med)} className="btn btn-sm btn-primary me-2">Edit</button>
                                            <button onClick={() => handleDelete(med._id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Phome;
