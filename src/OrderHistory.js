import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import MessageBox from "./components/MessageBox/MessageBox";
import getError from "./Utils/Utils";
import Button from "react-bootstrap/Button";
import { useCartContext } from "./context/cart_context";
import Loader from "./components/Loader";
import styled from "styled-components";

const StyledOrderHistory = styled.div`
  padding: 2rem;

  h1 {
    font-size: 2.4rem;
    color: #6c2eb7;
    margin-bottom: 2rem;
  }

  .table-container {
    overflow-x: auto;

    table.table {
      width: 100%;
      border-collapse: collapse;
      font-size: 1.1rem;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
      background-color: #fff;
      min-width: 600px;

      thead {
        background-color: #f7f7fa;
        color: #6c2eb7;
        font-weight: 700;
      }

      th,
      td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #eaeaea;
        font-size: 1.6rem;
      }

      tbody tr:hover {
        background-color: #f9f9f9;
      }

      button {
        border: 1px solid #6c2eb7;
        color: #6c2eb7;
        font-weight: 600;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h1 {
      font-size: 2rem;
    }

    .table-container {
      table.table {
        font-size: 1.3rem;

        th,
        td {
          padding: 0.8rem;
          font-size: 1.4rem;
        }

        button {
          font-size: 1.3rem;
          padding: 0.3rem 0.6rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.8rem;
    }

    .table-container {
      table.table {
        font-size: 1.2rem;

        th,
        td {
          padding: 0.6rem;
          font-size: 1.2rem;
        }

        button {
          font-size: 1.2rem;
        }
      }
    }
  }
`;


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const OrderHistory = () => {
  const { userInfo } = useCartContext();
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    orders: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/orders/mine`, {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    if (userInfo) fetchData();
  }, [userInfo]);

  return (
    <StyledOrderHistory>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </StyledOrderHistory>
  );
};

export default OrderHistory;
