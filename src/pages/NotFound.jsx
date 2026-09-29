import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "110px 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 40, marginBottom: 10 }}>Page not found</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 26 }}>
        The page you're looking for may have moved or no longer exists.
      </p>
      <Link className="btn" to="/">Back to home</Link>
    </div>
  );
}
