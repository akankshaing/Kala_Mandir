import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useOrders, DELIVERY_STAGES } from "../context/OrderContext.jsx";
import { formatINR, formatDate } from "../utils/format.js";
import "./Account.css";

export default function Account() {
  const { user, login, logout, addresses, addAddress, removeAddress } = useAuth();
  const { orders } = useOrders();
  const [form, setForm] = useState({ name: "", email: "" });
  const [addrForm, setAddrForm] = useState({ label: "Home", line1: "", city: "", state: "", pincode: "" });

  if (!user) {
    return (
      <div className="account-login-page">
        <div className="account-login-card card-surface">
          <img src="/logo-small.jpeg" alt="Kalamandir Shivam" className="account-login-logo" />
          <h1>Sign in</h1>
          <form
            onSubmit={(e) => { e.preventDefault(); if (form.name && form.email) login(form.name, form.email); }}
          >
            <input placeholder="Full name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
            <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
            <button className="btn btn-block" type="submit">Continue</button>
          </form>
        </div>
      </div>
    );
  }

  const myOrders = orders.filter((o) => o.address?.email === user.email);

  return (
    <div className="account-page">
      <div className="account-head">
        <div>
          <h1>Hi, {user.name}</h1>
          <p>{user.email}</p>
        </div>
        <button className="btn-ghost btn" onClick={logout}>Sign out</button>
      </div>

      <section className="account-section">
        <h3>Order history</h3>
        {myOrders.length === 0 ? (
          <p className="muted">No orders placed yet.</p>
        ) : (
          <div className="order-list">
            {myOrders.map((o) => (
              <div className="order-row" key={o.id}>
                <div>
                  <strong>{o.id}</strong>
                  <p className="muted">{formatDate(o.createdAt)} · {o.items.length} item(s) · {formatINR(o.total)}</p>
                </div>
                <div className="order-status-track">
                  {DELIVERY_STAGES.map((stage) => (
                    <span key={stage} className={DELIVERY_STAGES.indexOf(o.status) >= DELIVERY_STAGES.indexOf(stage) ? "is-done" : ""}>
                      {stage}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="account-section">
        <h3>Saved addresses</h3>
        <div className="address-list">
          {addresses.map((a) => (
            <div className="address-card" key={a.id}>
              <strong>{a.label}</strong>
              <p>{a.line1}, {a.city}, {a.state} — {a.pincode}</p>
              <button onClick={() => removeAddress(a.id)}>Remove</button>
            </div>
          ))}
        </div>
        <form
          className="address-form"
          onSubmit={(e) => {
            e.preventDefault();
            addAddress(addrForm);
            setAddrForm({ label: "Home", line1: "", city: "", state: "", pincode: "" });
          }}
        >
          <input placeholder="Label (Home, Work...)" value={addrForm.label} onChange={(e) => setAddrForm((f) => ({ ...f, label: e.target.value }))} />
          <input placeholder="Address line" value={addrForm.line1} onChange={(e) => setAddrForm((f) => ({ ...f, line1: e.target.value }))} required />
          <input placeholder="City" value={addrForm.city} onChange={(e) => setAddrForm((f) => ({ ...f, city: e.target.value }))} required />
          <input placeholder="State" value={addrForm.state} onChange={(e) => setAddrForm((f) => ({ ...f, state: e.target.value }))} required />
          <input placeholder="Pincode" value={addrForm.pincode} onChange={(e) => setAddrForm((f) => ({ ...f, pincode: e.target.value }))} required />
          <button className="btn-outline btn" type="submit">Save address</button>
        </form>
      </section>
    </div>
  );
}
