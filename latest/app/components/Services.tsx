import Image, { type StaticImageData } from "next/image";
import "../styles/services.css";
// Photos: Uraan's own event, catering and activity posts (overlays cropped out)
import eventsPhoto from "../images/service-events.jpg";
import cateringPhoto from "../images/service-catering.jpg";
import activitiesPhoto from "../images/service-activities.jpg";

const QUOTE_URL =
  "https://wa.me/923002998889?text=" +
  encodeURIComponent("Hi Uraan! I'd like a quote for an event at a beach hut.");

// Copy from the services on uraanbeachhuts.com
const SERVICES: {
  num: string;
  name: string;
  desc: string;
  tags: string[];
  photo: StaticImageData;
  alt: string;
}[] = [
  {
    num: "01",
    name: "One-window events",
    desc: "Corporate retreats, family reunions, birthdays and student farewells. One team handles the booking, setup and logistics.",
    tags: ["Corporate", "Family", "Students"],
    photo: eventsPhoto,
    alt: "A sea-view event setup with floral arches, a flower-lined aisle and pink tables",
  },
  {
    num: "02",
    name: "Catering, your way",
    desc: "From simple BBQ spreads to full-course menus, tailored to your group size, taste and budget.",
    tags: ["BBQ", "Full-course", "Custom menus"],
    photo: cateringPhoto,
    alt: "An open-air dining setup with wooden tables, hanging lights and flower baskets",
  },
  {
    num: "03",
    name: "Activities for every mood",
    desc: "Jet skiing, scuba diving and snorkelling for the adventurous, and bonfire nights by the waves for everyone else.",
    tags: ["Jet ski", "Scuba", "Bonfire"],
    photo: activitiesPhoto,
    alt: "A smiling rider on a jet ski off the Karachi coast",
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

export default function Services() {
  return (
    <section id="events" className="sv" aria-labelledby="sv-title">
      <div className="sv-inner">
        <header className="sv-head">
          <div>
            <p className="sv-eyebrow">What we offer</p>
            <h2 id="sv-title" className="sv-title">
              Everything for your
              <em>beach day</em>
            </h2>
          </div>

          <div className="sv-aside">
            <p>
              One window for every celebration. We handle the booking, setup,
              catering and activities so you can focus on the occasion.
            </p>
            <a
              href={QUOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sv-cta"
            >
              Get a quote
              <ArrowIcon />
            </a>
          </div>
        </header>

        <ul className="sv-grid">
          {SERVICES.map((s) => (
            <li key={s.num} className="sv-item">
              <div className="sv-media">
                <Image
                  src={s.photo}
                  alt={s.alt}
                  fill
                  className="sv-photo"
                  sizes="(max-width: 680px) 80vw, (max-width: 900px) 46vw, 33vw"
                />
                <ul className="sv-tags" aria-label="Includes">
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="sv-body">
                <div className="sv-title-row">
                  <h3 className="sv-name">{s.name}</h3>
                  <span className="sv-num" aria-hidden="true">
                    /{s.num}
                  </span>
                </div>
                <p className="sv-desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
