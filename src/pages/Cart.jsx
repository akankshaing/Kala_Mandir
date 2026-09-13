import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatINR } from "../utils/format.js";
import "./Cart.css";

export default function Cart() {
  const { lines, totals, removeLine, setQty, toggleSelected, selectAll, deselectAll, clearSelected } = useCart();
  const navigate = useNavigate();
  const allSelected = lines.length > 0 && lines.every((l) => l.selected);

  if (lines.length === 0) {
    return (
      <div className="container cart-empty">
        <h1>Your cart is empty</h1>
        <p>Everything you add will show up here.</p>
        <Link className="btn" to="/products">Continue shopping</Link>
      </div>
    );
  }

  const goToCheckout = () => {
    if (totals.selectedLines.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="container cart-page">
      <h1>Your cart</h1>

      <div className="cart-body">
        <div className="cart-lines">
          <div className="cart-select-row">
            <label className="filter-check">
              <input type="checkbox" checked={allSelected} onChange={() => (allSelected ? deselectAll() : selectAll())} />
              Select all ({lines.length})
            </label>
            <button className="cart-deselect" onClick={clearSelected}>Remove selected</button>
          </div>

          {lines.map((line) => (
            <div className="cart-line" key={line.key}>
              <input
                type="checkbox"
                checked={line.selected}
                onChange={() => toggleSelected(line.key)}
                aria-label={`Select ${line.name}`}
              />
              <img src={line.image} alt="" />
              <div className="cart-line-info">
                <Link to={`/product/${line.productId}`}>{line.name}</Link>
                <p>Size: {line.size} · Colour: {line.color}</p>
                <div className="qty-control">
                  <button onClick={() => setQty(line.key, line.qty - 1)} aria-label="Decrease quantity">–</button>
                  <span>{line.qty}</span>
                  <button onClick={() => setQty(line.key, line.qty + 1)} aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div className="cart-line-price">
                <span>{formatINR(line.price * line.qty)}</span>
                <button className="cart-remove" onClick={() => removeLine(line.key)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary card-surface">
          <h3>Order summary</h3>
          <div className="summary-row"><span>Items selected</span><span>{totals.itemCount}</span></div>
          <div className="summary-row"><span>Subtotal</span><span>{formatINR(totals.subtotal)}</span></div>
          {totals.savings > 0 && (
            <div className="summary-row summary-savings"><span>You save</span><span>-{formatINR(totals.savings)}</span></div>
          )}
          <div className="summary-row"><span>Delivery</span><span>{totals.shipping === 0 ? "Free" : formatINR(totals.shipping)}</span></div>
          <div className="summary-row"><span>Estimated GST</span><span>{formatINR(totals.tax)}</span></div>
          <div className="summary-row summary-total"><span>Total</span><span>{formatINR(totals.total)}</span></div>
          <button className="btn btn-block" disabled={totals.selectedLines.length === 0} onClick={goToCheckout}>
            Buy now ({totals.selectedLines.length})
          </button>
          <p className="summary-note">Prices are inclusive of all taxes. Delivery cost is shown in full before you pay.</p>
        </div>
      </div>
    </div>
  );
}
