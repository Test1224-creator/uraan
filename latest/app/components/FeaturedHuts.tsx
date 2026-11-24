import Image, { type StaticImageData } from "next/image";
import "../styles/featured-huts.css";
import paralia from "../images/hut-paralia-a43.jpeg";
import blueOcean from "../images/hut-blue-ocean-a21.jpeg";
import seadale from "../images/hut-seadale-a91.jpg";
import { BOOKING_URL } from "../lib/booking";

type Hut = {
  code: string;
  name: string;
  tagline: string;
  beach: string;
  badge?: string;
  specs: string[];
  photo: StaticImageData;
  alt: string;
  /** keeps the important part of the photo in frame when cropped */
  focus: string;
};

// Details taken from each hut's page on uraanbeachhuts.com
const HUTS: Hut[] = [
  {
    code: "A43",
    name: "Paralia Resort",
    tagline: "Karachi's first 5-star beach resort",
    beach: "Turtle Beach",
    badge: "Premium",
    specs: ["5 rooms + presidential suite", "Full-depth pool", "6,000 sq ft deck"],
    photo: paralia,
    alt: "Paralia Resort lit up at dusk with its glowing pool",
    focus: "35% 50%",
  },
  {
    code: "A21",
    name: "Blue Ocean",
    tagline: "Pool, jacuzzi & a sea-front deck",
    beach: "Turtle Beach",
    specs: ["2 AC bedrooms", "Pool & jacuzzi", "20-car parking"],
    photo: blueOcean,
    alt: "Blue Ocean hut behind its bright blue swimming pool",
    focus: "50% 45%",
  },
  {
    code: "A91",
    name: "Seadale",
    tagline: "Infinity pool, made for big events",
    beach: "Turtle Beach",
    badge: "Events",
    specs: ["Infinity pool", "BBQ patio", "1,000+ guests"],
    photo: seadale,
    alt: "Seadale's glass-fronted villa lit up at night",
    focus: "55% 50%",
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

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export default function FeaturedHuts() {
  return (
    <section id="huts" className="fh" aria-labelledby="fh-title">
      <div className="fh-inner">
        <header className="fh-head">
          <div>
            <p className="fh-eyebrow">Our huts</p>
            <h2 id="fh-title" className="fh-title">
              Featured
              <em>Beach Huts</em>
            </h2>
          </div>

          <div className="fh-aside">
            <p>
              Hand-picked huts on Karachi&apos;s coastline: clean, fully
              furnished and sea-facing. Message us for today&apos;s rates and
              availability.
            </p>
            <a href="#huts" className="fh-view-all">
              View all huts
              <ArrowIcon />
            </a>
          </div>
        </header>

        <ul className="fh-grid">
          {HUTS.map((hut) => (
            <li key={hut.code} className="fh-card">
              <Image
                src={hut.photo}
                alt={hut.alt}
                fill
                className="fh-photo"
                style={{ objectPosition: hut.focus }}
                sizes="(max-width: 680px) 84vw, (max-width: 900px) 46vw, 33vw"
              />

              <div className="fh-chips">
                <span className="fh-chip">{hut.beach}</span>
                <span className={`fh-chip ${hut.badge ? "fh-chip--accent" : ""}`}>
                  {hut.badge ? `${hut.badge} · ${hut.code}` : hut.code}
                </span>
              </div>

              <div className="fh-body">
                <div className="fh-name-row">
                  <div>
                    <h3 className="fh-name">{hut.name}</h3>
                    <p className="fh-tagline">{hut.tagline}</p>
                  </div>
                  <a
                    href={BOOKING_URL}
                    className="fh-enquire"
                    aria-label={`Book ${hut.name}`}
                  >
                    <ArrowIcon />
                  </a>
                </div>

                <ul className="fh-specs" aria-label="Key features">
                  {hut.specs.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>

                <p className="fh-location">
                  <PinIcon />
                  {hut.beach}, Karachi
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
