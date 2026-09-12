import React from "react";
import "./LegalPage.css";

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: 1 September 2026</p>

      <p>
        This policy explains what information Kalamandir collects when you use this
        site and how it is used. This build stores data such as your cart, wishlist
        and saved addresses only in your own browser — nothing is sent to a server,
        because this is a front-end-only demo.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Contact details you give us at checkout: name, phone, email and delivery address.</li>
        <li>Order details: items purchased, payment method chosen, and delivery status.</li>
        <li>Browsing preferences you set on this device: wishlist items and filters.</li>
      </ul>

      <h2>How it is used</h2>
      <p>
        Strictly to process and deliver your order, respond to grievances, and improve
        the shopping experience. We do not sell customer data to third parties.
      </p>

      <h2>Payment information</h2>
      <p>
        Card, UPI and net banking details are never stored by Kalamandir. In a
        production deployment these should be handled entirely by a PCI-DSS compliant
        payment gateway.
      </p>

      <h2>Your choices</h2>
      <p>
        You can clear your cart, wishlist and saved addresses at any time from within
        the site, or by clearing this site's data in your browser settings.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to our grievance officer — see{" "}
        <a href="#/contact-us">Contact &amp; Grievance</a>.
      </p>
    </div>
  );
}
