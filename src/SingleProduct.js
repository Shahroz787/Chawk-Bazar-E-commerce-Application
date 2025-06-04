import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/productcontext";
import PageNavigation from "./components/PageNavigation";
import { Container } from "./styles/Container";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "./components/Star";
import AddToCart from "./components/AddToCart";
import Loader from "./components/Loader";
import Rating from "./components/Rating/Rating";

const SingleProduct = ({ id }) => {
  const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();

  const {
   _id,
    price,
    description,
    image,
    brand,
    category,
    rating,
    numReviews,
    countInStock
} = singleProduct;



  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (id) {
      getSingleProduct(id);
    }
  }, [id]); // Add id as a dependency

  if (isSingleLoading) {
    return <div className="page_loading"><Loader /></div>;
  }

  // Function to handle the toggling of description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Function to limit the description
  const getLimitedDescription = (text, limit = 100) => {
    if (!text) return "";  // If description is undefined or empty, return an empty string
    return text.split(" ").slice(0, limit).join(" ") + "...";
  };

  return (
    <Wrapper>
      <PageNavigation title={brand} />
      <Container className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <img src={image} alt="name" />
          </div>

          {/* product data  */}
          <div className="product-data">
            <h2>{brand}</h2>
            <Rating
                rating={rating}
                numReviews={numReviews}
              ></Rating>

            <p className="product-data-price">
              MRP:
              <del>
                ${price + 250}
              </del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: ${price}
            </p>

            {/* Description with toggle */}
            <p>
              {showFullDescription ? description : getLimitedDescription(description, 10)}
              <button onClick={toggleDescription} className="font-bold">
                {showFullDescription ? "See Less" : "See More"}
              </button>
            </p>

            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>chawkBazar Delivered </p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>2 Year Warranty </p>
              </div>
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span>{countInStock}</span>
              </p>
              <p>
                category :<span> {category} </span>
              </p>
            </div>
            <hr />
            {<AddToCart product={singleProduct} />}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};


const Wrapper = styled.section`
  .container {
    padding: 4rem 0;
    max-height: 70vh; /* Set maximum height for scrollable content */
    overflow-y: auto; /* Enable vertical scroll if content exceeds height */
  }

  .product_images {
    display: flex;
    align-items: start;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.8rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      border: 0.1rem solid #000;
      color: red;
    }

    .toggle-description {
      color: blue;
      cursor: pointer;
      font-weight: bold;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;


export default SingleProduct;
