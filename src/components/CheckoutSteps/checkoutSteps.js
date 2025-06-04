import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const StyledRow = styled(Row)`
  &.checkout_steps > div {
    border-bottom: 0.2rem solid #a0a0a0;
    color: #a0a0a0;
  }
  &.checkout_steps > div.active {
    border-bottom: 0.2rem solid blueviolet;
    color: blueviolet;
  }
`;

const CheckoutSteps = (props) => {
  return (
    <StyledRow className="checkout_steps">
      <Col className={props.step1 ? "active" : ""}>Sign-In</Col>
      <Col className={props.step2 ? "active" : ""}>Shipping</Col>
      <Col className={props.step3 ? "active" : ""}>Payment</Col>
      <Col className={props.step4 ? "active" : ""}>Place Order</Col>
    </StyledRow>
  );
};

export default CheckoutSteps;
