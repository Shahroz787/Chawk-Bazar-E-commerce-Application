import { useState } from "react";
import styled from "styled-components";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cart_context";

const AddToCart = ({ product }) => {
  console.log(product);

  const { addToCart } = useCartContext();

   const { _id, image, category, price,slug,name }  = product; // No stock here

  const [amount, setAmount] = useState(1); // Default amount as 1

  // Function to decrease amount
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  // Function to increase amount, without checking stock
  const setIncrease = () => {
    setAmount(amount + 1); // No limit on stock
  };

  return (
    <Wrapper>
      {/* Add to Cart */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <NavLink to="/cart" onClick={() => addToCart(_id, amount, image, category,price,slug,name )}>
        <Button className="btn">Add To Cart</Button>
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToCart;
