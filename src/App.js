import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./About";
import Home from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
import ErrorPage from "./ErrorPage";
import CategoryPage from "./components/CategoryPage/CategoryPage.jsx";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrderHistory from "./OrderHistory.js";
import PlaceOrder from "./PlaceOrder.js";
import ShippingAddress from "./ShippingAddress.js";
import { HelmetProvider } from "react-helmet-async";
import Signup from "./Signup.js";
import Signin from "./Signin.js";
import PaymentMethod from "./PaymentMethod.js";
import Orders from "./Orders.js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.js";
import Profile from "./profile.js";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient: "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <Router>
          <GlobalStyle />
          <ToastContainer position="top-right" limit={1} />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/shipping" element={<ShippingAddress />} />
            <Route path="/payment" element={<PaymentMethod />} />
            <Route path="/placeOrder" element={<PlaceOrder />} />
            <Route path="/orderhistory" element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/order/:id" element={<Orders />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default App;
