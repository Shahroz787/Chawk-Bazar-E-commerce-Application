import Carousal from "./components/Carousal/Carousal";
import Carousalchild from "./components/CarousalChild/Carousalchild.jsx";
import MenuProduct from "./components/MenuProduct/MenuProduct.jsx";
import React from "react";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const data = {
    name: "chawk Bazar",
  };

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.category}`);
  };

  return (
    <>
      <Carousal />
      <Carousalchild />
      <MenuProduct onclick={handleCategoryClick} />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
