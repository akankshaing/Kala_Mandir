import React from "react";
import "./LegalPage.css";

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Kalamandir Shivam | Last updated: 12 September 2026</p>

      <p>
        Kalamandir Shivam ("we", "us", "our") operates this website (the "Site") for
        the sale of clothing and related products in India. This Privacy Policy
        explains what personal data we collect from visitors and customers, why we
        collect it, how we use and protect it, and what rights you have over it.
      </p>
      <p>
        This Policy is drafted with reference to the Information Technology Act, 2000
        and the Information Technology (Reasonable Security Practices and Procedures
        and Sensitive Personal Data or Information) Rules, 2011 ("SPDI Rules"), the
        Digital Personal Data Protection Act, 2023 ("DPDP Act") and the Digital
        Personal Data Protection Rules, 2025 (notified 13 November 2025 and being
        brought into force in phases by the Ministry of Electronics and Information
        Technology), and the Consumer Protection (E-Commerce) Rules, 2020.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect the following categories of personal data when you use the Site,
        place an order, or contact us:
      </p>
      <ul>
        <li>
          <strong>Identity and contact data:</strong> full name, delivery and billing
          address, email address, and phone number.
        </li>
        <li>
          <strong>Order data:</strong> items purchased, order value, size/colour
          selections, order history, and returns/exchange requests.
        </li>
        <li>
          <strong>Payment data:</strong> payment method chosen (prepaid or Cash on
          Delivery) and a payment or transaction reference number. We do not store your
          card, UPI, or net-banking credentials — these are collected and processed
          directly by our payment gateway partner (e.g., Razorpay, Stripe, or a
          similarly regulated payment aggregator), not by us.
        </li>
        <li>
          <strong>Technical data:</strong> IP address, browser type, device
          information, and cookies, where used for site functionality or analytics.
        </li>
        <li>
          <strong>Communications:</strong> messages you send us via email, phone, or
          any contact form, including for grievance redressal.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use your personal data only for the following purposes, consistent with the
        notice-and-consent requirements of the DPDP Act, 2023:
      </p>
      <ul>
        <li>To process, pack, ship, and deliver your orders.</li>
        <li>To verify Cash on Delivery orders and coordinate with our courier/logistics partners.</li>
        <li>To process prepaid payments through our payment gateway and to process refunds.</li>
        <li>To handle returns, exchanges, cancellations, and customer support queries.</li>
        <li>To send order confirmations, shipping updates, and delivery notifications.</li>
        <li>To comply with applicable tax, accounting, and consumer-protection record-keeping obligations.</li>
        <li>With your consent, to send promotional offers or updates (you may opt out at any time).</li>
      </ul>

      <h2>3. Disclosure of Information to Third Parties</h2>
      <p>
        We do not sell your personal data. We share personal data only where necessary
        to fulfil your order or as required by law, including with:
      </p>
      <ul>
        <li>Courier and logistics partners, to enable delivery of your order.</li>
        <li>Payment gateway and payment aggregator partners, to process prepaid payments and refunds.</li>
        <li>IT and website-hosting service providers who support the operation of the Site, under confidentiality obligations.</li>
        <li>Government authorities, regulators, or law-enforcement agencies, where disclosure is required by law or a valid legal process.</li>
      </ul>

      <h2>4. Data Storage and Security</h2>
      <p>
        We take reasonable security practices and procedures, as contemplated under
        Section 43A of the Information Technology Act, 2000 and the SPDI Rules, 2011,
        to protect your personal data against unauthorised access, alteration,
        disclosure, or destruction. Payment transactions are processed through
        PCI-DSS-compliant payment gateway partners; we do not store full payment card
        details on our own systems.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain personal data only for as long as necessary to fulfil the purposes
        described in this Policy, including order fulfilment, warranty/return
        handling, and compliance with applicable tax and consumer-protection
        record-keeping requirements, after which it is securely deleted or anonymised.
      </p>

      <h2>6. Your Rights as a Data Principal</h2>
      <p>
        Under the DPDP Act, 2023, you have the right, subject to the Act and Rules
        coming into effect in phases, to:
      </p>
      <ul>
        <li>Access a summary of the personal data we hold about you and how it is being processed.</li>
        <li>Request correction or updating of inaccurate or incomplete personal data.</li>
        <li>
          Request erasure of personal data that is no longer necessary for the purpose
          it was collected, subject to our legal retention obligations.
        </li>
        <li>Withdraw consent for optional processing, such as marketing communications, at any time.</li>
        <li>
          Nominate another individual to exercise these rights on your behalf in the
          event of death or incapacity.
        </li>
        <li>Register a grievance with us, and if unresolved, approach the Data Protection Board of India.</li>
      </ul>
      <p>
        To exercise any of these rights, please write to us using the contact details
        in Section 9 below.
      </p>

      <h2>7. Cookies</h2>
      <p>
        The Site may use cookies and similar technologies to remember your
        preferences, keep your cart/session active, and understand how visitors use
        the Site. You can disable cookies through your browser settings; doing so may
        affect certain Site features such as your shopping cart.
      </p>

      <h2>8. Children's Data</h2>
      <p>
        The Site is not directed at children. We do not knowingly collect personal
        data from individuals under 18 years of age without verifiable consent of a
        parent or lawful guardian, as required under the DPDP Act, 2023.
      </p>

      <h2>9. Grievance Officer / Contact for Privacy Queries</h2>
      <p>
        In accordance with the Information Technology Act, 2000 and the Consumer
        Protection (E-Commerce) Rules, 2020, any complaints or queries regarding this
        Privacy Policy or the processing of your personal data may be addressed to:
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
      <p>We will acknowledge and address grievances as expeditiously as possible.</p>

      <h2>10. Changes to this Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our
        practices or in applicable law, including as further provisions of the DPDP
        Rules, 2025 come into force. The updated version will be posted on this page
        with a revised 'Last updated' date.
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
