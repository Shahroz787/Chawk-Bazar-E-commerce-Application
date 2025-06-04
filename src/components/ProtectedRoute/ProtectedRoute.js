import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useCartContext } from "../../context/cart_context";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useCartContext();
  return userInfo ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
