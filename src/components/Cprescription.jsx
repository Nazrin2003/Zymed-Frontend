import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

const Cprescription = () => {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !userId) {
      alert("Please select a file and make sure you're logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("notes", notes);

    try {
      await axios.post(
        `http://localhost:3030/prescriptions/upload/${userId}`,
        formData
      );
      setStatus("Prescription uploaded successfully!");
      setFile(null);
      setNotes("");
      fetchPrescriptions();
    } catch (err) {
      console.error(err);
      setStatus("Upload failed. Please try again.");
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3030/prescriptions/user/${userId}`
      );
      setPrescriptions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) fetchPrescriptions();
  }, [userId]);

  return (
    <div className="bg-light min-vh-100">
      <Nav />
      <div className="container py-5">
        <h2 className="text-center text-primary mb-4">Upload Prescription</h2>

        {/* Upload Form */}
        <form
          className="bg-white p-4 shadow-sm rounded mb-5"
          onSubmit={handleUpload}
        >
          <div className="mb-3">
            <label className="form-label">Choose Prescription File</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Additional Notes</label>
            <textarea
              className="form-control"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Upload Prescription
          </button>
        </form>
        {status && <p className="text-center text-info">{status}</p>}

        {/* Previous Prescriptions Table */}
        <h4 className="mb-3">Your Previous Prescriptions</h4>
        {prescriptions.length === 0 ? (
          <p>No prescriptions uploaded yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered bg-white">
              <thead className="table-light">
                <tr>
                  <th>File</th>
                  <th>Notes</th>
                  <th>Status / Medicines</th>
                  <th>Uploaded At</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((presc) => (
                  <tr key={presc._id}>
                    <td>
                      <a
                        href={`http://localhost:3030/${presc.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View File
                      </a>
                    </td>
                    <td>{presc.notes || "—"}</td>

                    {/* ✅ Enhanced Status & Medicine Section */}
                    <td>
                      <span
                        className={`badge bg-${
                          presc.status === "verified"
                            ? "success"
                            : presc.status === "rejected"
                            ? "danger"
                            : "warning"
                        }`}
                      >
                        {presc.status}
                      </span>

                      {/* Show medicines only if verified */}
                      {presc.status === "verified" && (
                        <div className="mt-2">
                          <button
                            className="btn btn-sm btn-info"
                            onClick={async () => {
                              const res = await axios.get(
                                `http://localhost:3030/prescriptions/${presc._id}/reply`
                              );
                              if (res.data?.medicines) {
                                setPrescriptions((prev) =>
                                  prev.map((p) =>
                                    p._id === presc._id
                                      ? { ...p, reply: res.data }
                                      : p
                                  )
                                );
                              }
                            }}
                          >
                            View Medicines
                          </button>

                          {presc.reply?.medicines?.map((m) => (
                            <div
                              key={m.medicineId._id}
                              className="d-flex justify-content-between align-items-center mt-2"
                            >
                              <span>
                                {m.medicineId.name} - ₹{m.medicineId.price}
                              </span>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={async () => {
                                  await axios.post(
                                    `http://localhost:3030/cart/${userId}`,
                                    { medicineId: m.medicineId._id, quantity: 1 }
                                  );
                                  alert("Added to cart!");
                                }}
                              >
                                Add to Cart
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>

                    <td>{new Date(presc.uploadedAt).toLocaleString()}</td>
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

export default Cprescription;
