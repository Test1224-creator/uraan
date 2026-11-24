import type { ReactNode } from "react";
import CountUp from "./CountUp";
import "../styles/stats.css";

import { BOOKING_URL } from "../lib/booking";

// Figures and copy from the About section of uraanbeachhuts.com
const STATS: {
  to: number;
  suffix?: string;
  label: string;
  desc: string;
  icon: ReactNode;
  featured?: boolean;
}[] = [
  {
    to: 6,
    suffix: "+",
    label: "Years by the sea",
    desc: "Helping families, offices and student groups enjoy the coast in comfort and privacy.",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    to: 2000,
    suffix: "+",
    label: "Completed bookings",
    desc: "From weekend getaways and birthdays to corporate retreats and student farewells.",
    featured: true,
    icon: <path d="M4 12.5 9 17.5 20 6.5" />,
  },
  {
    to: 25,
    label: "Beach huts",
    desc: "Clean, fully furnished and sea-facing, across six of Karachi's beaches.",
    icon: (
      <>
        <path d="M3 11 12 4l9 7" />
        <path d="M5.5 9.5V20h13V9.5M10 20v-5h4v5" />
      </>
    ),
  },
  {
    to: 25,
    suffix: "K+",
    label: "Social following",
    desc: "A community that follows our huts, events and offers every day.",
    icon: (
      <path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7.3 4.5 4.5 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
    ),
  },
];

const BEACHES = ["French", "Sandspit", "Turtle", "Hawksbay", "Himalaya", "Tushan"];

function ArrowIcon() {
  return (
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
  );
}

export default function Stats() {
  return (
    <section id="why-uraan" className="st" aria-labelledby="st-title">
      <div className="st-inner">
        <div>
          <p className="st-eyebrow">Why Uraan</p>
          <h2 id="st-title" className="st-title">
            A name Karachi <em>trusts</em> by the sea.
          </h2>
          <p className="st-text">
            For six years, Uraan has been the one window for beach huts in
            Karachi. One team handles the booking, setup, catering and
            activities, so you can focus on the occasion.
          </p>

          <ul className="st-beaches" aria-label="Beaches we cover">
            {BEACHES.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <a href={BOOKING_URL} className="st-cta">
            Plan your beach day
            <ArrowIcon />
          </a>
        </div>

        <ul className="st-grid">
          {STATS.map((s) => (
            <li
              key={s.label}
              className={`st-tile ${s.featured ? "st-tile--featured" : ""}`}
            >
              <span className="st-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {s.icon}
                </svg>
              </span>
              <p className="st-number">
                <CountUp to={s.to} suffix={s.suffix} suffixClassName="st-suffix" />
              </p>
              <p className="st-label">{s.label}</p>
              <p className="st-desc">{s.desc}</p>
            </li>
          ))}
        </ul>
      </div>

      <svg
        className="st-waves"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 120 C 240 80, 480 160, 720 120 S 1200 80, 1440 120" />
        <path d="M0 140 C 240 100, 480 180, 720 140 S 1200 100, 1440 140" />
        <path d="M0 160 C 240 120, 480 200, 720 160 S 1200 120, 1440 160" />
      </svg>
    </section>
  );
}
