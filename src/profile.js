import { useState, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import getError from "./Utils/Utils";
import { toast } from "react-toastify";
import axios from "axios";
import { useCartContext } from "./context/cart_context";
import Signin from "./Signin";
import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  padding: 1rem;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .form-label {
    font-weight: 600;
     font-size: 1.1rem;
    margin-bottom: 0.3rem;
  }

  .form-control {
   font-size: 1.05rem;
    padding: 12px 14px;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;

  &:hover {
    background-color: #218838;
  }
`;

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

const Profile = () => {
  const { userInfo,signIn } = useCartContext();

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.put(
        "/api/users/profile",
        { name, email, password },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      signIn(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User has been updated successfully!");
    } catch (error) {
      dispatch({ type: "UPDATE_FAIL" });
      toast.error(getError(error));
    }
  };

  return (
    <Wrapper>
      <Helmet>
        <title>User Profile</title>
      </Helmet>

      <FormContainer>
        <h2>User Profile</h2>
        <form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="mb-3 text-center">
            <StyledButton type="submit">Update</StyledButton>
          </div>
        </form>
      </FormContainer>
    </Wrapper>
  );
};

export default Profile;
