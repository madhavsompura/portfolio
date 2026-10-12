import { site } from "@/lib/site";

// Small brand icons, drawn inline so there are no image files to manage.
function Icon({ name }: { name: string }) {
  switch (name) {
    case "linkedin":
      return (
        <svg viewBox="0 0 40 40" aria-hidden>
          <rect width="40" height="40" rx="9" fill="#2f66c8" />
          <path fill="#fff" d="M11.2 15.5h4.1V29h-4.1zM13.25 9.4a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8zM18.1 15.5h3.9v1.85h.06c.55-1.04 1.88-2.14 3.87-2.14 4.14 0 4.9 2.72 4.9 6.26V29h-4.1v-6.5c0-1.55-.03-3.55-2.16-3.55-2.17 0-2.5 1.69-2.5 3.44V29h-4.1z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 40 40" aria-hidden>
          <defs>
            <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#fdc468" /><stop offset=".45" stopColor="#df4996" /><stop offset="1" stopColor="#7a4fd6" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="10" fill="url(#ig)" />
          <rect x="10.5" y="10.5" width="19" height="19" rx="5.5" fill="none" stroke="#fff" strokeWidth="2.4" />
          <circle cx="20" cy="20" r="4.6" fill="none" stroke="#fff" strokeWidth="2.4" />
          <circle cx="26" cy="14" r="1.4" fill="#fff" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 40 40" aria-hidden>
          <path fill="#fff" d="M22.6 18.2 31.4 8h-2.1l-7.6 8.9L15.6 8H8.5l9.2 13.4L8.5 32h2.1l8.1-9.4 6.5 9.4h7.1zm-2.9 3.3-.9-1.3L11.4 9.6h3.2l6 8.6.9 1.3 7.8 11.2h-3.2z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 40 40" aria-hidden>
          <circle cx="20" cy="20" r="18" fill="#d9477f" />
          <g fill="none" stroke="#7d1d46" strokeWidth="1.8" strokeLinecap="round" opacity=".75">
            <path d="M9 14.5c6 .8 14-.4 19.6-5.2" /><path d="M14.5 8.8c4.5 5 8.2 11.5 9.6 21.4" /><path d="M5.5 22.5c8.6-3.4 17-1.8 28.3 1.3" />
          </g>
        </svg>
      );
  }
}

export default function Contact() {
  return (
    <section className="ai gt" id="contact">
      <div className="ai-inner gt-inner">
        <p className="ct-eyebrow">Made it this far?</p>
        <h2 className="ct-title">Let&apos;s talk already</h2>

        <div className="ct-who">
          <strong>{site.name}</strong>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>

        <ul className="ct-socials">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href}>
                <span className="ct-icon"><Icon name={s.icon} /></span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="ct-copy">© {site.name} • {new Date().getFullYear()}</p>
      </div>
    </section>
  );
}
