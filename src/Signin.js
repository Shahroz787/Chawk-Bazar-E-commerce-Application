import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import getError from "./Utils/Utils";
import { useCartContext } from "./context/cart_context";
import styled from "styled-components";

const StyledAuthContainer = styled(Container)`
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

const StyledLinkText = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1.5rem;
`;

const Signin = () => {
  const { userInfo, signIn } = useCartContext();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      signIn(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo._id) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <StyledAuthContainer className="small_container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <StyledForm onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Type your email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Type your password..."
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit" className="btn-primary">
            Sign In
          </Button>
        </div>

        <StyledLinkText className="mb-3">
          New Customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your Account</Link>
        </StyledLinkText>
      </StyledForm>
    </StyledAuthContainer>
  );
};

export default Signin;
