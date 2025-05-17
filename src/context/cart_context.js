import { createContext, useContext, useReducer, useEffect } from "react";
import cartReducer from "../reducer/cartReducer";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  total_item: 0,
  total_price: 0,
  shipping_fee: 100,
};
  


const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (id, color, amount, product, image, category) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product, image, category } });
  };

  // increment and decrement the product

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  // to remove the individual item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // to add the data in localStorage
  // get vs set

  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

    localStorage.setItem("thapaCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrement,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
