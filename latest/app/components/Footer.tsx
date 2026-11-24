import Image from "next/image";
import "../styles/footer.css";
import logo from "../images/logo.png";

// Contact details and social links from uraanbeachhuts.com
const NAV = [
  { href: "#home", label: "Home" },
  { href: "#huts", label: "Huts" },
  { href: "#resorts", label: "Resorts" },
  { href: "#events", label: "Events" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://instagram.com/uraanbeachhuts", label: "Instagram" },
  { href: "https://facebook.com/uraanbeachhuts", label: "Facebook" },
  { href: "https://tiktok.com/@uraanbeachhuts", label: "TikTok" },
  { href: "https://www.linkedin.com/company/uraanbeachhuts/", label: "LinkedIn" },
];


export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-inner">
        <div className="ft-top">
          <div className="ft-brand">
            <a href="#home" className="ft-logo" aria-label="Uraan, back to top">
              <Image src={logo} alt="Uraan" sizes="88px" />
            </a>

            <div className="ft-contact">
              <div>
                <span className="ft-hint">{"// Shoot us an email"}</span>
                <a href="mailto:uraanbeachhuts@gmail.com">
                  uraanbeachhuts@gmail.com
                </a>
              </div>
              <div>
                <span className="ft-hint">{"// Call or WhatsApp"}</span>
                <a href="tel:+923002998889">+92 300 299 8889</a>
              </div>
              <div>
                <span className="ft-hint">{"// Find us"}</span>
                <p>Hawksbay Beach, Karachi, Pakistan</p>
              </div>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="ft-label">Navigation</p>
            <ul className="ft-links">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="ft-label">Socials</p>
            <ul className="ft-links">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>



        <div className="ft-bottom">
          <p>© 2026 Uraan – Karachi Beach Huts. All rights reserved.</p>
          <p>French · Sandspit · Turtle · Hawksbay · Himalaya · Tushan</p>
        </div>
      </div>
    </footer>
  );
}
