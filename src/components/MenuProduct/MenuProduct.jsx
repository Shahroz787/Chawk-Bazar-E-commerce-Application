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
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.in/api/products"
        );
        const data = await response.json();
        console.log(data);

          const categories = Array.from(
            new Set(data.products.map((item) => item.category))
          ).map((category) =>
            data.products.find((item) => item.category === category)
          );

          let displayCategories = categories;
          while (displayCategories.length < 8) {
            displayCategories = displayCategories.concat(categories);
          }

          setUniqueCategories(displayCategories.slice(0, 8));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  //   if (menuRef.current) {
  //     const { scrollWidth, clientWidth, scrollLeft } = menuRef.current;
  //     setIsRightArrowDisabled(scrollLeft + clientWidth >= scrollWidth);
  //     setIsLeftArrowDisabled(scrollLeft === 0);
  //   }
  // };

  // const scrollLeft = () => {
  //   menuRef.current.scrollBy({
  //     top: 0,
  //     left: -200,
  //     behavior: "smooth",
  //   });
  //   setTimeout(checkArrowVisibility, 300);
  // };

  // const scrollRight = () => {
  //   menuRef.current.scrollBy({
  //     top: 0,
  //     left: 200,
  //     behavior: "smooth",
  //   });
  //   setTimeout(checkArrowVisibility, 300);
  // };

  // useEffect(() => {
  //   checkArrowVisibility();
  //   window.addEventListener("resize", checkArrowVisibility);
  //   return () => window.removeEventListener("resize", checkArrowVisibility);
  // }, []);

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
              onClick={() => onclick(item)}
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
