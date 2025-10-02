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

  const handleFileChange = (e) => setFile(e.target.files[0]);

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

  // fetch prescriptions & also fetch reply if verified
  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3030/prescriptions/user/${userId}`
      );

      const prescriptionsWithReplies = await Promise.all(
        res.data.map(async (p) => {
          if (p.status === "verified") {
            try {
              const replyRes = await axios.get(
                `http://localhost:3030/prescriptions/${p._id}/reply`
              );
              return { ...p, reply: replyRes.data };
            } catch (err) {
              console.error("Reply fetch failed:", err);
              return p;
            }
          }
          return p;
        })
      );

      setPrescriptions(prescriptionsWithReplies);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) fetchPrescriptions();
  }, [userId]);

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
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
        <h1 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Upload Prescription</h1>
        <p style={{ opacity: 0.9 }}>Easily upload, track, and reorder your prescriptions</p>
      </div>


      <div className="container py-5">
        {/* Upload Form */}
        <div className="card shadow-sm border-0 mb-5" style={{ background: "#ffffff" }}>
          <div className="card-body p-4">
            <h4 className="text-dark mb-4" style={{ color: "#1b1f3b" }}>
              Upload New Prescription
            </h4>
            <form onSubmit={handleUpload}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#444" }}>
                  Choose Prescription File
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#444" }}>
                  Additional Notes
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn w-100 fw-semibold"
                style={{
                  background: "#2563EB",
                  color: "#fff",
                  borderRadius: "8px",
                  transition: "0.3s",
                }}
              >
                Upload Prescription
              </button>
            </form>
            {status && (
              <p className="mt-3 text-center fw-semibold" style={{ color: "#16a34a" }}>
                {status}
              </p>
            )}
          </div>
        </div>

        {/* Previous Prescriptions */}
        <h3
          className="mb-3 fw-bold"
          style={{ color: "#1b1f3b", borderBottom: "3px solid #a8e6cf", display: "inline-block" }}
        >
          Your Previous Prescriptions
        </h3>

        {prescriptions.length === 0 ? (
          <p style={{ color: "#444" }}>No prescriptions uploaded yet.</p>
        ) : (
          <div className="table-responsive shadow-sm rounded">
  <table className="table align-middle bg-white border">
    <thead style={{ background: "#a8e6cf" }}>
      <tr>
        <th style={{ width: "10%" }}>File</th>
        <th style={{ width: "15%" }}>Notes</th>
        <th style={{ width: "55%" }}>Status / Medicines</th>
        <th style={{ width: "20%" }}>Uploaded At</th>
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
              style={{ color: "#2563EB", fontWeight: "500", wordBreak: "break-word" }}
            >
              View File
            </a>
          </td>
          <td style={{ color: "#444", wordBreak: "break-word" }}>
            {presc.notes || "—"}
          </td>
          <td>
            <span
              className="badge px-3 py-2"
              style={{
                background:
                  presc.status === "verified"
                    ? "#16a34a"
                    : presc.status === "rejected"
                      ? "#dc2626"
                      : "#f59e0b",
                color: "#fff",
                fontSize: "0.9rem",
                borderRadius: "6px",
              }}
            >
              {presc.status}
            </span>

            {presc.status === "verified" &&
              presc.reply?.medicines?.length > 0 && (
                <div className="mt-3">
                  <div className="row g-3">
                    {presc.reply.medicines.map((m) => (
                      <div key={m.medicineId._id} className="col-md-6 col-lg-4">
                        <div
                          className="card shadow-sm h-100"
                          style={{ border: "1px solid #e5e7eb" }}
                        >
                          <div className="card-body">
                            <h6 className="fw-bold" style={{ color: "#1b1f3b" }}>
                              {m.medicineId.name}
                            </h6>
                            <p className="mb-1" style={{ color: "#444" }}>
                              Price: ₹{m.medicineId.price}
                            </p>
                            <p className="mb-2" style={{ color: "#444" }}>
                              Qty Suggested: {m.quantity}
                            </p>
                            <button
                              className="btn w-100 fw-semibold"
                              style={{
                                background: "#2563EB",
                                color: "#fff",
                                borderRadius: "6px",
                              }}
                              onClick={async () => {
                                await axios.post(
                                  `http://localhost:3030/cart/${userId}`,
                                  {
                                    medicineId: m.medicineId._id,
                                    quantity: 1,
                                  }
                                );
                                alert("Added to cart!");
                              }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </td>
          <td style={{ color: "#444", whiteSpace: "nowrap" }}>
            {new Date(presc.uploadedAt).toLocaleString()}
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

export default Cprescription;
