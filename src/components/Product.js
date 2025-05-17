// Product.js
import { useState } from "react";
import Modal from "./Modal"; // Import Modal component
import SingleProduct from "../SingleProduct"; // Import SingleProduct component

const Product = ({ id, title, image, price, category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.classList.toggle("no-scroll", !isModalOpen);
  };

  return (
    <>
      <div className="card" onClick={toggleModal}>
        <figure>
          <img src={image} alt={title} />
          <figcaption className="caption">{category}</figcaption>
        </figure>
        <div className="mt-6 lg:mt-4 lg:ml-8 pb-4 ml-10 text-xl">
          <h3 className="text-2xl font-bold">{title.slice(0, 30)}...</h3>
          <p className="card-data--price mt-3">${price}</p>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <SingleProduct id={id} />
      </Modal>
    </>
  );
};

export default Product;
