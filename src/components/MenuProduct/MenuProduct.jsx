import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MenuProduct.css";

const MenuProduct = ({ onclick }) => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
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

  useEffect(() => {
    // Restore scroll position if available
    const savedPosition = sessionStorage.getItem("featuredScroll");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
      sessionStorage.removeItem("featuredScroll");
    }
  }, []);

  useEffect(() => {
    const isImageValid = (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });

    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.in/api/products");
        const data = await response.json();
        console.log(data);

        const categories = Array.from(
          new Set(data.products.map((item) => item.category))
        );

        const categoryMap = new Map();

        for (const category of categories) {
          const itemsInCategory = data.products.filter(
            (item) =>
              item.category === category &&
              item.image &&
              typeof item.image === "string" &&
              item.image.trim() !== "" &&
              !item.image.includes("undefined")
          );

          for (const item of itemsInCategory) {
            const isValid = await isImageValid(item.image);
            if (isValid) {
              categoryMap.set(category, item);
              break; // only one valid image per category
            }
          }
        }

        let displayCategories = Array.from(categoryMap.values());

        while (displayCategories.length < 8) {
          displayCategories = displayCategories.concat(displayCategories);
        }

        setUniqueCategories(displayCategories.slice(0, 8));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-14 mt-20">
      <div>
        <h1 className="font-bold lg:text-5xl text-4xl">FEATURED PRODUCTS</h1>
      </div>
      <div className="slider-container">
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
      </div>
    </div>
  );
};

export default MenuProduct;
