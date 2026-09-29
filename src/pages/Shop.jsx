import React from "react";
import { SHOP } from "../data/shopInfo.js";
import "./Shop.css";

export default function Shop() {
  const query = encodeURIComponent(SHOP.addressLines.join(", "));

  return (
    <div className="shop-page container">
      <h1>Visit our shop</h1>
      <p className="shop-intro">{SHOP.note}</p>

      <div className="shop-layout">
        <div className="shop-details">
          <section>
            <h2>Address</h2>
            <address>
              {SHOP.addressLines.map((line) => (
                <span key={line}>{line}<br /></span>
              ))}
            </address>
          </section>

          <section>
            <h2>Opening hours</h2>
            <p>{SHOP.hours}</p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              <a href={`tel:${SHOP.phoneLink}`}>{SHOP.phone}</a>
              <br />
              <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>
            </p>
          </section>

          <a
            className="btn"
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noreferrer"
          >
            Get directions
          </a>
        </div>

        <div className="shop-map">
          <iframe
            title="Shop location"
            src={`https://maps.google.com/maps?q=${query}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
