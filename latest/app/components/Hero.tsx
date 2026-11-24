import Image from "next/image";
import "../styles/hero.css";
import photo from "../images/hero-dusk-hut.jpeg";
import cutout from "../images/hero-dusk-hut-fg.webp";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/uraanbeachhuts",
    icon: (
      <path
        fill="currentColor"
        d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z"
      />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/uraanbeachhuts",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </g>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@uraanbeachhuts",
    icon: (
      <path
        fill="currentColor"
        d="M16.6 3c.3 2.1 1.6 3.6 3.6 3.9v3.2a7 7 0 0 1-3.6-1.1v6.5c0 3.2-2.6 5.5-5.7 5.5a5.5 5.5 0 0 1-5.5-5.5c0-3.3 2.9-5.8 6.3-5.3v3.3c-1.4-.4-3 .5-3 2 0 1.2 1 2.1 2.2 2.1 1.3 0 2.3-1 2.3-2.5V3h3.4z"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/uraanbeachhuts/",
    icon: (
      <path
        fill="currentColor"
        d="M6.5 8.2H3V20h3.5V8.2zM4.8 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM21 13.4c0-3.2-1.7-5.4-4.8-5.4-1.6 0-2.7.8-3.2 1.7V8.2H9.6V20h3.5v-6c0-1.6.6-2.8 2.1-2.8s2.3 1.1 2.3 2.8v6H21v-6.6z"
      />
    ),
  },
];

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

/**
 * The giant word, drawn as SVG so it scales as one piece.
 * The viewBox is cropped to the letters' ink (Manrope 800 at 268px:
 * "U" starts at x=16.75, "N" ends at x=928.3), so the "U" lines up
 * exactly with the logo's left edge — no empty side-bearing.
 */
function Word({ variant }: { variant: "fill" | "outline" }) {
  return (
    <svg
      className={`hx-word hx-word--${variant}`}
      viewBox="16.75 0 911.6 196"
      aria-hidden={variant === "outline" ? true : undefined}
      role={variant === "fill" ? "img" : undefined}
      aria-label={variant === "fill" ? "Uraan" : undefined}
    >
      {variant === "fill" && (
        <defs>
          <linearGradient id="hx-word-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#fdf3ea" />
            <stop offset="100%" stopColor="#f6d2b4" />
          </linearGradient>
        </defs>
      )}
      <text
        x="0"
        y="194"
        fontSize="268"
        fill={variant === "fill" ? "url(#hx-word-gradient)" : undefined}
      >
        URAAN
      </text>
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hx" aria-label="Uraan beach huts">
      <div className="hx-stage">
        <Image
          src={photo}
          alt="A modern Uraan beach hut at dusk with a glowing pool and deck"
          fill
          priority
          quality={85}
          sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
          className="hx-photo"
        />
        <Image
          src={cutout}
          alt=""
          fill
          priority
          quality={85}
          sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
          className="hx-cutout"
        />
      </div>

      <div className="hx-shade-top" aria-hidden="true" />
      <div className="hx-shade-bottom" aria-hidden="true" />

      <div className="hx-top">
        <h1 className="hx-title">
          <span className="hx-word-wrap">
            <Word variant="fill" />
            <Word variant="outline" />
          </span>
        </h1>
        <p className="hx-beaches">
          French · Turtle · Hawksbay · Sandspit · Himalaya — Karachi
        </p>
        <a href="#huts" className="hx-explore">
          Explore Huts
          <ArrowIcon />
        </a>
      </div>

      <div className="hx-bottom">
        <ul className="hx-socials" aria-label="Uraan on social media">
          {SOCIALS.map(({ label, href, icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hx-social"
                aria-label={label}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {icon}
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
