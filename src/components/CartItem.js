import React, { useState } from "react";
import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";

const CartItem = ({ _id, title, image, price, category, amount }) => {
  const { removeItem, setDecrease, setIncrement } = useCartContext(); // Always use useCartContext

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={title} />
          </figure>
        </div>
        <div>
          <p>{category}</p>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          {price}
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(_id)}
        setIncrease={() => setIncrement(_id)}
      />

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          {price * amount}
          {/* <FormatPrice price={price * amount} /> */}
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(_id)} />
      </div>
    </div>
  );
};

export default CartItem;
