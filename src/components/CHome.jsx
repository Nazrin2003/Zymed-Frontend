import React from 'react'
import Nav from './Nav'
import '../styles/chome.css'

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
              <p className="carousel-text fs-4">Your trusted partner for medicines, prescriptions, and more.</p>
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
              <p className="carousel-text fs-4">Order medicines online with just a few clicks.</p>
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
              <p className="carousel-text fs-4">We ensure your medicines reach you quickly and safely.</p>
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
      <section class="py-5 text-center features-section">
        <div class="container">
          <h2 class="fw-bold mb-5">Why Choose Us</h2>
          <div class="row g-4">
            <div class="col-md-4">
              <div class="card p-4 h-100 shadow-sm">
                <div class="feature-icon mb-3"><center><i class="fa-solid fa-capsules"></i></center></div>
                <h5>Wide Range</h5>
                <p>From daily essentials to rare medicines, we’ve got it all.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card p-4 h-100 shadow-sm">
                <div class="feature-icon mb-3"><center><i class="fa-solid fa-truck"></i></center></div>
                <h5>Fast Delivery</h5>
                <p>Get your products delivered quickly and safely to your home.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card p-4 h-100 shadow-sm">
                <div class="feature-icon mb-3"><center><i class="fa-solid fa-house-chimney-medical"></i></center></div>
                <h5>Trusted Quality</h5>
                <p>We provide only genuine and high-quality products.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default CHome
