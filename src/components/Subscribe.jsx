import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

const Subscribe = () => {
    const { state } = useLocation();
    const medicine = state?.medicine;
    const user = state?.user || JSON.parse(localStorage.getItem("user"));
    const [notifyDate, setNotifyDate] = useState("");
    const [subscriptions, setSubscriptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3030/subscribe", {
                userId: user.id,
                medicineId: medicine._id,
                notifyDate
            });
            alert("Subscription saved!");
            setNotifyDate("");
            fetchSubscriptions();
        } catch (err) {
            console.error(err);
            alert("Failed to subscribe.");
        }
    };

    const fetchSubscriptions = async () => {
        try {
            const res = await axios.get(`http://localhost:3030/subscriptions/${user.id}`);
            setSubscriptions(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user?.id) fetchSubscriptions();
    }, []);

    return (
        <div>
            <Nav />

            {/* Page Header */}
            <div
                style={{
                    backgroundImage: `linear-gradient(rgb(50 38 120 / 50%), rgb(48 91 57 / 50%)), url('https://images.unsplash.com/photo-1696861286643-341a8d7a79e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "130px 0px",
                    textAlign: "center",
                    color: "white",
                }}
            >
                <h1 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Medicine Subscriptions</h1>
                <p style={{ opacity: 0.9 }}>Set refill reminders and stay on track with your medications</p>
            </div>

            <div style={{ padding: "40px", fontFamily: "Poppins, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>

                {/* Medicine Section */}
                {medicine ? (
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
                        <div style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                            padding: "20px",
                            display: "flex",
                            gap: "20px",
                            maxWidth: "700px", // 👈 controls width
                            width: "100%",
                            alignItems: "flex-start"
                        }}>
                            {/* Left: Image */}
                            <div style={{ flex: 1 }}>
                                <img
                                    src={`http://localhost:3030/${medicine.imageUrl}`}
                                    alt={medicine.name}
                                    style={{
                                        width: "100%",
                                        height: "260px",
                                        objectFit: "cover",
                                        borderRadius: "10px"
                                    }}
                                />
                            </div>

                            {/* Right: Details + Form */}
                            <div style={{ flex: 1 }}>
                                <h2 style={{ color: "#1b1f3b", marginBottom: "8px", fontSize: "22px", textAlign: "left" }}>{medicine.name}</h2>
                                <p style={{ fontSize: "14px", color: "#374151", marginBottom: "6px" }}><strong>Price:</strong> ₹{medicine.price}</p>
                                <p style={{ fontSize: "14px", color: "#374151", marginBottom: "6px" }}><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
                                <p style={{ fontSize: "14px", color: "#374151", marginBottom: "16px" }}><strong>Category:</strong> {medicine.category}</p>

                                <form onSubmit={handleSubmit}>
                                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#1b1f3b", fontSize: "14px" }}>
                                        Select Refill Reminder Date:
                                    </label>
                                    <input
                                        type="date"
                                        value={notifyDate}
                                        onChange={(e) => setNotifyDate(e.target.value)}
                                        required
                                        style={{
                                            padding: "8px",
                                            borderRadius: "6px",
                                            border: "1px solid #ccc",
                                            marginBottom: "16px",
                                            width: "100%",
                                            fontSize: "13px"
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            padding: "8px 16px",
                                            backgroundColor: "#00769b",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            fontWeight: "600",
                                            fontSize: "14px"
                                        }}
                                    >
                                        Confirm Subscription
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (


                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <h2 style={{ color: "#1b1f3b" }}>Welcome to Subscriptions</h2>
                        <p style={{ color: "#4b5563", fontSize: "15px" }}>
                            You haven't selected a medicine. Browse medicines to subscribe or view your previous subscriptions below.
                        </p>
                    </div>
                )}

                {/* How Subscription Works */}
                <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    padding: "25px",
                    marginBottom: "40px"
                }}>
                    <h3 style={{ color: "#00769b", marginBottom: "10px" }}>🧠 How Subscription Works</h3>
                    <ul style={{ color: "#374151", fontSize: "15px", lineHeight: "1.8", paddingLeft: "20px" }}>
                        <li>Select a medicine and choose a refill reminder date.</li>
                        <li>We'll send you an email alert on that date so you never run out.</li>
                        <li>You can view all your subscriptions below and manage them anytime.</li>
                        <li>Want to subscribe again? Just revisit the medicine and set a new date.</li>
                    </ul>
                </div>

                {/* Subscription Table */}
                <h3 style={{ marginBottom: "20px", color: "#1b1f3b" }}>📋 Your Previous Subscriptions</h3>
                {subscriptions.length === 0 ? (
                    <p style={{ color: "#6b7280" }}>No subscriptions found.</p>
                ) : (
                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        overflow: "hidden"
                    }}>
                        <thead>
                            <tr style={{ backgroundColor: "#00769b", color: "#fff" }}>
                                <th style={{ padding: "12px", fontWeight: "600" }}>Medicine</th>
                                <th style={{ padding: "12px", fontWeight: "600" }}>Notify Date</th>
                                <th style={{ padding: "12px", fontWeight: "600" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((sub) => {
                                const today = new Date().toISOString().split("T")[0];
                                const status = new Date(sub.notifyDate).toISOString().split("T")[0] === today ? "Due Today" : "Scheduled";

                                return (
                                    <tr key={sub._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                                        <td style={{ padding: "12px", color: "#374151" }}>{sub.medicineId?.name || "Unknown"}</td>
                                        <td style={{ padding: "12px", color: "#374151" }}>{new Date(sub.notifyDate).toLocaleDateString()}</td>
                                        <td style={{ padding: "12px" }}>
                                            <span style={{
                                                padding: "6px 10px",
                                                borderRadius: "6px",
                                                fontSize: "13px",
                                                fontWeight: "bold",
                                                color: "#fff",
                                                backgroundColor: status === "Due Today" ? "#dc2626" : "#16a34a"
                                            }}>
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Subscribe;
