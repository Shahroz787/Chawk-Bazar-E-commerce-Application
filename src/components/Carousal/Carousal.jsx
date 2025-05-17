import React from "react";
import "./Carousal.css"; // Import CSS file for custom styles

const images = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"];

const Carousal = () => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide mainSlide"
      data-bs-ride="carousel"
      data-bs-interval="2000" // Set faster animation speed (2 seconds)
    >
      <div className="carousel-inner">
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img src={img} className="d-block w-100" alt="Carousel Image" />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousal;
