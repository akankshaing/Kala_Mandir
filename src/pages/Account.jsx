import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useOrders, DELIVERY_STAGES } from "../context/OrderContext.jsx";
import { formatINR, formatDate } from "../utils/format.js";
import "./Account.css";

export default function Account() {
  const { user, signup, signin, emailExists, logout, addresses, addAddress, removeAddress } = useAuth();
  const { orders } = useOrders();
  // One page, three views: "start" (email only), "login", "signup"
  const [mode, setMode] = useState("start");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [authError, setAuthError] = useState("");
  const [busy, setBusy] = useState(false);

  const goTo = (next) => {
    setMode(next);
    setAuthError("");
    setShowPw(false);
  };

  const resetAuth = () => {
    setForm({ name: "", email: "", password: "" });
    goTo("start");
  };

  const submitAuth = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (mode === "start") {
      // Existing email -> login, new email -> signup
      goTo(emailExists(form.email) ? "login" : "signup");
      return;
    }
    if (mode === "signup" && form.password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }
    setBusy(true);
    const result = mode === "signup"
      ? await signup(form.name, form.email, form.password)
      : await signin(form.email, form.password);
    setBusy(false);
    if (!result.ok) setAuthError(result.error);
  };

  const [addrForm, setAddrForm] = useState({ label: "Home", line1: "", city: "", state: "", pincode: "" });

  if (!user) {
    const heading = mode === "start" ? "Login or Signup" : mode === "login" ? "Login" : "Create your account";
    const sub = mode === "start" ? "Get started & grab best offers!" : mode === "login" ? "Welcome back! Enter your details" : "Just a few details and you're in";
    return (
      <div className="account-login-page">
        <div className="account-login-card card-surface">
          <img src="/logo-small.jpeg" alt="Kalamandir Shivam" className="account-login-logo" />
          <h1>{heading}</h1>
          <p className="auth-sub">{sub}</p>

          <form onSubmit={submitAuth}>
            {mode === "signup" && (
              <input placeholder="Full name" autoComplete="name" autoFocus value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
            )}
            <input type="email" placeholder="Email address" autoComplete="email" autoFocus={mode !== "signup"} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
            {mode !== "start" && (
              <div className="auth-pw">
                <input type={showPw ? "text" : "password"} placeholder={mode === "signup" ? "Create password (min 6 characters)" : "Password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required />
                <button type="button" className="auth-pw-toggle" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? "Hide password" : "Show password"}>
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            )}
            {authError && <p className="auth-error" role="alert">{authError}</p>}
            <button className="btn btn-block" type="submit" disabled={busy}>
              {mode === "start" ? "Continue" : mode === "login" ? "Login" : "Create account"}
            </button>
          </form>

          <div className="auth-switch-row">
            {mode !== "login" && (
              <button type="button" className="auth-switch-btn" onClick={() => goTo("login")}>
                Already have an account? <strong>Login</strong>
              </button>
            )}
            {mode !== "signup" && (
              <button type="button" className="auth-switch-btn" onClick={() => goTo("signup")}>
                New here? <strong>Create an account</strong>
              </button>
            )}
          </div>

          <p className="auth-terms">
            By continuing, you agree to our <a href="/terms-and-conditions">Terms</a> and <a href="/privacy-policy">Privacy Policy</a>.
          </p>
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
        <button
          className="btn-ghost btn"
          onClick={() => { logout(); resetAuth(); }}
        >
          Sign out
        </button>
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
