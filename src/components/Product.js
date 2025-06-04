// Product.js
import { useState } from "react";
import Modal from "./Modal"; // Import Modal component
import SingleProduct from "../SingleProduct"; // Import SingleProduct component
import styled from "styled-components";

const Card = styled.div`
  cursor: pointer;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

const ProductImage = styled.img`
  transition: transform 0.3s;
  will-change: transform;
  &:hover {
    transform: scale(1.07);
  }
`;

const Product = ({ _id, name, image, price, category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.classList.toggle("no-scroll", !isModalOpen);
  };

  return (
    <>
      <Card className="card" onClick={toggleModal}>
        <figure>
          <ProductImage
            src={image}
            alt={name}
            onError={e => { e.target.onerror = null; e.target.src = "/images/placeholder.webp"; }}
          />
          <figcaption className="caption">{category}</figcaption>
        </figure>
        <div className="mt-6 lg:mt-4 lg:ml-8 pb-4 ml-10 text-xl">
          <h3 className="text-2xl font-bold">{name.slice(0, 30)}...</h3>
          <p className="card-data--price mt-3">${price}</p>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <SingleProduct id={_id} />
      </Modal>
    </>
  );
};

export default Product;
