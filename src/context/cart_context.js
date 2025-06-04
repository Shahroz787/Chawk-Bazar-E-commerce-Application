import { createContext, useContext, useReducer, useEffect } from "react";
import cartReducer from "../reducer/cartReducer";

const CartContext = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {}, // Use empty object for userInfo by default
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  cart: JSON.parse(localStorage.getItem('bazarCart')) || [],
  total_item: 0,
  total_price: 0,
  shipping_fee: 0,
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (_id, amount, image, category, price, name, slug) => {
    dispatch({ type: "ADD_TO_CART", payload: { _id, amount, image, category, price, name, slug } });
  };

  // increment and decrement the product

  const setDecrease = (_id) => {
    dispatch({ type: "SET_DECREMENT", payload: _id });
  };

  const setIncrement = (_id) => {
    dispatch({ type: "SET_INCREMENT", payload: _id });
  };

  // to remove the individual item from cart
  const removeItem = (_id) => {
    dispatch({ type: "REMOVE_ITEM", payload: _id });
  };

  // to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // set payment method
  const setPaymentMethod = (method) => {
    // You can also update localStorage here if you want
    dispatch({ type: "SET_PAYMENT_METHOD", payload: method });
  };

  // set user info (for login/signup)
  const setUserInfo = (user) => {
    dispatch({ type: "SET_USER_INFO", payload: user });
  };

  // set shipping address
  const setShippingAddress = (address) => {
    dispatch({ type: "SET_SHIPPING_ADDRESS", payload: address });
  };

  const signIn = (userData) => {
    dispatch({ type: "USER_SIGNIN", payload: userData });
  };

  const signOut = () => {
    dispatch({ type: "USER_SIGNOUT" });
  };

  // to add the data in localStorage
  // get vs set

  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

    localStorage.setItem("bazarCart", JSON.stringify(state.cart));
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
        setPaymentMethod,
        setUserInfo,
        signIn,
        signOut,
        setShippingAddress,
        userInfo: state.userInfo,
        shippingAddress: state.shippingAddress,
        cart: state.cart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
