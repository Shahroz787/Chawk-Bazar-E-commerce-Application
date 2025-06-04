import Carousal from "./components/Carousal/Carousal";
import Carousalchild from "./components/CarousalChild/Carousalchild.jsx";
import MenuProduct from "./components/MenuProduct/MenuProduct.jsx";
import React, { useState, useEffect } from "react";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.category}`);
  };

  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const isImageValid = (url) =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/products");
        const data = response.data;

        if (!data || !Array.isArray(data)) {
          console.error("Unexpected product data format:", data);
          setCategoriesLoading(false);
          return;
        }

        const categories = Array.from(
          new Set(data.map((item) => item.category))
        );

        const categoryMap = new Map();

        for (const category of categories) {
          const itemsInCategory = data.filter(
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
              break;
            }
          }
        }

        let displayCategories = Array.from(categoryMap.values());

        if (displayCategories.length === 0) {
          console.warn("No valid categories with images found.");
          setUniqueCategories([]);
          setCategoriesLoading(false);
          return;
        }

        // Duplicate items to reach at least 8 if needed
        while (displayCategories.length < 8) {
          displayCategories = displayCategories.concat(displayCategories);
        }

        setUniqueCategories(displayCategories.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Carousal />
      <Carousalchild />
      <MenuProduct
        onclick={handleCategoryClick}
        uniqueCategories={uniqueCategories}
        loading={categoriesLoading}
      />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
