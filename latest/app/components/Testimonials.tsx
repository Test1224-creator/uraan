"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import "../styles/testimonials.css";

/*
 * SAMPLE REVIEWS: placeholders for the pitch, written around occasions and
 * huts from uraanbeachhuts.com. They are deliberately not attributed to
 * named people. Replace them with real guest reviews (e.g. from Uraan's
 * "Client Diaries" Instagram highlight) before this site goes live.
 */
const REVIEWS: {
  quote: string;
  who: string;
  meta: string;
  icon: ReactNode;
}[] = [
  {
    quote:
      "We brought our whole office for a team day. Uraan sorted the hut, the BBQ and the jet skis. All we had to do was show up.",
    who: "Corporate team outing",
    meta: "Paralia Resort · Turtle Beach",
    icon: (
      <>
        <rect x="3.5" y="7" width="17" height="12.5" rx="2.5" />
        <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" />
      </>
    ),
  },
  {
    quote:
      "Clean rooms, a working kitchen and a pool the kids never wanted to leave. Booking on WhatsApp took five minutes.",
    who: "Family weekend",
    meta: "Blue Ocean · Turtle Beach",
    icon: (
      <>
        <path d="M3 11 12 4l9 7" />
        <path d="M5.5 9.5V20h13V9.5M10 20v-5h4v5" />
      </>
    ),
  },
  {
    quote:
      "Our farewell for over 200 students went perfectly. Setup, sound and food were handled end to end by one team.",
    who: "Student farewell",
    meta: "Seadale · Turtle Beach",
    icon: (
      <>
        <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9z" />
        <path d="M6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11" />
      </>
    ),
  },
  {
    quote:
      "They decorated the deck with flowers and fairy lights for a birthday surprise. The sunset over the sea did the rest.",
    who: "Birthday setup",
    meta: "Grand Seadale · Turtle Beach",
    icon: (
      <>
        <path d="M4 20h16M5.5 20v-7h13v7M9 13V9.5M12 13V8.5M15 13V9.5" />
        <path d="M12 6.5c.8 0 1.2-.7 1.2-1.3S12 3.5 12 3.5s-1.2 1.1-1.2 1.7.4 1.3 1.2 1.3z" />
      </>
    ),
  },
  {
    quote:
      "A bonfire, music and the sound of the waves all night. Fairly priced, and the attendants were genuinely helpful.",
    who: "Friends' getaway",
    meta: "Escape · Turtle Beach",
    icon: (
      <path d="M12 3c1 3 4.5 4.5 4.5 9a4.5 4.5 0 0 1-9 0c0-2 1-3.2 2-4 .2 1.6 1 2.5 2 2.8C11 9 11 6 12 3z" />
    ),
  },
];

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.8l2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17.1 6.4 20l1.1-6.2L2.9 9.4l6.3-.9L12 2.8z" />
    </svg>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? (
        <path d="M19 12H5M11 6l-6 6 6 6" />
      ) : (
        <path d="M5 12h14M13 6l6 6-6 6" />
      )}
    </svg>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Keep the arrows' disabled state in sync with the scroll position.
  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  // Scroll by exactly one card (+ gap).
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>(".tm-card");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "16") || 16;
    el.scrollBy({ left: dir * (card.offsetWidth + gap) });
  };

  return (
    <section id="reviews" className="tm" aria-labelledby="tm-title">
      <div className="tm-inner">
        <header className="tm-head">
          <div>
            <p className="tm-eyebrow">Guest reviews</p>
            <h2 id="tm-title" className="tm-title">
              Our guests
              <em>say it best.</em>
            </h2>
          </div>

          <div className="tm-arrows">
            <button
              type="button"
              className="tm-arrow"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label="Previous review"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              className="tm-arrow tm-arrow--next"
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label="Next review"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </header>

        <ul ref={trackRef} className="tm-track" aria-label="Guest reviews">
          {REVIEWS.map((r) => (
            <li key={r.who} className="tm-card">
              <div className="tm-card-top">
                <span className="tm-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <span className="tm-stars" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} />
                  ))}
                </span>
              </div>

              <blockquote className="tm-quote">{r.quote}</blockquote>

              <div className="tm-person">
                <span className="tm-avatar" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {r.icon}
                  </svg>
                </span>
                <div>
                  <p className="tm-name">{r.who}</p>
                  <p className="tm-meta">{r.meta}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
