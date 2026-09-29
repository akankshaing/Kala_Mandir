
import React, { useState } from "react";
import "./LegalPage.css";

export default function ContactUs() {
  const [sent, setSent] = useState(false);
  const [ticket, setTicket] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = "KM-TCK-" + Math.floor(100000 + Math.random() * 900000);

    setTicket(newTicket);
    setSent(true);
  };

  return (
    <div className="legal-page">
      <h1>Contact &amp; Grievance</h1>

      <p className="legal-updated">
        We acknowledge every complaint within 48 hours and resolve it within
        one month.
      </p>

      <h2>Registered office</h2>

      <p>
        Kalamandir Shivam Retail Pvt. Ltd.
        <br />
        14 Bapu Bazar Road, Johari Bazaar, Jaipur, Rajasthan 302003, India
      </p>

      <h2>Customer care</h2>

      <p>
        care@kalamandir.example
        <br />
        +91 141 400 2020
        <br />
        Mon–Sat, 10am–7pm IST
      </p>

      <h2>Grievance officer</h2>

      <p>
        Ms. Aparna Rathi
        <br />
        grievance@kalamandir.example
        <br />
        +91 141 400 2021
      </p>
    </div>
  );
}

