import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";

const AppContext = createContext();

const API = "/api/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  // featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      // Backend returns { products: [...] }
      dispatch({ type: "SET_API_DATA", payload: res.data });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // my 2nd api call for single product
const getSingleProduct = async (id) => {
  dispatch({ type: "SET_SINGLE_LOADING" });
  try {
    const res = await axios.get(`/api/products/${id}`);
    dispatch({ type: "SET_SINGLE_PRODUCT", payload: res.data });
  } catch (error) {
    dispatch({ type: "SET_SINGLE_ERROR" });
  }
};


  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
