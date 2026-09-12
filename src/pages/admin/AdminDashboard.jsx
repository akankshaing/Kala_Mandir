import React from "react";
import { useProducts } from "../../context/ProductContext.jsx";
import { useOrders } from "../../context/OrderContext.jsx";
import { formatINR } from "../../utils/format.js";

export default function AdminDashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();

  const lowStock = products.filter((p) => p.stock <= 5).length;
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status !== "Delivered").length;

  return (
    <div className="admin-page">
      <h1>Dashboard</h1>
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Products live</span>
          <span className="stat-value">{products.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Low stock (≤5)</span>
          <span className="stat-value">{lowStock}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Orders placed</span>
          <span className="stat-value">{orders.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">In transit</span>
          <span className="stat-value">{pending}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Revenue (all orders)</span>
          <span className="stat-value">{formatINR(revenue)}</span>
        </div>
      </div>
    </div>
  );
}
