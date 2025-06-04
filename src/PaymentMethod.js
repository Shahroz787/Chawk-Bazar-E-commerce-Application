import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "./components/CheckoutSteps/checkoutSteps";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "./context/cart_context";
import styled from "styled-components";

const StyledAuthContainer = styled.div`
  max-width: 600px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 2rem 2.5rem;
  margin: 4rem auto;
`;

const StyledForm = styled.form`
  .radio-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  .form-check-input {
    width: 18px;
    height: 18px;
    margin-top: 0;
    cursor: pointer;
  }

  .form-check-label {
    cursor: pointer;
    font-size: 1rem;
  }

  .btn-primary {
    background-color: blueviolet !important;
    color: #fff;
    border: none;
    font-weight: bold;
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    border-radius: 4px;
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

const PaymentMethod = () => {
    const navigate = useNavigate();
    const { shippingAddress, paymentMethod, setPaymentMethod } = useCartContext(); // FIXED: get directly from context

    const [paymentMethodName, setPaymentMethodName] = useState(() =>
        paymentMethod ? paymentMethod : "Paypal"
    );

    useEffect(() => {
        if (!shippingAddress || !shippingAddress.address) {
            console.log("shipping address is not saved")
            navigate("/shipping");
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        setPaymentMethod(paymentMethodName);
        localStorage.setItem("paymentMethod", paymentMethodName);
        navigate("/placeorder");
    };

    return (
        <div>
            <Helmet>
                <title>Payment Method</title>
            </Helmet>
            <StyledCheckoutStepsWrapper>
                <CheckoutSteps step1 step2 step3 />
            </StyledCheckoutStepsWrapper>
            <StyledAuthContainer className="small_container">
                <h2
                    className="my-3"
                    style={{
                        fontSize: "1.9rem",
                        marginBottom: "2rem",
                        fontWeight: 900,
                    }}
                >
                    Payment Method
                </h2>
                <StyledForm onSubmit={submitHandler}>
                    <div className="mb-3">
                        <div className="form-check radio-group">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="Paypal"
                                name="paymentMethod"
                                value="Paypal"
                                checked={paymentMethodName === "Paypal"}
                                onChange={(e) => setPaymentMethodName(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="Paypal">
                                Paypal
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-check radio-group">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="Bkash"
                                name="paymentMethod"
                                value="Bkash"
                                checked={paymentMethodName === "Bkash"}
                                onChange={(e) => setPaymentMethodName(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="Bkash">
                                Bkash
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn-primary">
                            Continue
                        </button>
                    </div>
                </StyledForm>
            </StyledAuthContainer>
        </div>
    );
};

export default PaymentMethod;
