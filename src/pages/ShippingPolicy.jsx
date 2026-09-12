import React from "react";
import "./LegalPage.css";

export default function ShippingPolicy() {
  return (
    <div className="legal-page">
      <h1>Shipping Policy</h1>
      <p className="legal-updated">Last updated: 1 September 2026</p>

      <h2>Delivery timelines</h2>
      <p>
        Orders are typically dispatched within 24–48 hours and delivered within 4–7
        business days, depending on your pincode. You'll see an estimated delivery
        window at checkout and can track status from <a href="#/account">My Account</a>.
      </p>

      <h2>Delivery charges</h2>
      <p>
        Delivery is free on orders above ₹1,499. Below that, a flat ₹79 delivery
        charge applies and is always shown as a separate line in your cart and at
        checkout — never bundled invisibly into the item price.
      </p>

      <h2>Order tracking</h2>
      <p>
        Every order moves through five stages: Order placed → Packed → Shipped → Out
        for delivery → Delivered. You can see the current stage on your account page,
        and our support team can look up the same status using your order or ticket number.
      </p>

      <h2>Delays</h2>
      <p>
        Occasionally, delivery may be delayed due to circumstances outside our
        control, such as weather or courier disruptions. If a delay is due to such a
        force majeure event, it will not affect your return or refund rights as set
        out in our <a href="#/return-refund-policy">Return &amp; Refund Policy</a>.
      </p>
    </div>
  );
}
