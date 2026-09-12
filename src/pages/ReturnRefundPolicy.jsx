import React from "react";
import "./LegalPage.css";

export default function ReturnRefundPolicy() {
  return (
    <div className="legal-page">
      <h1>Return &amp; Refund Policy</h1>
      <p className="legal-updated">Last updated: 1 September 2026</p>

      <h2>Eligibility</h2>
      <p>
        Most items can be returned or exchanged within 7 days of delivery if they are
        unused, unwashed, and returned with original tags and packaging. Festive
        specials and made-to-order fabric cuts are made-to-order and are only
        returnable if the item received is defective, deficient, spurious, or
        materially different from what was described or agreed.
      </p>

      <h2>Late delivery</h2>
      <p>
        If a product is delivered later than the delivery schedule shown at checkout,
        you may refuse it and request a full refund — unless the delay was caused by a
        force majeure event outside our reasonable control.
      </p>

      <h2>How to start a return</h2>
      <p>
        Raise a request from <a href="#/account">My Account</a> or contact our
        grievance officer with your order number. You'll receive a complaint ticket
        number so you can track the status of your request at any time.
      </p>

      <h2>Refunds</h2>
      <p>
        Once a return is received and inspected, refunds are issued to your original
        payment method within a reasonable time, in line with applicable Reserve Bank
        of India guidelines. Cash-on-delivery orders are refunded via bank transfer or
        UPI, whichever you prefer.
      </p>

      <h2>Cancellation charges</h2>
      <p>
        We do not charge a cancellation fee for orders you cancel before they are
        shipped, and we will not charge you a fee we would not equally bear ourselves
        if we cancelled the order instead.
      </p>
    </div>
  );
}
