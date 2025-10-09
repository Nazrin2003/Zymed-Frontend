import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

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
    const [pendingOrders, setPendingOrders] = useState(0);
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

    const fetchPendingOrders = async () => {
        try {
            const res = await axios.get("http://localhost:3030/orders/pending/count");
            setPendingOrders(res.data.count);
        } catch (err) {
            console.error("Failed to fetch pending orders:", err);
        }
    };

    useEffect(() => {
        fetchMedicines();
        fetchPrescriptions();
        fetchPendingOrders();
    }, []);

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
        handleCancel();
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
        if (!window.confirm("Are you sure you want to delete this medicine?")) return;
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredMedicines = medicines.filter((med) =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isExpired = (date) => new Date(date) < new Date();
    const pendingPrescriptions = prescriptions.filter(p => p.status === "pending");

    return (
        <>
            <style>{`
                .stat-card {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .stat-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
                }
                
                .form-card {
                    background: #fff;
                    border-radius: 16px;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s ease;
                }
                
                .form-card:hover {
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
                }
                
                .table-container {
                    background: #fff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
                }
                
                .medicine-row {
                    transition: all 0.2s ease;
                }
                
                .medicine-row:hover {
                    background: #f8fafc !important;
                    transform: scale(1.01);
                }
                
                .action-btn {
                    transition: all 0.2s ease;
                }
                
                .action-btn:hover {
                    transform: translateY(-2px);
                }
                
                .search-input {
                    transition: all 0.3s ease;
                }
                
                .search-input:focus {
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                    border-color: #3b82f6;
                }
            `}</style>
            
            <div style={{ 
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", 
                minHeight: "100vh", 
                display: "flex" 
            }}>
                <NavBar />

                <div style={{ 
                    marginLeft: "260px", 
                    flex: 1, 
                    padding: "32px",
                    maxWidth: "calc(100vw - 260px)" 
                }}>
                    {/* Top Header */}
                    <div style={{
                        background: "#fff",
                        padding: "24px 32px",
                        borderRadius: "16px",
                        marginBottom: "32px",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <div>
                            <h2 style={{ 
                                margin: 0, 
                                color: "#1e293b",
                                fontSize: "28px",
                                fontWeight: "700"
                            }}>
                                Pharmacist Dashboard
                            </h2>
                            <p style={{ 
                                margin: "4px 0 0 0", 
                                color: "#64748b",
                                fontSize: "14px" 
                            }}>
                                Manage your pharmacy inventory
                            </p>
                        </div>
                        <input
                            type="text"
                            placeholder="🔍 Search medicines..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                            style={{
                                padding: "12px 20px",
                                border: "2px solid #e2e8f0",
                                borderRadius: "12px",
                                width: "300px",
                                outline: "none",
                                fontSize: "14px",
                                fontWeight: "500"
                            }}
                        />
                    </div>

                    {/* Stats Cards */}
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                        gap: "24px", 
                        marginBottom: "32px" 
                    }}>
                        <div className="stat-card" style={{
                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            padding: "28px",
                            borderRadius: "16px",
                            color: "#fff",
                            boxShadow: "0 4px 16px rgba(16, 185, 129, 0.3)"
                        }}>
                            <div style={{ fontSize: "36px", marginBottom: "8px" }}>💊</div>
                            <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "4px" }}>
                                {medicines.length}
                            </div>
                            <div style={{ fontSize: "14px", opacity: 0.9, fontWeight: "500" }}>
                                Total Medicines
                            </div>
                        </div>

                        <div className="stat-card" style={{
                            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                            padding: "28px",
                            borderRadius: "16px",
                            color: "#fff",
                            boxShadow: "0 4px 16px rgba(245, 158, 11, 0.3)"
                        }}>
                            <div style={{ fontSize: "36px", marginBottom: "8px" }}>📦</div>
                            <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "4px" }}>
                                {pendingOrders}
                            </div>
                            <div style={{ fontSize: "14px", opacity: 0.9, fontWeight: "500" }}>
                                Pending Orders
                            </div>
                        </div>

                        <div className="stat-card" style={{
                            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                            padding: "28px",
                            borderRadius: "16px",
                            color: "#fff",
                            boxShadow: "0 4px 16px rgba(239, 68, 68, 0.3)"
                        }}>
                            <div style={{ fontSize: "36px", marginBottom: "8px" }}>📋</div>
                            <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "4px" }}>
                                {pendingPrescriptions.length}
                            </div>
                            <div style={{ fontSize: "14px", opacity: 0.9, fontWeight: "500" }}>
                                Pending Prescriptions
                            </div>
                        </div>
                    </div>

                    {/* Medicine Form */}
                    <div className="form-card" style={{ padding: "32px", marginBottom: "32px" }}>
                        <h3 style={{ 
                            marginBottom: "24px", 
                            color: "#1e293b",
                            fontSize: "22px",
                            fontWeight: "700"
                        }}>
                            {editId ? "✏️ Edit Medicine" : "➕ Add New Medicine"}
                        </h3>
                        <form className="row g-3" onSubmit={handleAddOrUpdate}>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontWeight: "600", color: "#475569" }}>
                                    Medicine Name
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    style={{ borderRadius: "8px", padding: "10px 14px" }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontWeight: "600", color: "#475569" }}>
                                    Category
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleChange}
                                    style={{ borderRadius: "8px", padding: "10px 14px" }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontWeight: "600", color: "#475569" }}>
                                    Price (₹)
                                </label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name="price" 
                                    value={formData.price} 
                                    onChange={handleChange} 
                                    required
                                    style={{ borderRadius: "8px", padding: "10px 14px" }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontWeight: "600", color: "#475569" }}>
                                    Quantity
                                </label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name="quantity" 
                                    value={formData.quantity} 
                                    onChange={handleChange} 
                                    required
                                    style={{ borderRadius: "8px", padding: "10px 14px" }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontWeight: "600", color: "#475569" }}>
                                    Expiry Date
                                </label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    name="expiryDate" 
                                    value={formData.expiryDate} 
                                    onChange={handleChange} 
                                    required
                                    style={{ borderRadius: "8px", padding: "10px 14px" }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontWeight: "600", color: "#475569" }}>
                                    Manufacturer
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="manufacturer" 
                                    value={formData.manufacturer} 
                                    onChange={handleChange}
                                    style={{ borderRadius: "8px", padding: "10px 14px" }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontWeight: "600", color: "#475569" }}>
                                    Requires Prescription
                                </label>
                                <select
                                    className="form-select"
                                    name="prescriptionRequired"
                                    value={formData.prescriptionRequired}
                                    onChange={(e) =>
                                        setFormData({ ...formData, prescriptionRequired: e.target.value === "true" })
                                    }
                                    style={{ borderRadius: "8px", padding: "10px 14px" }}
                                >
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label" style={{ fontWeight: "600", color: "#475569" }}>
                                    Medicine Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                    style={{ borderRadius: "8px", padding: "10px 14px" }}
                                />
                            </div>
                            <div className="col-md-4" style={{ display: "flex", alignItems: "flex-end" }}>
                                <button 
                                    type="submit" 
                                    className="btn w-100"
                                    style={{
                                        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                        color: "#fff",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        fontWeight: "600",
                                        border: "none",
                                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
                                    }}
                                >
                                    {editId ? "Update Medicine" : "Add Medicine"}
                                </button>
                            </div>
                            {editId && (
                                <div className="col-md-4" style={{ display: "flex", alignItems: "flex-end" }}>
                                    <button 
                                        type="button" 
                                        className="btn w-100" 
                                        onClick={handleCancel}
                                        style={{
                                            background: "#64748b",
                                            color: "#fff",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            fontWeight: "600",
                                            border: "none"
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Medicine Table */}
                    <div className="table-container">
                        <div style={{ padding: "24px 32px", borderBottom: "2px solid #e2e8f0" }}>
                            <h3 style={{ 
                                margin: 0, 
                                color: "#1e293b",
                                fontSize: "22px",
                                fontWeight: "700"
                            }}>
                                📦 Medicine Inventory
                            </h3>
                            <p style={{ 
                                margin: "4px 0 0 0", 
                                color: "#64748b",
                                fontSize: "14px" 
                            }}>
                                {filteredMedicines.length} medicines found
                            </p>
                        </div>
                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                                    <tr>
                                        <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569" }}>Image</th>
                                        <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569" }}>Name</th>
                                        <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569" }}>Category</th>
                                        <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569" }}>Price</th>
                                        <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569" }}>Quantity</th>
                                        <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569" }}>Expiry</th>
                                        <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569" }}>Manufacturer</th>
                                        <th style={{ padding: "16px 24px", fontWeight: "700", color: "#475569" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMedicines.map((med) => (
                                        <tr 
                                            key={med._id} 
                                            className="medicine-row"
                                            style={{ 
                                                backgroundColor: isExpired(med.expiryDate) ? "#fee2e2" : "#fff",
                                                borderBottom: "1px solid #e2e8f0"
                                            }}
                                        >
                                            <td style={{ padding: "16px 24px" }}>
                                                {med.imageUrl ? (
                                                    <img 
                                                        src={`http://localhost:3030/${med.imageUrl}`} 
                                                        alt={med.name} 
                                                        style={{ 
                                                            width: "60px", 
                                                            height: "60px", 
                                                            objectFit: "cover", 
                                                            borderRadius: "8px",
                                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                                        }} 
                                                    />
                                                ) : (
                                                    <div style={{
                                                        width: "60px",
                                                        height: "60px",
                                                        background: "#e2e8f0",
                                                        borderRadius: "8px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "24px"
                                                    }}>
                                                        💊
                                                    </div>
                                                )}
                                            </td>
                                            <td style={{ padding: "16px 24px", fontWeight: "600", color: "#1e293b" }}>
                                                {med.name}
                                            </td>
                                            <td style={{ padding: "16px 24px", color: "#64748b" }}>{med.category}</td>
                                            <td style={{ padding: "16px 24px", fontWeight: "600", color: "#10b981" }}>
                                                ₹{med.price}
                                            </td>
                                            <td style={{ padding: "16px 24px" }}>
                                                <span style={{
                                                    padding: "4px 12px",
                                                    borderRadius: "6px",
                                                    background: med.quantity === 0 ? "#fee2e2" : "#dcfce7",
                                                    color: med.quantity === 0 ? "#dc2626" : "#16a34a",
                                                    fontWeight: "600",
                                                    fontSize: "13px"
                                                }}>
                                                    {med.quantity}
                                                </span>
                                            </td>
                                            <td style={{ padding: "16px 24px", color: "#64748b" }}>
                                                {new Date(med.expiryDate).toLocaleDateString()}
                                            </td>
                                            <td style={{ padding: "16px 24px", color: "#64748b" }}>{med.manufacturer}</td>
                                            <td style={{ padding: "16px 24px" }}>
                                                <button 
                                                    onClick={() => handleEdit(med)} 
                                                    className="btn btn-sm action-btn me-2"
                                                    style={{
                                                        background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                                        color: "#fff",
                                                        border: "none",
                                                        padding: "8px 16px",
                                                        borderRadius: "6px",
                                                        fontWeight: "600",
                                                        fontSize: "13px",
                                                        boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)"
                                                    }}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(med._id)} 
                                                    className="btn btn-sm action-btn"
                                                    style={{
                                                        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                                                        color: "#fff",
                                                        border: "none",
                                                        padding: "8px 16px",
                                                        borderRadius: "6px",
                                                        fontWeight: "600",
                                                        fontSize: "13px",
                                                        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)"
                                                    }}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Phome;