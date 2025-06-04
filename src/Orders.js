import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams, Link } from "react-router-dom";
import MessageBox from "./components/MessageBox/MessageBox";
import getError from "./Utils/Utils";
import Loader from "./components/Loader";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const MainContainer = styled.div`
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 3rem;
  }

  @media (min-width: 992px) {
    padding: 0 5rem;
  }

  font-size: 1.1rem; /* Increase base font size */
`;

const StyledCard = styled(Card)`
  margin-bottom: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);

  .card-title {
    font-size: 1.5rem; 
    font-weight: 700;
    color: #7f53ac;
  }

  .card-text {
    font-size: 1.8rem;
  }
`;

const StyledListGroup = styled(ListGroup)`
  .list-group-item {
    background: #fff;
    border: none;
    border-bottom: 1px solid #f0f0f0;
    padding: 1rem 0.8rem;
    font-size: 1.5rem;
    font-weight: 500;
  }

  .list-group-item strong {
    font-size: 1.5rem;
  }
`;

const StyledImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 10px;
  border: 1px solid #eee;
`;

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const Orders = () => {
  const { userInfo } = require("./context/cart_context").useCartContext();
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  return loading ? (
    <Loader />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <MainContainer>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-4" style={{ fontWeight: 800, fontSize: "2.3rem", color: "#6c2eb7" }}>
        OrderNO: #{orderId}
      </h1>
      <Row>
        <Col md={8}>
          <StyledCard>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress.fullname} <br />
                <strong>Address:</strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered!</MessageBox>
              )}
            </Card.Body>
          </StyledCard>
          <StyledCard>
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid!</MessageBox>
              )}
            </Card.Body>
          </StyledCard>
          <StyledCard>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <StyledListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id} className="d-flex align-items-center">
                    <StyledImg src={item.image} alt={item.name} />
                    <div style={{ flex: 1 }}>
                      <Link to={`/products/${item.slug}`} style={{ fontWeight: 600, color: "#333", textDecoration: "none" }}>
                        {item.name}
                      </Link>
                    </div>
                    <div style={{ width: 60, textAlign: "center" }}>{item.quantity}</div>
                    <div style={{ width: 70, textAlign: "right" }}>${item.price}</div>
                  </ListGroup.Item>
                ))}
              </StyledListGroup>
            </Card.Body>
          </StyledCard>
        </Col>
        <Col md={4}>
          <StyledCard>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <StyledListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice?.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </StyledListGroup>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Orders;
