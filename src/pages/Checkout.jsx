import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useOrders } from "../context/OrderContext.jsx";
import { formatINR } from "../utils/format.js";
import "./Checkout.css";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit card" },
  { id: "upi", label: "UPI" },
  { id: "netbanking", label: "Net banking" },
  { id: "cod", label: "Cash on delivery" }
];

const emptyAddress = { fullName: "", phone: "", email: "", line1: "", landmark: "", city: "", state: "", pincode: "" };

export default function Checkout() {
  const { totals, clearSelected } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [address, setAddress] = useState(emptyAddress);
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  if (totals.selectedLines.length === 0) return <Navigate to="/cart" replace />;

  const updateAddress = (key, value) => setAddress((a) => ({ ...a, [key]: value }));

  const validate = () => {
    const required = ["fullName", "phone", "email", "line1", "city", "state", "pincode"];
    if (required.some((k) => !address[k].trim())) return "Please fill in all required address fields.";
    if (!/^\d{10}$/.test(address.phone)) return "Enter a valid 10-digit phone number.";
    if (!/^\d{6}$/.test(address.pincode)) return "Enter a valid 6-digit pincode.";
    if (method === "card" && (!card.number || !card.name || !card.expiry || !card.cvv)) return "Please complete your card details.";
    if (method === "upi" && !upiId) return "Please enter your UPI ID.";
    if (method === "netbanking" && !bank) return "Please choose your bank.";
    if (!consent) return "Please accept the Terms & Conditions to continue.";
    return "";
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");

    const order = placeOrder({
      items: totals.selectedLines,
      address,
      paymentMethod: method,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total
    });
    clearSelected();
    navigate(`/order-success/${order.id}`);
  };

  return (
    <div className="container checkout-page">
      <h1>Checkout</h1>
      <form className="checkout-body" onSubmit={handlePlaceOrder}>
        <div className="checkout-main">
          <section className="checkout-section">
            <h3>Delivery address</h3>
            <div className="form-grid">
              <input placeholder="Full name" value={address.fullName} onChange={(e) => updateAddress("fullName", e.target.value)} required />
              <input placeholder="Phone number" value={address.phone} onChange={(e) => updateAddress("phone", e.target.value)} required />
              <input className="span-2" type="email" placeholder="Email address" value={address.email} onChange={(e) => updateAddress("email", e.target.value)} required />
              <input className="span-2" placeholder="House no., street, area" value={address.line1} onChange={(e) => updateAddress("line1", e.target.value)} required />
              <input className="span-2" placeholder="Landmark (optional)" value={address.landmark} onChange={(e) => updateAddress("landmark", e.target.value)} />
              <input placeholder="City" value={address.city} onChange={(e) => updateAddress("city", e.target.value)} required />
              <input placeholder="State" value={address.state} onChange={(e) => updateAddress("state", e.target.value)} required />
              <input placeholder="Pincode" value={address.pincode} onChange={(e) => updateAddress("pincode", e.target.value)} required />
            </div>
          </section>

          <section className="checkout-section">
            <h3>Payment method</h3>
            <div className="payment-options">
              {PAYMENT_METHODS.map((m) => (
                <label key={m.id} className={`payment-option ${method === m.id ? "is-active" : ""}`}>
                  <input type="radio" name="payment" checked={method === m.id} onChange={() => setMethod(m.id)} />
                  {m.label}
                </label>
              ))}
            </div>

            {method === "card" && (
              <div className="form-grid payment-detail">
                <input className="span-2" placeholder="Card number" value={card.number} maxLength={19} onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))} />
                <input className="span-2" placeholder="Name on card" value={card.name} onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))} />
                <input placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))} />
                <input placeholder="CVV" value={card.cvv} maxLength={3} onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))} />
              </div>
            )}
            {method === "upi" && (
              <div className="form-grid payment-detail">
                <input className="span-2" placeholder="yourname@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
              </div>
            )}
            {method === "netbanking" && (
              <div className="form-grid payment-detail">
                <select className="span-2" value={bank} onChange={(e) => setBank(e.target.value)}>
                  <option value="">Select your bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Punjab National Bank</option>
                </select>
              </div>
            )}
            {method === "cod" && (
              <p className="payment-detail cod-note">Pay in cash when your order is delivered. A small COD handling fee may apply for high-value orders.</p>
            )}
          </section>

          <label className="consent-row">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            I have read and agree to the <a href="#/terms-and-conditions" target="_blank" rel="noreferrer">Terms &amp; Conditions</a> and <a href="#/return-refund-policy" target="_blank" rel="noreferrer">Return &amp; Refund Policy</a>.
          </label>

          {error && <p className="checkout-error" role="alert">{error}</p>}
        </div>

        <aside className="checkout-summary card-surface">
          <h3>Order summary</h3>
          {totals.selectedLines.map((l) => (
            <div className="summary-item" key={l.key}>
              <span>{l.name} × {l.qty}</span>
              <span>{formatINR(l.price * l.qty)}</span>
            </div>
          ))}
          <div className="summary-row"><span>Subtotal</span><span>{formatINR(totals.subtotal)}</span></div>
          <div className="summary-row"><span>Delivery</span><span>{totals.shipping === 0 ? "Free" : formatINR(totals.shipping)}</span></div>
          <div className="summary-row"><span>Estimated GST</span><span>{formatINR(totals.tax)}</span></div>
          <div className="summary-row summary-total"><span>Total payable</span><span>{formatINR(totals.total)}</span></div>
          <button type="submit" className="btn btn-block">Place order</button>
          <p className="summary-note">No cancellation fee applies if you cancel before your order is shipped.</p>
        </aside>
      </form>
    </div>
  );
}
