import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "./context/cart_context";
import CheckoutSteps from "./components/CheckoutSteps/checkoutSteps";
import styled from "styled-components";

const StyledAuthContainer = styled.div`
  max-width: 600px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 2rem 2.5rem;
  margin: 2rem auto;
`;

const StyledForm = styled(Form)`
  .form-label {
    font-weight: bold;
    font-size: 1.3rem;
  }
  .form-control {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    padding: 1.1rem 1rem;
  }
  .btn-primary {
    background-color: blueviolet !important;
    color: #fff;
    border: none;
    font-weight: bold;
    margin-top: 1.2rem;
    font-size: 1.2rem;
    padding: 0.9rem 2.2rem;
  }
  .btn-primary:hover {
    background-color: #6c2eb7 !important;
  }
`;

const StyledCheckoutStepsWrapper = styled.div`
margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 5rem;
  margin-left: 5rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

const ShippingAddress = () => {
  const navigate = useNavigate();
  const { userInfo, shippingAddress, setShippingAddress } = useCartContext();

  const [fullname, setFullName] = useState(shippingAddress.fullname || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!userInfo || !userInfo._id) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const shippingData = {
      fullname,
      address,
      city,
      postalCode,
      country,
    };
    setShippingAddress(shippingData); // update context
    localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
    console.log("Navigating to payment...");
    navigate("/payment"); // <-- fixed to lowercase
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <StyledCheckoutStepsWrapper>
        <CheckoutSteps step1 step2 />
      </StyledCheckoutStepsWrapper>
      <StyledAuthContainer className="small_container">
        <h2 className="my-5" style={{ fontSize: '1.9rem', fontWeight: 900 }}>Shipping Address</h2>
        <StyledForm onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" className="btn-primary">
              Continue
            </Button>
          </div>
        </StyledForm>
      </StyledAuthContainer>
    </div>
  );
};

export default ShippingAddress;
