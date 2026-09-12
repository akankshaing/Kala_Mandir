import React from "react";
import "./LegalPage.css";

export default function TermsAndConditions() {
  return (
    <div className="legal-page">
      <h1>Terms &amp; Conditions</h1>
      <p className="legal-updated">Last updated: 1 September 2026</p>

      <p>
        These terms govern your use of the Kalamandir website and any purchase made
        through it. By placing an order, you agree to the terms below.
      </p>

      <h2>1. About Kalamandir</h2>
      <p>
        Kalamandir Retail Pvt. Ltd. is an inventory-based e-commerce entity: we own the
        stock we sell and sell it to you directly, rather than hosting third-party
        sellers. Our registered office details are listed on the Contact &amp; Grievance page.
      </p>

      <h2>2. Orders and pricing</h2>
      <p>
        Every product page and the cart show the total price as a single figure along
        with a breakup of delivery charges and applicable tax, so you know exactly what
        you'll pay before checkout. We do not manipulate prices to take unfair
        advantage of demand, and we do not apply different prices to consumers in the
        same class without disclosing the difference.
      </p>

      <h2>3. Consent and checkout</h2>
      <p>
        We only record your consent to a purchase when you take a clear, affirmative
        action — for example, ticking a checkbox yourself. We never pre-select consent
        boxes on your behalf.
      </p>

      <h2>4. Cancellations</h2>
      <p>
        You may cancel an order free of charge any time before it is shipped. We do not
        charge a cancellation fee unless we would bear an equivalent charge ourselves
        for cancelling. If we cancel your order unilaterally, you will not be charged.
      </p>

      <h2>5. Returns, refunds and warranties</h2>
      <p>
        See our <a href="#/return-refund-policy">Return &amp; Refund Policy</a> for full
        detail on eligibility, timelines and how refunds are issued.
      </p>

      <h2>6. Product information</h2>
      <p>
        We take reasonable care to ensure that images, descriptions and specifications
        match the product you receive. Colours may vary slightly due to screen
        settings and studio lighting.
      </p>

      <h2>7. Grievance redressal</h2>
      <p>
        Any complaint raised with our grievance officer is acknowledged within 48 hours
        and resolved within one month of receipt. Contact details are on our{" "}
        <a href="#/contact-us">Contact &amp; Grievance</a> page.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These terms are governed by Indian law, including the Consumer Protection Act,
        2019 and the Consumer Protection (E-Commerce) Rules, 2020.
      </p>

      <div className="legal-callout">
        This is a demo storefront built for a front-end project brief. Replace this text
        with counsel-reviewed terms before taking real orders or payments.
      </div>
    </div>
  );
}
