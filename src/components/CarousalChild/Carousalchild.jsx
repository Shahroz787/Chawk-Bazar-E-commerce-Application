import React from "react";
import './Carosualchild.css';

const Carousalchild = () => {
  const images = ["/images/4.png", "/images/5.png"];

  return (
    <div className="px-2 w-full carousal-container">
      <div className="flex w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative gap-4">
        {images.map((img, index) => (
          <div key={index} className="w-1/2 relative product-hover-container">
            <img
              src={img}
              className="w-full object-cover h-full object-center block opacity-100"
              alt="Carousel Image"
            />
            <div className="flash-line"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousalchild;
