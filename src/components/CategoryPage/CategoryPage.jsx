// CategoryPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product";


const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categoryItems, setCategoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.in/api/products`);
        const data = await response.json();
        const filteredItems = data.products.filter(
          (item) => item.category === categoryName
        );
        setCategoryItems(filteredItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchCategoryItems();
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  return (
    <div className="category-page mx-6">
      <div className="relative my-8">
        <h1 className="absolute top-1/2 left-1/4 text-5xl font-bold ">
          {categoryName.toUpperCase()}
        </h1>
        <img src="/images/category-banner.webp" alt="Category Banner" />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : categoryItems.length > 0 ? (
        <div className="grid lg:grid-cols-4 gap-4">
          {categoryItems.map((item) => (
            <Product
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              category={item.category}
            />
          ))}
        </div>
      ) : (
        <p>No items found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
