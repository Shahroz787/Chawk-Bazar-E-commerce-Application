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

const Signup = () => {
  const { userInfo, signIn } = useCartContext();
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Signup form submitted"); // Debug log
    if (password !== confirmPassword) {
      toast.error("Password does not match!");
      return;
    }
    try {
      console.log("Sending signup request", { name, email, password }); // Debug log
      const { data } = await Axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      console.log("Signup success", data); // Debug log
      signIn(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      console.error("Signup error", err); // Debug log
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
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <StyledForm onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type your name..."
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Retype your password..."
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit" className="btn-primary">
            Sign Up
          </Button>
        </div>

        <StyledLinkText className="mb-3">
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </StyledLinkText>
      </StyledForm>
    </StyledAuthContainer>
  );
};

export default Signup;
