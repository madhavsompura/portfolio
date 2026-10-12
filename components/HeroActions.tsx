"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

type Phase = "closed" | "opening" | "open" | "closing";

export default function HeroActions() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const printerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);
  const [phase, setPhase] = useState<Phase>("closed");
  const [expanded, setExpanded] = useState(false);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  // Move the printer to the button's box or to its resting spot in the overlay.
  const place = useCallback((to: "button" | "slot") => {
    const el = printerRef.current;
    const src = to === "button" ? btnRef.current : slotRef.current;
    if (!el || !src) return;
    const r = src.getBoundingClientRect();
    el.style.left = `${r.left}px`;
    el.style.top = `${r.top}px`;
    el.style.width = `${r.width}px`;
    el.style.height = `${r.height}px`;
    el.style.borderRadius = to === "button" ? "16px" : "28px";
  }, []);

  const open = () => {
    if (phase !== "closed") return;
    setPhase("opening");
  };

  // Start the printer exactly on top of the Resume button, then grow it.
  useLayoutEffect(() => {
    if (phase !== "opening") return;
    const el = printerRef.current;
    if (!el) return;
    el.style.transition = "none";
    place("button");
    void el.offsetWidth;
    el.style.transition = "";
    place("slot");
    setExpanded(true);
    later(() => {
      setPhase("open");
      closeRef.current?.focus();
    }, 750);
  }, [phase, place]);

  const close = useCallback(() => {
    if (phase !== "open") return;
    setPhase("closing"); // paper retracts
    later(() => {
      setExpanded(false);
      place("button");
    }, 750);
    later(() => setPhase("closed"), 1500);
  }, [phase, place]);

  useEffect(() => {
    if (phase === "closed") return;
    document.body.classList.add("lock");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onResize = () => {
      const el = printerRef.current;
      if (!el || phase !== "open") return;
      el.style.transition = "none";
      place("slot");
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.classList.remove("lock");
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [phase, close, place]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <>
      <div className="actions">
        <a className="act light" href={`mailto:${site.email}?subject=${encodeURIComponent("Hi " + site.firstName + " 👋")}`}>
          Say hi <span aria-hidden>👋</span>
        </a>
        <button
          ref={btnRef}
          className="act dark"
          onClick={open}
          aria-haspopup="dialog"
          style={phase !== "closed" ? { visibility: "hidden" } : undefined}
        >
          Resume <ResumeIcon />
        </button>
      </div>

      {phase !== "closed" && (
        <div
          className="rs-overlay"
          data-phase={phase}
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="rs-stage" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="rs-slot" ref={slotRef} />

            <div className="rs-paperwrap">
              <div className="rs-paper">
                {site.resumePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={site.resumePreview} alt={`${site.name} résumé`} />
                ) : (
                  <FakeResume />
                )}
              </div>
            </div>

            <div className="rs-actions">
              <a className="rs-btn" href={site.resumePdf} download="Madhav-Sompura-Resume.pdf">
                Download <DownloadIcon />
              </a>
              <button ref={closeRef} className="rs-btn round" onClick={close} aria-label="Close résumé">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
          </div>

          <div className={`rs-printer${expanded ? " expanded" : ""}`} ref={printerRef} aria-hidden>
            <span className="rs-label">Resume <ResumeIcon /></span>
            <span className="rs-led" />
            <span className="rs-slotline" />
          </div>
        </div>
      )}
    </>
  );
}

function FakeResume() {
  const line = (w: string, k: number) => <i key={k} style={{ width: w }} />;
  return (
    <div className="fake">
      <b>{site.name}</b>
      <small>{site.role}</small>
      {["OVERVIEW", "WORK EXPERIENCE", "PROJECTS", "EDUCATION", "SKILLS"].map((h) => (
        <div key={h} className="fake-sec">
          <em>{h}</em>
          {["100%", "92%", "96%", "64%"].map(line)}
        </div>
      ))}
    </div>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6M9 9h2" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
    </svg>
  );
}
