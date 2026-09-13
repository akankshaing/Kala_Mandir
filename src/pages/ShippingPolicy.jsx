import React from "react";
import "./LegalPage.css";

export default function ShippingPolicy() {
  return (
    <div className="legal-page">
      <h1>Shipping Policy</h1>
      <p className="legal-updated">Kalamandir Shivam | Last updated: 12 September 2026</p>

      <p>
        This Shipping Policy describes how Kalamandir Shivam processes, packs, and
        delivers orders placed on <em>[Insert your website URL]</em>. It is provided in
        line with the pre-purchase delivery-disclosure requirements of the Consumer
        Protection (E-Commerce) Rules, 2020, which require e-commerce sellers to
        clearly state estimated delivery timelines and shipping charges before an order
        is placed.
      </p>

      <h2>1. Shipping Coverage</h2>
      <p>
        We currently ship to serviceable pin codes across India only. Serviceability
        for a specific address is confirmed at checkout based on the pin code entered.
      </p>

      <h2>2. Order Processing Time</h2>
      <p>
        Orders are typically processed (packed and handed over to our courier partner)
        within 1–2 business days of order confirmation. Orders placed on Sundays or
        public holidays are processed on the next working day.
      </p>

      <h2>3. Estimated Delivery Timelines</h2>
      <p>
        Once shipped, orders are typically delivered within 4 to 7 business days,
        depending on your delivery location and the courier partner's serviceability.
        Delivery timelines may occasionally be longer due to weather, courier network
        disruptions, regional restrictions, or other circumstances beyond our
        reasonable control.
      </p>

      <h2>4. Shipping Charges</h2>
      <p>
        Shipping charges, if applicable, are displayed at checkout before you confirm
        your order. Any free-shipping thresholds or offers will be clearly indicated on
        the Site at the time of purchase.
      </p>

      <h2>5. Cash on Delivery (COD)</h2>
      <p>
        COD is available on eligible orders and pin codes. A COD handling fee, if
        applicable, will be shown at checkout. Please keep the exact amount ready at
        the time of delivery where possible.
      </p>

      <h2>6. Order Tracking</h2>
      <p>
        Once your order is shipped, you will receive a shipment confirmation with
        tracking details via email, SMS, or WhatsApp, wherever available, so you can
        track your order's status until delivery.
      </p>

      <h2>7. Failed Delivery Attempts</h2>
      <p>
        Our courier partners typically make up to 2–3 delivery attempts. If delivery
        cannot be completed due to an incorrect address, unavailability of the
        recipient, or refusal to accept the order, the item may be returned to us, and
        we will contact you to arrange re-shipment (additional shipping charges may
        apply) or process a refund as per our{" "}
        <a href="#/return-refund-policy">Return, Exchange &amp; Refund Policy</a>.
      </p>

      <h2>8. Damaged Shipments</h2>
      <p>
        Please inspect your package at the time of delivery where possible. If the
        outer packaging appears tampered with or damaged, you may refuse the delivery
        or report it to us within 48 hours with photos, and we will resolve it under
        our <a href="#/return-refund-policy">Return, Exchange &amp; Refund Policy</a>.
      </p>

      <h2>9. Contact for Shipping Queries</h2>
      <p className="legal-contact-block">
        Kalamandir Shivam
        <br />
        Registered address: Patna, Bihar, India
        <br />
        Email: <em>[Insert business email]</em>
        <br />
        Phone: <em>[Insert business phone number]</em>
        <br />
        Website: <em>[Insert your website URL]</em>
      </p>

      <div className="legal-callout">
        This document is a general template and does not constitute legal advice.
        Please confirm actual courier partners, serviceable pin codes, and shipping
        charges with your logistics provider before publishing.
      </div>
    </div>
  );
}
