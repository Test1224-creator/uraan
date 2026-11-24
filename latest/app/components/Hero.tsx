import Image from "next/image";
import "../styles/hero.css";
// The clean square photo (2000 x 2000, no text), used at every screen size.
import photo from "../images/hero-ocean-mobile.webp";

// The square photo covers the hero: full width on landscape screens,
// full height on portrait ones (see .hx-stage in hero.css).
const PHOTO_SIZES = "(max-aspect-ratio: 1/1) 100vh, 100vw";

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
 * Letters are spaced 30 units apart. The viewBox is cropped to the ink
 * (Manrope 800 at 268px: "U" starts at x=16.75; "N" ends at
 * 928.3 + 4 gaps × 30 = 1048.3), so centring is exact at every size.
 */
function Word() {
  return (
    <svg
      className="hx-word"
      viewBox="16.75 0 1031.6 196"
      role="img"
      aria-label="Uraan"
    >
      <defs>
        <linearGradient id="hx-word-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#fdf3ea" />
          <stop offset="100%" stopColor="#f6d2b4" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="194"
        fontSize="268"
        letterSpacing="30"
        fill="url(#hx-word-gradient)"
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
          alt="A sea-view deck at an Uraan beach hut, looking out over the Arabian Sea"
          fill
          sizes={PHOTO_SIZES}
          quality={90}
          loading="eager"
          fetchPriority="high"
          className="hx-photo"
        />
        {/* Same photo again, cut to just the sea below the horizon and laid
            over the URAAN word, so the letters look like they sink into the
            water (see .hx-sea in hero.css). Decorative only. */}
        <Image
          src={photo}
          alt=""
          aria-hidden="true"
          fill
          sizes={PHOTO_SIZES}
          quality={90}
          loading="eager"
          className="hx-photo hx-sea"
        />
      </div>

      <div className="hx-shade-top" aria-hidden="true" />
      <div className="hx-shade-bottom" aria-hidden="true" />

      <div className="hx-top">
        <h1 className="hx-title">
          <span className="hx-word-wrap">
            <Word />
          </span>
        </h1>
        {/* desktop: these two lines sit on the deck floor (see .hx-sub) */}
        <div className="hx-sub">
          <p className="hx-beaches">
            French · Turtle · Hawksbay · Sandspit · Himalaya — Karachi
          </p>
          <a href="#huts" className="hx-explore">
            Explore Huts
            <ArrowIcon />
          </a>
        </div>
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
