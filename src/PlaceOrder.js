import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "./components/CheckoutSteps/checkoutSteps";
import { toast } from "react-toastify";
import getError from "./Utils/Utils";
import { useCartContext } from "./context/cart_context";
import Loader from "./components/Loader";
import styled from "styled-components";

const StyledCheckoutStepsWrapper = styled.div`
  margin: 2rem 5rem;
  padding: 1rem 0;
  background: #f7f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    margin: 1rem 1rem;
    font-size: 1.2rem;
    padding: 0.5rem 0;
  }
`;


const StyledCard = styled(Card)`
  margin-bottom: 1.5rem;
  margin-left: 4rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  font-size: 1.1rem;

  @media (max-width: 768px) {
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 1rem;
  }
`;


const StyledListGroup = styled(ListGroup)`
  .list-group-item {
    background: #fff;
    border: none;
    border-bottom: 1px solid #f0f0f0;
    padding: 1rem 0.8rem;
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

const StyledOrderSummary = styled(Card)`
  border-radius: 10px;
  margin-right: 4rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  font-size: 1.1rem;

  .card-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #6c2eb7;
  }

  @media (max-width: 768px) {
    margin: 1rem;
    font-size: 1rem;

    .card-title {
      font-size: 1.2rem;
    }
  }
`;

const StyledPageTitle = styled.h1`
  font-weight: 800;
  font-size: 2.1rem;
  color: #6c2eb7;
  margin-left: 4rem;
  margin-top: 3rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 3rem;
  }
`;



const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #7f53ac 0%, #647dee 100%);
  color: #fff;
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 6px;
  padding: 0.7rem 1.5rem;
  margin-top: 0.5rem;

  &:hover {
    background: linear-gradient(90deg, #6c2eb7 0%, #5f5fc4 100%);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }
`;


const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    cart,
    userInfo,
    clearCart,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useCartContext();
  const [loading, setLoading] = useState(false);

  console.log("User Info:", userInfo);

  const placeOrderHandle = async () => {
    try {
      setLoading(true);
      const orderItems = cart.map((item) => {
        if (!item._id || !item.slug) {
          throw new Error("Missing _id or slug in cart item");
        }
        return {
          name: item.name,
          slug: item.slug,
          image: item.image,
          price: item.price,
          quantity: item.amount,
          product: item._id,
        };
      });

      console.log("Mapped Order Items:", orderItems);
      console.log("Cart Items:", cart.length);
      

      const { data } = await Axios.post(
        "/api/orders",
        {
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`, // ✅ Fixed interpolation
          },
        }
      );

      clearCart();
      setLoading(false);
      localStorage.removeItem("cart");
      navigate(`/order/${data?.order?._id}`); // ✅ Fixed interpolation
    } catch (err) {
      setLoading(false);
      console.log("Error placing order:", err);
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate]);

  console.log("Cart Items:", cart.length);

  return (
    <div>
      <StyledCheckoutStepsWrapper>
        <CheckoutSteps step1 step2 step3 step4 />
      </StyledCheckoutStepsWrapper>

      <Helmet>
        <title>Preview Order</title>
      </Helmet>

      <StyledPageTitle>Preview Order</StyledPageTitle>

      <Row>
        <Col md={8}>
          <StyledCard>
            <Card.Body>
              <Card.Title style={{ fontWeight: 700, color: '#7f53ac' }}>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {shippingAddress.fullname} <br />
                <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </StyledCard>

          <StyledCard>
            <Card.Body>
              <Card.Title style={{ fontWeight: 700, color: '#7f53ac' }}>Payment</Card.Title>
              <strong>Method:</strong> {paymentMethod}
              <br /><br />
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </StyledCard>

          <StyledCard>
            <Card.Body>
              <Card.Title style={{ fontWeight: 700, color: '#7f53ac' }}>Items</Card.Title>
              <StyledListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-center" style={{ fontWeight: 900, backgroundColor: '#f9f9f9', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                  <div style={{ width: 70 }}>Product</div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ width: 60, textAlign: 'center' }}>Qty</div>
                  <div style={{ width: 90, textAlign: 'right' }}>Total</div>
                </ListGroup.Item>

                {cart.map((item) => (
                  <ListGroup.Item key={item._id} className="d-flex align-items-center">
                    <StyledImg src={item.image} alt={item.name} />
                    <div style={{ flex: 1 }}>
                      <Link to={`/products/${item._id}`} style={{ fontWeight: 600, color: '#333', textDecoration: 'none' }}>
                        {item.name}
                      </Link>
                    </div>
                    <div style={{ width: 60, textAlign: 'center' }}>{item.amount}</div>
                    <div style={{ width: 90, textAlign: 'right' }}>
                      ${(item.price * item.amount).toFixed(2)}
                    </div>
                  </ListGroup.Item>
                ))}
              </StyledListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </StyledCard>
        </Col>

        <Col md={4}>
          <StyledOrderSummary>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <StyledListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Order Total</Col>
                    <Col>${totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <StyledButton
                      type="button"
                      onClick={placeOrderHandle}
                      disabled={cart.length === 0}
                    >
                      Place Order
                    </StyledButton>
                  </div>
                  {loading && <Loader />}
                </ListGroup.Item>
              </StyledListGroup>
            </Card.Body>
          </StyledOrderSummary>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrder;
