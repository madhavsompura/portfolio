"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { journal as j } from "@/lib/journal";
import { site } from "@/lib/site";

// Deterministic jagged "torn paper" edge.
const tornPath = (() => {
  const pts: string[] = [];
  for (let x = 0; x <= 1440; x += 12) {
    const r = Math.abs(Math.sin(x * 12.9898) * 43758.5453) % 1;
    pts.push(`L${x},${(5 + r * 10).toFixed(1)}`);
  }
  return `M0,28 ${pts.join(" ")} L1440,28 Z`;
})();

function Torn({ className }: { className: string }) {
  return (
    <svg className={`torn ${className}`} viewBox="0 0 1440 28" preserveAspectRatio="none" aria-hidden>
      <path d={tornPath} />
    </svg>
  );
}

// The right page: things I love doing, as files on a desktop.
const items: { label: string; pos: CSSProperties; icon: React.ReactNode; tip?: string }[] = [
  { label: "BikeRides.mov", pos: { left: "7%", top: "8%" }, icon: <span className="ic emoji">🏍️</span>, tip: "Long rides, open roads" },
  { label: "AppsIBuilt", pos: { left: "50%", top: "5%" }, icon: <span className="ic folder" />, tip: "Ideas → working apps" },
  { label: "Hyrox.log", pos: { right: "6%", top: "24%" }, icon: <span className="ic emoji">🏋️</span>, tip: "Run, sled, burpees, repeat" },
  {
    label: "NextRace.pdf",
    pos: { left: "3%", top: "40%" },
    icon: (
      <span className="ic bib">
        <i className="pin l" />
        <i className="pin r" />
        <small>KAVERI TRAILS</small>
        <b>21K</b>
        <small>next marathon</small>
      </span>
    ),
    tip: "Next up: a 21K trail run",
  },
  {
    label: "VibeCoding.md",
    pos: { left: "9%", bottom: "9%" },
    icon: (
      <span className="ic term">
        <i className="dots"><b style={{ background: "#ff6b6b" }} /><b style={{ background: "#ffb938" }} /><b style={{ background: "#5ed36b" }} /></i>
        &gt; vibe coding_
      </span>
    ),
    tip: "Building apps with AI",
  },
  { label: "CoffeeLover.png", pos: { right: "5%", bottom: "10%" }, icon: <span className="ic emoji">☕</span>, tip: "Always chasing a good cup" },
];

export default function Journal() {
  const [open, setOpen] = useState(false);

  return (
    <section className="journal-band" id="journal" aria-label="Journal — who I am">
      <Torn className="top" />
      <Torn className="bot" />

      <div className="stage">
        <div className={`book${open ? " open" : ""}`}>
          {/* Right page (static) */}
          <div className="pg right" inert={!open}>
            {items.map((it) => (
              <div key={it.label} className={`file ${"right" in it.pos ? "tip-r" : Number.parseFloat(String(it.pos.left)) < 20 ? "tip-l" : ""}`} style={it.pos}>
                {it.icon}
                <span>{it.label}</span>
                {it.tip && <em className="file-tip">{it.tip}</em>}
              </div>
            ))}

            <div className="polaroid">
              <span className="tag">@{j.handle}</span>
              <div className="ph">
                {site.photo ? <Image src={site.photo} alt={site.name} fill sizes="300px" /> : <span>Your photo</span>}
              </div>
            </div>
          </div>

          <div className="spine" aria-hidden />

          {/* The cover flips open; its back face is the left page */}
          <div className="leaf">
            <div className="face front">
              <button className="cover-btn" onClick={() => setOpen(true)} aria-expanded={open} aria-label="Open journal" tabIndex={open ? -1 : 0}>
                <span className="cv-title">Journal</span>
                <span className="collage" aria-hidden>
                  <i className="paper" />
                  <i className="stamp s1"><em>🍉</em></i>
                  <i className="stamp s2"><em>🌸</em></i>
                  <i className="stamp s3"><em>🏙️</em></i>
                  <i className="seal" />
                  <i className="fl f1">🌾</i>
                  <i className="fl f2">🌼</i>
                  <i className="fl f3">🌿</i>
                </span>
                <span className="barcode" aria-hidden />
                <span className="cv-name">{site.firstName.toLowerCase().split("").join(" ")}</span>
              </button>
              <span className="ribbon" aria-hidden />
            </div>

            <div className="face back" inert={!open}>
              <h3 className="jn-name">{site.name}</h3>
              <div className="jn-row">
                <span className="role">{site.role}</span>
                <span className="years">
                  {j.years}
                  <svg viewBox="0 0 120 56" preserveAspectRatio="none" aria-hidden>
                    <path d="M10 30c-6-16 22-26 52-24s56 10 52 26-34 18-62 16S14 44 10 30z M104 40c8-2 14-4 18-6" fill="none" stroke="#6aa0e6" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
              </div>

              <ul className="jobs">
                {j.jobs.map((x) => (
                  <li key={x.company}>
                    <i />
                    <span>{x.company}</span>
                    <time>{x.years}</time>
                  </li>
                ))}
              </ul>

              <div className="today">
                <span className="win"><b /><b /><b /></span>
                <span className="clover" aria-hidden>🍀</span>
                <strong>{j.today.title}</strong>
                <p>{j.today.text}</p>
              </div>

              <div className="contact">
                <span className="tape" aria-hidden />
                <a href={`mailto:${site.email}`}>{site.email}</a>
                {j.contact.phone && <span>{j.contact.phone}</span>}
                <span>{j.contact.city}</span>
              </div>

              <p className="hand">{j.note}</p>
            </div>
          </div>
        </div>

        <div className="journal-ctl">
          {open ? (
            <button onClick={() => setOpen(false)}>Close journal</button>
          ) : (
            <span>Click the journal to open it</span>
          )}
        </div>
      </div>
    </section>
  );
}
