"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { rich } from "@/lib/rich";
import { notes, timeline, tldr } from "@/lib/about";

type Tab = "story" | "tldr" | "timeline";

const tabs: { key: Tab; label: string; icon: ReactNode }[] = [
  {
    key: "story",
    label: "Story",
    icon: <path d="M4 7h16M4 12h16M4 17h10" />,
  },
  {
    key: "tldr",
    label: "TL;DR",
    icon: <path d="M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01" />,
  },
  {
    key: "timeline",
    label: "Timeline",
    icon: <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 10h16M8 3v3M16 3v3" />,
  },
];

export default function About() {
  const [tab, setTab] = useState<Tab>("story");
  const ref = useRef<HTMLElement>(null);

  // Fade the section in when it scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length].key;
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section className="about panel reveal" id="about" ref={ref}>
      <div className="about-head">
        <h2 className="kicker">About</h2>
        <div className="seg" role="tablist" aria-label="About views">
          {tabs.map((t, i) => (
            <button
              key={t.key}
              id={`tab-${t.key}`}
              role="tab"
              aria-selected={tab === t.key}
              aria-controls={`panel-${t.key}`}
              tabIndex={tab === t.key ? 0 : -1}
              className={tab === t.key ? "on" : ""}
              onClick={() => setTab(t.key)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {t.icon}
              </svg>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={`about-body${tab === "tldr" ? " is-tldr" : ""}`}
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        key={tab === "timeline" ? "timeline" : "text"}
      >
        {/* Story and TL;DR are the same paragraph: switching only strikes / un-strikes the skippable parts, so nothing moves. */}
        {tab !== "timeline" && tldr.map((p, i) => <p key={i} className="tldr-text">{rich(p)}</p>)}

        {tab === "timeline" && (
          <ol className="tl">
            {timeline.map((t, i) => (
              <li
                key={t.year}
                className={i === timeline.length - 1 ? "now" : ""}
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="tl-year">{t.year}</span>
                <span className="tl-dot" />
                <div>
                  <strong>{t.title}</strong>
                  <p>{t.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <ul className="notes">
        {notes.map((n, i) => (
          <li key={n.label} className={`note ${n.tone}`} style={{ "--r": `${[-3, 2, -2, 3][i]}deg` } as React.CSSProperties}>
            <span className="note-emoji" aria-hidden>{n.emoji}</span>
            <span className="note-label">{n.label}</span>
            <strong>{n.href ? <a className="note-link" href={n.href}>{n.value}</a> : n.value}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
