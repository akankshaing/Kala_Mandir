import React from "react";
import { Link, useParams } from "react-router-dom";
import { useOrders } from "../context/OrderContext.jsx";
import { formatINR } from "../utils/format.js";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const { id } = useParams();
  const { orders } = useOrders();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="order-success">
        <h1>We couldn't find that order</h1>
        <Link className="btn" to="/products">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="order-success">
      <div className="success-icon">✓</div>
      <h1>Thank you, your order is confirmed</h1>
      <p>
        Order <strong>{order.id}</strong> · Complaint tracking number <strong>{order.ticketNumber}</strong>
      </p>
      <p className="success-total">Total paid: {formatINR(order.total)} via {order.paymentMethod === "cod" ? "Cash on delivery" : order.paymentMethod.toUpperCase()}</p>
      <p className="success-note">
        A confirmation has been recorded to {order.address.email}. You can track delivery
        status any time from <Link to="/account">My Account</Link>.
      </p>
      <div className="success-actions">
        <Link className="btn" to="/products">Continue shopping</Link>
        <Link className="btn-outline btn" to="/account">View my orders</Link>
      </div>
    </div>
  );
}
