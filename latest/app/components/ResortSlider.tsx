"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import "../styles/resort-slider.css";
// Property photos from uraanbeachhuts.com
import paralia from "../images/resort-paralia.jpg";
import grandSeadale from "../images/resort-grand-seadale.jpg";
import seadale from "../images/resort-seadale.jpg";
import blueOcean from "../images/hut-blue-ocean-a21.jpeg";
import escape from "../images/resort-escape.jpg";

type Slide = {
  code: string;
  lead: string;
  em: string;
  desc: string;
  photo: StaticImageData;
  alt: string;
  /** keeps the important part of the photo in frame */
  focus: string;
};

// Descriptions condensed from each property's page on uraanbeachhuts.com
const SLIDES: Slide[] = [
  {
    code: "A43",
    lead: "Paralia",
    em: "Resort",
    desc: "A luxurious beachfront villa with standard and deluxe rooms, a presidential suite, a full-depth pool and a 6,000 sq ft front deck.",
    photo: paralia,
    alt: "Paralia Resort lit up at night beside its pool",
    focus: "50% 55%",
  },
  {
    code: "A92",
    lead: "Grand",
    em: "Seadale",
    desc: "Two AC bedrooms with balconies, a 7,000 sq ft AC basement, a waterfall pool and a 7,000 sq ft sea-front deck.",
    photo: grandSeadale,
    alt: "Grand Seadale's glass-fronted villa and pool at dusk",
    focus: "50% 50%",
  },
  {
    code: "A91",
    lead: "Seadale",
    em: "Beach Hut",
    desc: "An infinity pool and jacuzzi facing the sea, a bonfire patio, a marbled rooftop and space for 1,000+ guests.",
    photo: seadale,
    alt: "Seadale's infinity pool looking out over the Arabian Sea",
    focus: "50% 60%",
  },
  {
    code: "A21",
    lead: "Blue",
    em: "Ocean",
    desc: "Two AC bedrooms, a 26 ft pool with a jacuzzi, a 50 × 80 ft sea-front deck, parking for 20 cars and solar power.",
    photo: blueOcean,
    alt: "Blue Ocean hut behind its bright blue swimming pool",
    focus: "50% 58%",
  },
  {
    code: "A69",
    lead: "Escape",
    em: "Beach Hut",
    desc: "A 60 × 100 ft front deck, a swimming pool, open dining space, an outdoor kitchen and a standby generator.",
    photo: escape,
    alt: "Escape hut's palm-lined courtyard dining area",
    focus: "50% 60%",
  },
];

const AUTOPLAY_MS = 6000;
const pad = (n: number) => String(n).padStart(2, "0");

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

export default function ResortSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;

  const go = useCallback(
    (to: number) => setIndex(((to % total) + total) % total),
    [total],
  );

  // Autoplay, paused on hover/focus and for reduced-motion users.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, go]);

  const slide = SLIDES[index];
  const upcoming = [1, 2].map((k) => (index + k) % total);

  return (
    <section id="resorts" className="rs" aria-labelledby="rs-heading">
      <h2 id="rs-heading" className="sr-only">
        Our premium resorts and huts
      </h2>
      <div className="rs-inner">
        <div
          className="rs-card"
          role="region"
          aria-roledescription="carousel"
          aria-label="Uraan resorts"
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(index + 1);
            if (e.key === "ArrowLeft") go(index - 1);
          }}
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.code}
              className={`rs-slide ${i === index ? "is-active" : ""}`}
              aria-hidden={i !== index}
            >
              <Image
                src={s.photo}
                alt={s.alt}
                fill
                loading="eager"
                className="rs-photo"
                style={{ objectPosition: s.focus }}
                sizes="(max-width: 900px) 100vw, 1150px"
              />
            </div>
          ))}

          <p className="rs-label">Premium stays</p>

          <div className="rs-bottom">
            <div className="rs-thumbs">
              {upcoming.map((i) => (
                <button
                  key={SLIDES[i].code}
                  type="button"
                  className="rs-thumb"
                  onClick={() => go(i)}
                  aria-label={`Show ${SLIDES[i].lead} ${SLIDES[i].em}`}
                >
                  <Image
                    src={SLIDES[i].photo}
                    alt=""
                    fill
                    sizes="170px"
                    style={{ objectPosition: SLIDES[i].focus }}
                  />
                  <span>
                    {SLIDES[i].lead} {SLIDES[i].em}
                  </span>
                </button>
              ))}
            </div>

            <div className="rs-text" aria-live={paused ? "polite" : "off"}>
              <p className="rs-eyebrow">Turtle Beach · {slide.code}</p>
              <h3 className="rs-title">
                {slide.lead} <em>{slide.em}</em>
              </h3>
              <p className="rs-desc">{slide.desc}</p>

              <div className="rs-controls">
                <span className="rs-count">
                  {pad(index + 1)}
                  <span>/{pad(total)}</span>
                </span>
                <span className="rs-progress" aria-hidden="true">
                  <i style={{ transform: `scaleX(${(index + 1) / total})` }} />
                </span>
                <div className="rs-arrows">
                  <button
                    type="button"
                    className="rs-arrow"
                    onClick={() => go(index - 1)}
                    aria-label="Previous resort"
                  >
                    <Arrow dir="left" />
                  </button>
                  <button
                    type="button"
                    className="rs-arrow rs-arrow--next"
                    onClick={() => go(index + 1)}
                    aria-label="Next resort"
                  >
                    <Arrow dir="right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
