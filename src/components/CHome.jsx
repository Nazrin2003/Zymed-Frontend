import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import "../styles/chome.css";
import Footer from "../components/Footer"; 

const CHome = () => {
  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <Nav />

      {/* Hero Section */}
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src="https://images.pexels.com/photos/4046945/pexels-photo-4046945.jpeg"
                className="d-block w-100 carousel-img"
                alt="Slide 1"
                style={{ 
                  height: "600px", 
                  objectFit: "cover",
                  filter: "brightness(0.7)"
                }}
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center" style={{ 
                top: "50%", 
                transform: "translateY(-50%)",
                textShadow: "2px 2px 8px rgba(0,0,0,0.7)"
              }}>
                <h1 className="carousel-title display-3 fw-bold mb-3" style={{ 
                  fontSize: "3.5rem",
                  letterSpacing: "1px"
                }}>
                  Welcome to Zymed
                </h1>
                <p className="carousel-text fs-4 mb-4" style={{ maxWidth: "700px" }}>
                  Your trusted partner for medicines, prescriptions, and more.
                </p>
                <Link 
                  to="/med" 
                  className="btn btn-lg px-5 py-3"
                  style={{
                    backgroundColor: "#00769b",
                    color: "#fff",
                    borderRadius: "50px",
                    fontWeight: "600",
                    border: "none",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0,118,155,0.3)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,118,155,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,118,155,0.3)";
                  }}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src="https://images.pexels.com/photos/3873147/pexels-photo-3873147.jpeg"
                className="d-block w-100 carousel-img"
                alt="Slide 2"
                style={{ 
                  height: "600px", 
                  objectFit: "cover",
                  filter: "brightness(0.7)"
                }}
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center" style={{ 
                top: "50%", 
                transform: "translateY(-50%)",
                textShadow: "2px 2px 8px rgba(0,0,0,0.7)"
              }}>
                <h1 className="carousel-title display-3 fw-bold mb-3" style={{ 
                  fontSize: "3.5rem",
                  letterSpacing: "1px"
                }}>
                  Easy Ordering
                </h1>
                <p className="carousel-text fs-4 mb-4" style={{ maxWidth: "700px" }}>
                  Order medicines online with just a few clicks.
                </p>
                <Link 
                  to="/med" 
                  className="btn btn-lg px-5 py-3"
                  style={{
                    backgroundColor: "#00769b",
                    color: "#fff",
                    borderRadius: "50px",
                    fontWeight: "600",
                    border: "none",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0,118,155,0.3)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,118,155,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,118,155,0.3)";
                  }}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src="https://images.pexels.com/photos/5699522/pexels-photo-5699522.jpeg"
                className="d-block w-100 carousel-img"
                alt="Slide 3"
                style={{ 
                  height: "600px", 
                  objectFit: "cover",
                  filter: "brightness(0.7)"
                }}
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center" style={{ 
                top: "50%", 
                transform: "translateY(-50%)",
                textShadow: "2px 2px 8px rgba(0,0,0,0.7)"
              }}>
                <h1 className="carousel-title display-3 fw-bold mb-3" style={{ 
                  fontSize: "3.5rem",
                  letterSpacing: "1px"
                }}>
                  Fast Delivery
                </h1>
                <p className="carousel-text fs-4 mb-4" style={{ maxWidth: "700px" }}>
                  We ensure your medicines reach you quickly and safely.
                </p>
                <Link 
                  to="/med" 
                  className="btn btn-lg px-5 py-3"
                  style={{
                    backgroundColor: "#00769b",
                    color: "#fff",
                    borderRadius: "50px",
                    fontWeight: "600",
                    border: "none",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0,118,155,0.3)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,118,155,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,118,155,0.3)";
                  }}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Features Section */}
      <section className="py-5 text-center features-section" style={{ 
        background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
        padding: "80px 0"
      }}>
        <div className="container">
          <div style={{ marginBottom: "50px" }}>
            <h2 className="fw-bold mb-3" style={{ 
              color: "#1b1f3b",
              fontSize: "2.5rem",
              position: "relative",
              display: "inline-block"
            }}>
              Why Choose Us
              <div style={{
                width: "80px",
                height: "4px",
                backgroundColor: "#00769b",
                margin: "10px auto 0",
                borderRadius: "2px"
              }}></div>
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.1rem", marginTop: "15px" }}>
              Trusted by thousands for quality healthcare solutions
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card p-4 h-100 border-0" style={{
                background: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,118,155,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
              }}>
                <div className="feature-icon mb-3" style={{
                  width: "80px",
                  height: "80px",
                  margin: "0 auto",
                  background: "linear-gradient(135deg, #00769b 0%, #00a8cc 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(0,118,155,0.3)"
                }}>
                  <i className="fa-solid fa-capsules"></i>
                </div>
                <h5 style={{ color: "#1b1f3b", fontWeight: "700", marginBottom: "15px", fontSize: "1.3rem" }}>
                  Wide Range
                </h5>
                <p style={{ color: "#6b7280", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  From daily essentials to rare medicines, we've got it all.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 h-100 border-0" style={{
                background: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,118,155,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
              }}>
                <div className="feature-icon mb-3" style={{
                  width: "80px",
                  height: "80px",
                  margin: "0 auto",
                  background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(22,163,74,0.3)"
                }}>
                  <i className="fa-solid fa-truck"></i>
                </div>
                <h5 style={{ color: "#1b1f3b", fontWeight: "700", marginBottom: "15px", fontSize: "1.3rem" }}>
                  Fast Delivery
                </h5>
                <p style={{ color: "#6b7280", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  Get your products delivered quickly and safely to your home.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 h-100 border-0" style={{
                background: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,118,155,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
              }}>
                <div className="feature-icon mb-3" style={{
                  width: "80px",
                  height: "80px",
                  margin: "0 auto",
                  background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(37,99,235,0.3)"
                }}>
                  <i className="fa-solid fa-house-chimney-medical"></i>
                </div>
                <h5 style={{ color: "#1b1f3b", fontWeight: "700", marginBottom: "15px", fontSize: "1.3rem" }}>
                  Trusted Quality
                </h5>
                <p style={{ color: "#6b7280", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  We provide only genuine and high-quality products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medicines Preview Section */}
      <section className="py-5 medicines-section" style={{ padding: "80px 0", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div style={{ marginBottom: "50px", textAlign: "center" }}>
            <h2 className="fw-bold mb-3" style={{ 
              color: "#1b1f3b",
              fontSize: "2.5rem",
              position: "relative",
              display: "inline-block"
            }}>
              Medicine Categories
              <div style={{
                width: "80px",
                height: "4px",
                backgroundColor: "#00769b",
                margin: "10px auto 0",
                borderRadius: "2px"
              }}></div>
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.1rem", marginTop: "15px" }}>
              Browse through our comprehensive range of medicines
            </p>
          </div>
          <div className="row g-4">
            {/* Pain Relief */}
            <div className="col-md-3">
              <div className="card shadow-sm medicine-card border-0" style={{
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src="https://images.pexels.com/photos/3683077/pexels-photo-3683077.jpeg"
                    alt="Pain Relief"
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(0,118,155,0.9)",
                    color: "#fff",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: "600"
                  }}>
                    Popular
                  </div>
                </div>
                <div className="card-body text-center" style={{ padding: "20px" }}>
                  <h5 className="card-title" style={{ color: "#1b1f3b", fontWeight: "700", marginBottom: "10px" }}>
                    Pain Relief
                  </h5>
                  <p className="card-text" style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Paracetamol, Ibuprofen, etc.
                  </p>
                </div>
              </div>
            </div>

            {/* Immunity Boosters */}
            <div className="col-md-3">
              <div className="card shadow-sm medicine-card border-0" style={{
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src="https://images.pexels.com/photos/360622/pexels-photo-360622.jpeg"
                    alt="Immunity Boosters"
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(22,163,74,0.9)",
                    color: "#fff",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: "600"
                  }}>
                    Trending
                  </div>
                </div>
                <div className="card-body text-center" style={{ padding: "20px" }}>
                  <h5 className="card-title" style={{ color: "#1b1f3b", fontWeight: "700", marginBottom: "10px" }}>
                    Immunity Boosters
                  </h5>
                  <p className="card-text" style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Vitamin C, Zinc, etc.
                  </p>
                </div>
              </div>
            </div>

            {/* Antibiotics */}
            <div className="col-md-3">
              <div className="card shadow-sm medicine-card border-0" style={{
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src="https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg"
                    alt="Antibiotics"
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
                <div className="card-body text-center" style={{ padding: "20px" }}>
                  <h5 className="card-title" style={{ color: "#1b1f3b", fontWeight: "700", marginBottom: "10px" }}>
                    Antibiotics
                  </h5>
                  <p className="card-text" style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Amoxicillin, Azithromycin, etc.
                  </p>
                </div>
              </div>
            </div>

            {/* Cough & Cold */}
            <div className="col-md-3">
              <div className="card shadow-sm medicine-card border-0" style={{
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src="https://images.pexels.com/photos/208518/pexels-photo-208518.jpeg"
                    alt="Cough & Cold"
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
                <div className="card-body text-center" style={{ padding: "20px" }}>
                  <h5 className="card-title" style={{ color: "#1b1f3b", fontWeight: "700", marginBottom: "10px" }}>
                    Cough & Cold
                  </h5>
                  <p className="card-text" style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Cough Syrup, Lozenges, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="text-center mt-5">
            <Link 
              to="/med" 
              className="btn btn-lg px-5 py-3"
              style={{
                background: "linear-gradient(135deg, #00769b 0%, #00a8cc 100%)",
                color: "#fff",
                borderRadius: "50px",
                fontWeight: "600",
                border: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 25px rgba(0,118,155,0.3)",
                fontSize: "1.1rem"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,118,155,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,118,155,0.3)";
              }}
            >
              Browse All Medicines →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CHome;