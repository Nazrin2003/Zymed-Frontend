import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Medicine = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3030/medicines")
      .then(res => setMedicines(res.data))
      .catch(err => console.error(err));
  }, []);

  // Check if medicine is expired
  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  // Check if medicine is out of stock (quantity = 0 or expired)
  const isOutOfStock = (medicine) => {
    return medicine.quantity === 0 || isExpired(medicine.expiryDate);
  };

  const handleSubscribe = (medicine) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      alert("Please log in to subscribe.");
      return;
    }

    navigate("/subscribe", { state: { medicine, user } });
  };

  const handleAddToCart = async (medicineId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) {
        alert("Please log in to add items to cart.");
        return;
      }

      await axios.post(`http://localhost:3030/cart/${userId}`, {
        medicineId,
        quantity: 1
      });

      alert("Item added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add item to cart.");
    }
  };

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Nav />
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
        
        {/* Hero Header Section */}
        <div style={{
          backgroundImage: `linear-gradient(135deg, rgb(0 14 155 / 48%) 0%, rgb(0 168 204 / 80%) 100%), url('https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}>
          <div className="container">
            <h1 style={{ 
              fontSize: "3rem", 
              fontWeight: "bold", 
              marginBottom: "15px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
              letterSpacing: "1px"
            }}>
              Browse Medicines
            </h1>
            <p style={{ 
              fontSize: "1.2rem", 
              opacity: 0.95,
              maxWidth: "700px",
              margin: "0 auto"
            }}>
              Quality healthcare products at your fingertips
            </p>
          </div>
        </div>

        <div className="container-fluid px-3 px-md-4 py-5" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Search Bar */}
          <div className="d-flex justify-content-center mb-5">
            <div style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: "50px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              overflow: "hidden",
              maxWidth: "600px",
              width: "100%",
              border: "2px solid transparent",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,118,155,0.2)";
              e.currentTarget.style.borderColor = "#00769b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
              e.currentTarget.style.borderColor = "transparent";
            }}>
              <div style={{
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                color: "#00769b",
                fontSize: "1.2rem"
              }}>
                <i className="fa-solid fa-search"></i>
              </div>
              <input
                type="text"
                placeholder="Search for medicines, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  padding: "18px 10px",
                  border: "none",
                  outline: "none",
                  fontSize: "15px",
                  color: "#1b1f3b",
                  backgroundColor: "transparent"
                }}
              />
              <button
                style={{
                  padding: "18px 35px",
                  background: "linear-gradient(135deg, #00769b 0%, #00a8cc 100%)",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "15px",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #005a75 0%, #0096b3 100%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #00769b 0%, #00a8cc 100%)";
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="row mb-5">
            <div className="col-md-4 mb-3">
              <div style={{
                backgroundColor: "#ffffff",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                textAlign: "center",
                border: "2px solid #f0f9ff",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,118,155,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
              }}>
                <div style={{
                  fontSize: "2.5rem",
                  color: "#00769b",
                  marginBottom: "10px"
                }}>
                  <i className="fa-solid fa-pills"></i>
                </div>
                <h3 style={{ color: "#1b1f3b", fontSize: "1.8rem", fontWeight: "700", marginBottom: "5px" }}>
                  {filteredMedicines.length}
                </h3>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "0.95rem" }}>
                  Products Available
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div style={{
                backgroundColor: "#ffffff",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                textAlign: "center",
                border: "2px solid #f0fdf4",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(22,163,74,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
              }}>
                <div style={{
                  fontSize: "2.5rem",
                  color: "#16a34a",
                  marginBottom: "10px"
                }}>
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h3 style={{ color: "#1b1f3b", fontSize: "1.8rem", fontWeight: "700", marginBottom: "5px" }}>
                  100%
                </h3>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "0.95rem" }}>
                  Genuine Products
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div style={{
                backgroundColor: "#ffffff",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                textAlign: "center",
                border: "2px solid #fef3e2",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(245,158,11,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
              }}>
                <div style={{
                  fontSize: "2.5rem",
                  color: "#f59e0b",
                  marginBottom: "10px"
                }}>
                  <i className="fa-solid fa-truck-fast"></i>
                </div>
                <h3 style={{ color: "#1b1f3b", fontSize: "1.8rem", fontWeight: "700", marginBottom: "5px" }}>
                  24-48h
                </h3>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "0.95rem" }}>
                  Fast Delivery
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="row g-4">
            {filteredMedicines.map((med) => (
              <div key={med._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    overflow: "hidden",
                    border: "1px solid #f3f4f6",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,118,155,0.15)";
                    e.currentTarget.style.borderColor = "#00769b";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "#f3f4f6";
                  }}
                >
                  <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Medicine Image */}
                    <div style={{ position: "relative", marginBottom: "18px" }}>
                      {med.imageUrl ? (
                        <img
                          src={`http://localhost:3030/${med.imageUrl}`}
                          alt={med.name}
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            transition: "transform 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "180px",
                            backgroundColor: "#e5e7eb",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#6b7280",
                            fontWeight: "500",
                            fontSize: "14px"
                          }}
                        >
                          <i className="fa-solid fa-image" style={{ fontSize: "2rem", opacity: 0.5 }}></i>
                        </div>
                      )}
                      
                      {/* Stock Badge */}
                      {isOutOfStock(med) && (
                        <div style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: "rgba(220,38,38,0.95)",
                          color: "#fff",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: "700"
                        }}>
                          Out of Stock
                        </div>
                      )}
                      
                      {/* Prescription Badge */}
                      {med.prescriptionRequired && (
                        <div style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "rgba(245,158,11,0.95)",
                          color: "#fff",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                          <i className="fa-solid fa-file-prescription"></i>
                          Rx
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <h5 style={{ 
                        color: "#1b1f3b", 
                        fontWeight: 700, 
                        marginBottom: "8px",
                        fontSize: "1.1rem",
                        lineHeight: "1.3"
                      }}>
                        {med.name}
                      </h5>
                      
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px"
                      }}>
                        <div style={{ 
                          color: "#16a34a", 
                          fontWeight: 700,
                          fontSize: "1.4rem"
                        }}>
                          ₹{med.price}
                        </div>
                      </div>

                      <p style={{ 
                        color: "#6b7280", 
                        marginBottom: "8px",
                        fontSize: "0.9rem"
                      }}>
                        <i className="fa-solid fa-building" style={{ marginRight: "6px", color: "#9ca3af" }}></i>
                        {med.manufacturer}
                      </p>
                      
                      <div style={{
                        display: "inline-block",
                        backgroundColor: "#f0f9ff",
                        color: "#00769b",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        marginBottom: "12px"
                      }}>
                        {med.category}
                      </div>

                      {/* Action Buttons */}
                      <div style={{ marginTop: "auto" }}>
                        {isOutOfStock(med) ? (
                          <button
                            disabled
                            style={{
                              width: "100%",
                              padding: "12px",
                              borderRadius: "10px",
                              border: "none",
                              backgroundColor: "#9ca3af",
                              color: "#ffffff",
                              fontWeight: "600",
                              cursor: "not-allowed",
                              fontSize: "0.95rem"
                            }}
                          >
                            Not Available
                          </button>
                        ) : med.prescriptionRequired ? (
                          <button
                            style={{
                              width: "100%",
                              padding: "12px",
                              borderRadius: "10px",
                              border: "none",
                              background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                              color: "#ffffff",
                              fontWeight: "600",
                              cursor: "pointer",
                              fontSize: "0.95rem",
                              transition: "all 0.3s ease",
                              boxShadow: "0 4px 12px rgba(245,158,11,0.3)"
                            }}
                            onClick={() => window.location.href = "/cprescription"}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-2px)";
                              e.currentTarget.style.boxShadow = "0 6px 16px rgba(245,158,11,0.4)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = "0 4px 12px rgba(245,158,11,0.3)";
                            }}
                          >
                            <i className="fa-solid fa-file-medical" style={{ marginRight: "6px" }}></i>
                            Upload Prescription
                          </button>
                        ) : (
                          <>
                            <button
                              style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "10px",
                                border: "none",
                                background: "linear-gradient(135deg, #047857 0%, #10b981 100%)",
                                color: "#ffffff",
                                fontWeight: "600",
                                cursor: "pointer",
                                marginBottom: "8px",
                                fontSize: "0.95rem",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 12px rgba(4,120,87,0.3)"
                              }}
                              onClick={() => handleAddToCart(med._id)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 6px 16px rgba(4,120,87,0.4)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(4,120,87,0.3)";
                              }}
                            >
                              <i className="fa-solid fa-cart-plus" style={{ marginRight: "6px" }}></i>
                              Add to Cart
                            </button>

                            <button
                              style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "10px",
                                border: "2px solid #2563EB",
                                backgroundColor: "transparent",
                                color: "#2563EB",
                                fontWeight: "600",
                                cursor: "pointer",
                                fontSize: "0.95rem",
                                transition: "all 0.3s ease"
                              }}
                              onClick={() => handleSubscribe(med)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#2563EB";
                                e.currentTarget.style.color = "#ffffff";
                                e.currentTarget.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "#2563EB";
                                e.currentTarget.style.transform = "translateY(0)";
                              }}
                            >
                              <i className="fa-solid fa-bell" style={{ marginRight: "6px" }}></i>
                              Subscribe
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredMedicines.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
            }}>
              <div style={{
                fontSize: "4rem",
                color: "#e5e7eb",
                marginBottom: "20px"
              }}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3 style={{ color: "#1b1f3b", marginBottom: "10px" }}>No medicines found</h3>
              <p style={{ color: "#6b7280" }}>Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Medicine;