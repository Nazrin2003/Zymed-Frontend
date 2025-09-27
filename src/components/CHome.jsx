import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import "../styles/chome.css";
import Footer from "../components/Footer"; 

const CHome = () => {
  return (
    <div>
      <Nav />

      {/* Hero Section */}
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src="https://images.pexels.com/photos/4046945/pexels-photo-4046945.jpeg"
              className="d-block w-100 carousel-img"
              alt="Slide 1"
            />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
              <h1 className="carousel-title display-3 fw-bold">Welcome to Zymed</h1>
              <p className="carousel-text fs-4">
                Your trusted partner for medicines, prescriptions, and more.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://images.pexels.com/photos/3873147/pexels-photo-3873147.jpeg"
              className="d-block w-100 carousel-img"
              alt="Slide 2"
            />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
              <h1 className="carousel-title display-3 fw-bold">Easy Ordering</h1>
              <p className="carousel-text fs-4">
                Order medicines online with just a few clicks.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/5699522/pexels-photo-5699522.jpeg"
              className="d-block w-100 carousel-img"
              alt="Slide 3"
            />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
              <h1 className="carousel-title display-3 fw-bold">Fast Delivery</h1>
              <p className="carousel-text fs-4">
                We ensure your medicines reach you quickly and safely.
              </p>
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
      <section className="py-5 text-center features-section">
        <div className="container">
          <h2 className="fw-bold mb-5">Why Choose Us</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card p-4 h-100 shadow-sm">
                <div className="feature-icon mb-3">
                  <i className="fa-solid fa-capsules"></i>
                </div>
                <h5>Wide Range</h5>
                <p>From daily essentials to rare medicines, we’ve got it all.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 h-100 shadow-sm">
                <div className="feature-icon mb-3">
                  <i className="fa-solid fa-truck"></i>
                </div>
                <h5>Fast Delivery</h5>
                <p>Get your products delivered quickly and safely to your home.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 h-100 shadow-sm">
                <div className="feature-icon mb-3">
                  <i className="fa-solid fa-house-chimney-medical"></i>
                </div>
                <h5>Trusted Quality</h5>
                <p>We provide only genuine and high-quality products.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medicines Preview Section */}
     <section className="py-5 medicines-section">
  <div className="container">
    <h2 className="fw-bold mb-4 text-center">Medicine Categories</h2>
    <div className="row g-4">
      {/* Pain Relief */}
      <div className="col-md-3">
        <div className="card shadow-sm medicine-card">
          <img
            src="https://images.pexels.com/photos/3683077/pexels-photo-3683077.jpeg"
            alt="Pain Relief"
            className="card-img-top"
          />
          <div className="card-body text-center">
            <h5 className="card-title">Pain Relief</h5>
            <p className="card-text">Paracetamol, Ibuprofen, etc.</p>
          </div>
        </div>
      </div>

      {/* Immunity Boosters */}
      <div className="col-md-3">
        <div className="card shadow-sm medicine-card">
          <img
            src="https://images.pexels.com/photos/360622/pexels-photo-360622.jpeg"
            alt="Immunity Boosters"
            className="card-img-top"
          />
          <div className="card-body text-center">
            <h5 className="card-title">Immunity Boosters</h5>
            <p className="card-text">Vitamin C, Zinc, etc.</p>
          </div>
        </div>
      </div>

      {/* Antibiotics */}
      <div className="col-md-3">
        <div className="card shadow-sm medicine-card">
          <img
            src="https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg"
            alt="Antibiotics"
            className="card-img-top"
          />
          <div className="card-body text-center">
            <h5 className="card-title">Antibiotics</h5>
            <p className="card-text">Amoxicillin, Azithromycin, etc.</p>
          </div>
        </div>
      </div>

      {/* Cough & Cold */}
      <div className="col-md-3">
        <div className="card shadow-sm medicine-card">
          <img
            src="https://images.pexels.com/photos/208518/pexels-photo-208518.jpeg"
            alt="Cough & Cold"
            className="card-img-top"
          />
          <div className="card-body text-center">
            <h5 className="card-title">Cough & Cold</h5>
            <p className="card-text">Cough Syrup, Lozenges, etc.</p>
          </div>
        </div>
      </div>
    </div>

    {/* View More Button */}
    <div className="text-center mt-4">
      <Link to="/med" className="btn btn-primary">
        Browse All Medicines
      </Link>
    </div>
  </div>
</section>


<Footer />
    </div>
  );
};

export default CHome;
