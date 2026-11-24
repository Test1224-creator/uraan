"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "../styles/navbar.css";
import logo from "../images/logo.png";
import { BOOKING_URL } from "../lib/booking";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "huts", label: "Huts" },
  { id: "resorts", label: "Resorts" },
  { id: "events", label: "Events" },
  { id: "contact", label: "Contact" },
] as const;


function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Drawer open: lock page scroll, close on Escape, focus the close button.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Highlight the tab whose section is currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const headerClass = open ? "un-header un-open" : "un-header";

  const renderLinks = (className = "un-link") =>
    NAV_LINKS.map(({ id, label }) => (
      <a
        key={id}
        href={`#${id}`}
        className={`${className} ${active === id ? "un-active" : ""}`}
        aria-current={active === id ? "page" : undefined}
        onClick={() => {
          setActive(id);
          setOpen(false);
        }}
      >
        {label}
      </a>
    ));

  return (
    <header className={headerClass}>
      <nav className="un-bar" aria-label="Main">
        {/* mobile only: opens the side drawer */}
        <button
          type="button"
          className="un-menu-button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </button>

        <a href="#home" className="un-brand" aria-label="Uraan home">
          <Image
            src={logo}
            alt="Uraan"
            className="un-brand-logo"
            sizes="(max-width: 480px) 88px, 96px"
            priority
          />
        </a>

        <div className="un-pill">{renderLinks()}</div>

        <div className="un-actions">
          <a href={BOOKING_URL} className="un-book"
          >
            Book Now
          </a>
        </div>
      </nav>

      {/* ── Mobile side drawer (slides in from the left) ── */}
      <div
        className="un-backdrop"
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
      <aside
        id="mobile-menu"
        className="un-drawer"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="un-drawer-head">
          <Image src={logo} alt="Uraan" className="un-drawer-logo" sizes="88px" />
          <button
            ref={closeRef}
            type="button"
            className="un-drawer-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="un-drawer-links" aria-label="Mobile">
          {renderLinks("un-drawer-link")}
        </nav>
      </aside>
    </header>
  );
}