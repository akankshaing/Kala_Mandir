import React from "react";
import "./LegalPage.css";

export default function TermsAndConditions() {
  return (
    <div className="legal-page">
      <h1>Terms and Conditions</h1>
      <p className="legal-updated">Kalamandir Shivam | Last updated: 12 September 2026</p>

      <p>
        These Terms and Conditions ("Terms") govern your access to and use of{" "}
        <em>[Insert your website URL]</em> (the "Site") operated by Kalamandir Shivam, a
        sole proprietorship based in Patna, Bihar, India. By accessing the Site or
        placing an order, you agree to be bound by these Terms, our{" "}
        <a href="#/privacy-policy">Privacy Policy</a>, and our{" "}
        <a href="#/return-refund-policy">Return, Exchange &amp; Refund Policy</a> and{" "}
        <a href="#/shipping-policy">Shipping Policy</a>, each of which is incorporated by
        reference.
      </p>

      <h2>1. About Us</h2>
      <p>
        Kalamandir Shivam is a sole proprietorship concern engaged in the online retail
        sale of clothing and related accessories, based in Patna, Bihar, India.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        To place an order on the Site, you must be at least 18 years of age and capable
        of entering into a legally binding contract under the Indian Contract Act,
        1872. If you are under 18, you may use the Site only with the involvement of a
        parent or legal guardian.
      </p>

      <h2>3. Products, Pricing, and Availability</h2>
      <ul>
        <li>
          We make reasonable efforts to display product images, descriptions, sizes,
          and colours accurately; minor variations may occur due to display/screen
          settings or manufacturing batches.
        </li>
        <li>
          All prices are listed in Indian Rupees (INR) and are inclusive of applicable
          taxes unless stated otherwise.
        </li>
        <li>
          Products are subject to availability. In the rare event that an ordered item
          is out of stock after your order is placed, we will inform you and offer a
          replacement, alternate size/colour, or a full refund.
        </li>
        <li>
          We reserve the right to correct any pricing or product-description errors and
          to cancel any order affected by such an error, with a full refund.
        </li>
      </ul>

      <h2>4. Orders and Payment</h2>
      <ul>
        <li>
          By placing an order, you make an offer to purchase the selected product(s),
          which we may accept or decline (for example, in cases of suspected fraud,
          pricing errors, or non-serviceability).
        </li>
        <li>
          We accept payment via prepaid methods (UPI, cards, net banking, wallets)
          through our third-party payment gateway partner, as well as Cash on Delivery
          (COD), where available.
        </li>
        <li>
          We do not store your card or banking credentials; these are processed
          directly and securely by our payment gateway partner.
        </li>
      </ul>

      <h2>5. Returns, Exchanges, Refunds, and Shipping</h2>
      <p>
        Returns, exchanges, cancellations, and refunds are governed by our separate{" "}
        <a href="#/return-refund-policy">Return, Exchange &amp; Refund Policy</a>, and
        delivery timelines and charges are governed by our separate{" "}
        <a href="#/shipping-policy">Shipping Policy</a>, both of which form part of
        these Terms.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content on the Site — including the Kalamandir Shivam name and logo,
        product photographs, descriptions, graphics, and layout — is the property of
        Kalamandir Shivam or its licensors and is protected under the Copyright Act,
        1957 and the Trade Marks Act, 1999. You may not copy, reproduce, or use this
        content for any commercial purpose without our prior written consent.
      </p>

      <h2>7. User Conduct</h2>
      <p>
        You agree not to: (a) use the Site for any unlawful purpose; (b) provide false
        or misleading order/delivery information; (c) attempt to interfere with the
        security or proper functioning of the Site; or (d) misuse the Site's
        return/refund process, including through repeated fraudulent claims.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the extent permitted by applicable law, Kalamandir Shivam shall not be
        liable for any indirect, incidental, or consequential loss arising from your
        use of the Site or delay in delivery caused by circumstances beyond our
        reasonable control (including courier delays, force majeure events, or
        incorrect information provided by you). Nothing in these Terms limits any right
        or remedy available to you as a "consumer" under the Consumer Protection Act,
        2019.
      </p>

      <h2>9. Grievance Redressal</h2>
      <p>
        In accordance with the Consumer Protection (E-Commerce) Rules, 2020 and the
        Information Technology Act, 2000, any complaints regarding products, orders, or
        this Site may be addressed to our Grievance Officer at the contact details
        below. We aim to acknowledge complaints promptly and resolve them in a
        reasonable time frame.
      </p>
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

      <h2>10. Governing Law and Jurisdiction</h2>
      <p>
        These Terms are governed by the laws of India. Subject to the consumer-forum
        jurisdiction available to you under the Consumer Protection Act, 2019 (which
        allows you to file a complaint in the jurisdiction where you reside or work),
        any other disputes shall be subject to the exclusive jurisdiction of the courts
        at Patna, Bihar.
      </p>

      <h2>11. Changes to these Terms</h2>
      <p>
        We may revise these Terms from time to time to reflect changes in our business
        practices or applicable law. Continued use of the Site after such changes
        constitutes your acceptance of the revised Terms.
      </p>

      <div className="legal-callout">
        This document is a general template based on applicable Indian law as of the
        date above and does not constitute legal advice. We recommend having it
        reviewed by a lawyer licensed in India before publishing it on your live
        website, and updating the placeholders (email, phone, website) with your
        actual details.
      </div>
    </div>
  );
}
