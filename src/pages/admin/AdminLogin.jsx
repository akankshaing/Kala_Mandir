import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import "./Admin.css";

export default function AdminLogin() {
  const { isAdmin, login, DEMO_PASSCODE } = useAdminAuth();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(passcode)) navigate("/admin");
    else setError("Incorrect passcode. Try again.");
  };

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <img src="/logo-small.png" alt="Kalamandir Shivam" className="admin-login-logo" />
        <h1>Kalamandir Admin</h1>
        <p>Staff access only. Enter the panel passcode to continue.</p>
        <input
          type="password"
          placeholder="Passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          autoFocus
        />
        {error && <p className="admin-login-error">{error}</p>}
        <button className="btn btn-block" type="submit">Enter panel</button>
        <p className="admin-hint">Demo passcode: <code>{DEMO_PASSCODE}</code></p>
      </form>
    </div>
  );
}
