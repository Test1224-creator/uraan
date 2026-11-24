import Image from "next/image";
import "../styles/cta.css";
// Seadale at dusk, from the uraanbeachhuts.com gallery
import photo from "../images/cta-seadale-dusk.jpg";
import { BOOKING_URL } from "../lib/booking";


export default function CallToAction() {
  return (
    <section id="contact" className="ct" aria-labelledby="ct-title">
      <Image
        src={photo}
        alt="Seadale's pool deck at dusk with the Arabian Sea behind"
        fill
        sizes="100vw"
        quality={80}
        className="ct-photo"
      />

      <div className="ct-content">
        <p className="ct-eyebrow">Book your beach day</p>
        <h2 id="ct-title" className="ct-title">
          Your day by the sea starts with <em>one message.</em>
        </h2>
        <p className="ct-text">
          Huts, resorts and events across Karachi&apos;s coastline. Tell us
          your date and group size, and we&apos;ll handle the rest.
        </p>

        <div className="ct-actions">
          <a href={BOOKING_URL} className="ct-btn ct-btn--primary">
            Book Now
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
          <a href="tel:+923002998889" className="ct-btn ct-btn--ghost">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" />
            </svg>
            Call 0300 2998889
          </a>
        </div>
      </div>
    </section>
  );
}
