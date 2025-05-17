import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MenuProduct.css";
import Loader from "../Loader";

const MenuProduct = ({ onclick, uniqueCategories = [], loading = false }) => {
  const navigate = useNavigate();

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "lightgreen",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "lightgreen" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="m-14 mt-20">
      <div>
        <h1 className="font-bold lg:text-5xl text-4xl">FEATURED PRODUCTS</h1>
      </div>
      <div className="slider-container">
        {loading ? (
          <Loader />
        ) : (
          <Slider {...settings}>
            {uniqueCategories.map((item, index) => (
              <div
                key={index}
                className="menu-item text-center whitespace-nowrap text-black"
                onClick={() => {
                  sessionStorage.setItem("featuredScroll", window.scrollY);
                  onclick(item);
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-image"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.webp"; // fallback image
                  }}
                />
                <div className="lg:text-4xl lg:mt-6 text-2xl font-semibold">
                  {item.category.toUpperCase()}
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default MenuProduct;
