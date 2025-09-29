import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

const Pprescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get("http://localhost:3030/prescriptions");
      setPrescriptions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3030/prescriptions/${id}/status`, { status });
      fetchPrescriptions(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <h2 className="text-center text-success mb-4">Pharmacist Dashboard</h2>
        {prescriptions.length === 0 ? (
          <p>No prescriptions uploaded yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered bg-white">
              <thead className="table-success">
                <tr>
                  <th>Customer</th>
                  <th>File</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th>Uploaded At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((presc) => (
                  <tr key={presc._id}>
                    <td>{presc.userId?.name || "Unknown"}</td>
                    <td>
                      <a href={`http://localhost:3030/${presc.fileUrl}`} target="_blank" rel="noopener noreferrer">
                        View File
                      </a>
                    </td>
                    <td>{presc.notes || "—"}</td>
                    <td>
                      <span className={`badge bg-${presc.status === "verified" ? "success" : presc.status === "rejected" ? "danger" : "warning"}`}>
                        {presc.status}
                      </span>
                    </td>
                    <td>{new Date(presc.uploadedAt).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-success me-2"
                        onClick={() => updateStatus(presc._id, "verified")}>Verify</button>
                      <button className="btn btn-sm btn-outline-danger"
                        onClick={() => updateStatus(presc._id, "rejected")}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Pprescription;
