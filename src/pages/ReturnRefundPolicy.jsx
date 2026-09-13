import React from "react";
import "./LegalPage.css";

export default function ReturnRefundPolicy() {
  return (
    <div className="legal-page">
      <h1>Return, Exchange &amp; Refund Policy</h1>
      <p className="legal-updated">Kalamandir Shivam | Last updated: 12 September 2026</p>

      <p>
        This Return, Exchange &amp; Refund Policy applies to all purchases made on{" "}
        <em>[Insert your website URL]</em>, operated by Kalamandir Shivam. It is
        drafted in line with the disclosure requirements for returns, refunds, and
        exchanges under the Consumer Protection Act, 2019 and the Consumer Protection
        (E-Commerce) Rules, 2020.
      </p>

      <h2>1. Return / Exchange Window</h2>
      <p>
        You may request a return or exchange within 7 (seven) days of the date of
        delivery of your order. Requests raised after this window will not be
        accepted, except where the product delivered was defective, damaged, or
        materially different from what was ordered.
      </p>

      <h2>2. Conditions for Return/Exchange</h2>
      <p>To be eligible for a return or exchange, the product must:</p>
      <ul>
        <li>
          Be unused, unwashed, and unworn, with all original tags, labels, and
          packaging intact.
        </li>
        <li>
          Not be a product marked as "non-returnable" at the time of purchase (for
          example, innerwear or sale/clearance items, where applicable).
        </li>
        <li>Be accompanied by the original invoice or order confirmation.</li>
      </ul>

      <h2>3. How to Initiate a Return or Exchange</h2>
      <ul>
        <li>
          Email us at <em>[Insert business email]</em> or call{" "}
          <em>[Insert business phone number]</em> within 7 days of delivery, quoting
          your order number.
        </li>
        <li>
          Our team will confirm eligibility and arrange a reverse pickup where
          available, or share instructions for self-shipping the item back to us.
        </li>
        <li>
          Once the returned product is received and quality-checked, we will process
          your exchange or refund.
        </li>
      </ul>

      <h2>4. Refunds</h2>
      <p>Refunds are processed as follows, depending on the original mode of payment:</p>
      <ul>
        <li>
          Prepaid orders: refunded to the original payment method (bank account, UPI,
          or card) via our payment gateway, typically within 7–10 business days of the
          returned item passing quality check.
        </li>
        <li>
          Cash on Delivery (COD) orders: refunded via bank transfer or UPI to an
          account/UPI ID you provide, as we are unable to refund cash directly,
          typically within 7–10 business days of the returned item passing quality
          check.
        </li>
      </ul>
      <p>
        Shipping charges (if any were paid) are non-refundable, unless the return is
        due to a defective, damaged, or incorrect item being delivered.
      </p>

      <h2>5. Damaged, Defective, or Wrong Item Received</h2>
      <p>
        If you receive a damaged, defective, or incorrect product, please contact us
        within 48 hours of delivery with photographs/video of the product and
        packaging. We will arrange a free replacement or full refund, including any
        shipping charges paid, at your preference.
      </p>

      <h2>6. Non-Returnable Items</h2>
      <p>
        For hygiene reasons, innerwear, lingerie, and similar intimate apparel, as well
        as items explicitly marked "Final Sale" or "Non-Returnable" on the product
        page, cannot be returned or exchanged unless received damaged or defective.
      </p>

      <h2>7. Order Cancellation</h2>
      <ul>
        <li>
          Prepaid orders can be cancelled free of charge before the order is shipped;
          the amount will be refunded via the original payment method within 7–10
          business days.
        </li>
        <li>COD orders can be cancelled any time before dispatch by contacting us.</li>
        <li>
          Once an order has been shipped, it cannot be cancelled but may be returned
          after delivery as per Section 1 above.
        </li>
      </ul>

      <h2>8. Contact for Returns and Refunds</h2>
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
        Please review and adjust the timelines, non-returnable categories, and contact
        details to match your actual operational policies before publishing.
      </div>
    </div>
  );
}
