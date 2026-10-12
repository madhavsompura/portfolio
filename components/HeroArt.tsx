"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { alive, art, critters, deskBand, deskHint, objects, type Critter, type HeroObject } from "@/lib/current";
import { track } from "@/lib/track";
import { site } from "@/lib/site";

// Touch screens fake a "hover" on tap — only react to a real mouse.
const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const pct = (n: number, of: number) => `${(n / of) * 100}%`;
const clamp = (n: number) => Math.max(-1, Math.min(1, n));

type Pose = { s: number; x: number; y: number; rx: number; ry: number; rz: number };
const REST: Pose = { s: 1, x: 0, y: 0, rx: 0, ry: 0, rz: 0 };
const KEYS = Object.keys(REST) as (keyof Pose)[];

export default function HeroArt() {
  const [hintOn, setHintOn] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Tell the hero how tall the orange desk is, so the text next to it can centre on the desk.
  useEffect(() => {
    const el = rootRef.current;
    const grid = el?.parentElement;
    if (!el || !grid) return;
    const sync = () => {
      const side = getComputedStyle(grid).gridTemplateColumns.split(" ").length > 1;
      if (!side) {
        grid.style.removeProperty("--desk-h");
        grid.style.removeProperty("--desk-top");
        return;
      }
      const h = el.getBoundingClientRect().height;
      grid.style.setProperty("--desk-h", `${Math.round(h * deskBand.height)}px`);
      grid.style.setProperty("--desk-top", `${Math.round(h * deskBand.top)}px`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const t = window.setTimeout(() => setHintOn(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hero-art" ref={rootRef}>
      <Image className="art-base" src={art.base} alt={art.alt} width={art.width} height={art.height} sizes="(max-width: 900px) 92vw, 520px" priority />
      {/* the person never stops: mouse arm + typing hand (decorative) */}
      <Image
        className="alive arm-r"
        src={alive.arm.src}
        alt=""
        width={alive.arm.w}
        height={alive.arm.h}
        aria-hidden
        style={{ left: pct(alive.arm.box.x, art.width), top: pct(alive.arm.box.y, art.height), width: pct(alive.arm.box.w, art.width), height: pct(alive.arm.box.h, art.height), transformOrigin: alive.arm.origin }}
      />
      <Image
        className="alive hand-l"
        src={alive.hand.src}
        alt=""
        width={alive.hand.w}
        height={alive.hand.h}
        aria-hidden
        style={{ left: pct(alive.hand.box.x, art.width), top: pct(alive.hand.box.y, art.height), width: pct(alive.hand.box.w, art.width), height: pct(alive.hand.box.h, art.height), transformOrigin: alive.hand.origin }}
      />

      <Note open={hintOn} note={deskHint} className="hint-global" />

      {objects.map((o) => (
        <Interactive key={o.id} cfg={o} />
      ))}
      {critters.map((c) => (
        <Playful key={c.id} cfg={c} />
      ))}
    </div>
  );
}

function Interactive({ cfg }: { cfg: HeroObject }) {
  const [open, setOpen] = useState(false);
  const monRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cur = useRef<Pose>({ ...REST });
  const tgt = useRef<Pose>({ ...REST });
  const raf = useRef(0);
  const last = useRef(0);
  const reduce = useRef(false);

  const openPose = (p: Partial<Pose> = {}): Pose => ({ s: cfg.scale, x: 0, y: cfg.lift, rx: 0, ry: 0, rz: cfg.straighten, ...p });

  const apply = () => {
    const el = stageRef.current;
    if (!el) return;
    const c = cur.current;
    el.style.transform = `perspective(1000px) translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0) rotateZ(${c.rz.toFixed(2)}deg) rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg) scale(${c.s.toFixed(4)})`;
  };

  // One small spring-ish loop drives rise, zoom, straighten and the follow-the-mouse tilt. It re-targets
  // from wherever it is, so entering/leaving mid-motion never jumps.
  const tick = (t: number) => {
    const dt = Math.min(0.05, Math.max(0.001, (t - last.current) / 1000));
    last.current = t;
    const k = 1 - Math.exp(-dt * 13);
    let moving = false;
    for (const key of KEYS) {
      const d = tgt.current[key] - cur.current[key];
      if (Math.abs(d) > (key === "s" ? 0.0008 : 0.02)) {
        cur.current[key] += d * k;
        moving = true;
      } else cur.current[key] = tgt.current[key];
    }
    apply();
    raf.current = moving ? requestAnimationFrame(tick) : 0;
  };
  const kick = () => {
    if (reduce.current) {
      cur.current = { ...tgt.current };
      apply();
      return;
    }
    if (!raf.current) {
      last.current = performance.now();
      raf.current = requestAnimationFrame(tick);
    }
  };

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    reduce.current = mq.matches;
    const onChange = () => (reduce.current = mq.matches);
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      cancelAnimationFrame(raf.current);
      raf.current = 0; // so the loop can start again after a dev-mode effect re-run
    };
  }, []);

  useEffect(() => {
    if (open) track("desk_object_opened", { object: cfg.id });
    tgt.current = open ? openPose() : { ...REST };
    kick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape closes; on touch, tapping elsewhere closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (monRef.current && !monRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  // While open, drift and tilt a little toward the cursor (kept small, only near the object).
  const onMove = (e: React.PointerEvent) => {
    if (!open || cfg.id === "notepad" || e.pointerType !== "mouse" || reduce.current || !monRef.current) return;
    const r = monRef.current.getBoundingClientRect();
    const nx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width * 0.9));
    const ny = clamp((e.clientY - (r.top + r.height / 2)) / (r.height * 1.1));
    tgt.current = openPose({ x: nx * cfg.drift, y: cfg.lift + ny * cfg.drift * 0.8, rx: -ny * 4, ry: nx * 5 });
    kick();
  };

  const typing = () => cfg.id === "notepad" && !!monRef.current?.contains(document.activeElement) && document.activeElement?.tagName === "TEXTAREA";
  const b = cfg.box;
  const ui = cfg.ui;
  const hit = cfg.hit ? `polygon(${cfg.hit.map(([x, y]) => `${x}% ${y}%`).join(", ")})` : undefined;

  return (
    <>
    <div
      ref={monRef}
      className={`mon${open ? " open" : ""}`}
      data-kind={cfg.id}
      style={{ left: pct(b.x, art.width), top: pct(b.y, art.height), width: pct(b.w, art.width), height: pct(b.h, art.height), ["--chip" as string]: cfg.chip } as CSSProperties}
      onMouseEnter={() => canHover() && setOpen(true)}
      onMouseLeave={() => canHover() && !typing() && setOpen(false)}
      onBlurCapture={(e) => canHover() && cfg.id === "notepad" && !e.currentTarget.matches(":hover") && !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
      onPointerMove={onMove}
    >
      <div ref={stageRef} className="mon-stage" style={{ transformOrigin: cfg.origin }}>
        {/* 1. the screen as drawn (monitor only) */}
        {cfg.idle && (
          <Image
            className="mon-idle"
            src={cfg.idle.src}
            alt=""
            width={cfg.idle.w}
            height={cfg.idle.h}
            style={{ left: `${cfg.idle.rect.x}%`, top: `${cfg.idle.rect.y}%`, width: `${cfg.idle.rect.w}%`, height: `${cfg.idle.rect.h}%` }}
          />
        )}

        {/* 2. the project, shown on the screen when it comes up */}
        {cfg.id === "notepad" ? (
          <div className="mon-ui pad-ui" style={{ left: `${ui.left}%`, top: `${ui.top}%`, width: `${ui.width}%`, height: `${ui.height}%`, transform: `rotate(${ui.rotate}deg)` }} inert={!open}>
            <NotepadForm />
          </div>
        ) : (
        <a
          className="mon-ui"
          style={{ left: `${ui.left}%`, top: `${ui.top}%`, width: `${ui.width}%`, height: `${ui.height}%`, transform: ui.rotate ? `rotate(${ui.rotate}deg)` : undefined }}
          href={cfg.href}
          {...(cfg.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={`Open project: ${cfg.title}`}
          inert={!open}
        >
          {cfg.screenshot ? (
            <Image src={cfg.screenshot} alt="" fill sizes="600px" style={{ objectFit: "cover", objectPosition: "top left" }} />
          ) : cfg.id === "phone" ? (
            <PhoneUI />
          ) : (
            <MonitorUI title={cfg.title} />
          )}
          <span className="ui-chip">
            {cfg.cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        </a>
        )}

        {/* 3. the original cut-out while closed (fades out when the screen comes up) */}
        {cfg.full && <Image className="mon-full" src={cfg.full} alt="" fill sizes="(max-width: 900px) 30vw, 180px" priority />}

        {/* 4. the frame, on top of the screen */}
        {cfg.frame && <Image className="mon-img" src={cfg.frame} alt="" fill sizes="(max-width: 900px) 42vw, 240px" priority />}

        {/* touch / keyboard handle (only active while closed) */}
        <button
          type="button"
          className="mon-btn"
          style={{ clipPath: hit }}
          aria-expanded={open}
          aria-label={`Show project: ${cfg.title}`}
          onClick={() => !canHover() && setOpen((o) => !o)}
          onFocus={(e) => e.currentTarget.matches(":focus-visible") && setOpen(true)}
          onBlur={(e) => canHover() && !monRef.current?.contains(e.relatedTarget as Node) && setOpen(false)}
        />
      </div>
    </div>

    {/* handwritten hint: writes itself in above the object while it is up */}
    <Note open={open} note={cfg.note} />
    </>
  );
}

type NoteCfg = { text: string; x: number; y: number; w?: number; arrow: "down-right" | "down-left" | "up-right" | "up-left" | "up" };

// A handwritten hint that writes itself in, with a hand-drawn arrow.
function Note({ open, note, className = "" }: { open: boolean; note: NoteCfg; className?: string }) {
  const arrows: Record<NoteCfg["arrow"], [string, string]> = {
    "down-right": ["M8 6 C 6 34, 30 52, 70 56", "M58 44 L72 56 L56 64"],
    "down-left": ["M82 6 C 84 34, 60 52, 20 56", "M32 44 L18 56 L34 64"],
    "up-right": ["M8 62 C 6 34, 30 16, 70 12", "M58 24 L72 12 L56 4"],
    "up-left": ["M82 62 C 84 34, 60 16, 20 12", "M32 24 L18 12 L34 4"],
    up: ["M34 66 C 28 46, 36 26, 42 8", "M30 22 L42 6 L54 20"],
  };
  const [shaft, head] = arrows[note.arrow];
  const arrow = (
    <svg className="hnote-arrow" viewBox="0 0 90 70" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path pathLength="1" d={shaft} />
      <path pathLength="1" d={head} />
    </svg>
  );
  const text = <span className="hnote-text">{note.text}</span>;
  return (
    <div className={`hnote${open ? " on" : ""} ${className}`} data-arrow={note.arrow} style={{ left: `${note.x}%`, top: `${note.y}cqw`, ...(note.w ? { width: `${note.w}cqw` } : {}) }} aria-hidden>
      {note.arrow.startsWith("up") ? (
        <>
          {arrow}
          {text}
        </>
      ) : (
        <>
          {text}
          {arrow}
        </>
      )}
    </div>
  );
}

// Objects with no screen (the coffee, the cat): they come alive on hover.
function Playful({ cfg }: { cfg: Critter }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const b = cfg.box;
  const hit = `polygon(${cfg.hit.map(([x, y]) => `${x}% ${y}%`).join(", ")})`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <>
      <div
        ref={ref}
        className={`crit${open ? " open" : ""}`}
        data-kind={cfg.id}
        style={{ left: pct(b.x, art.width), top: pct(b.y, art.height), width: pct(b.w, art.width), height: pct(b.h, art.height) }}
      >
        <div className="crit-body">
          {cfg.layers.map((l) => (
            <Image
              key={l.src}
              className={`crit-layer ${l.role}`}
              src={l.src}
              alt=""
              width={l.w}
              height={l.h}
              style={{ left: `${l.left}%`, top: `${l.top}%`, width: `${l.width}%`, height: `${l.height}%` }}
            />
          ))}
        </div>

        {/* things that pop out while it is hovered */}
        <div className="crit-bits" aria-hidden>
          {cfg.bits.map((c, i) => (
            <span key={i} style={{ ["--i" as string]: i } as CSSProperties}>
              {c}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="crit-btn"
          style={{ clipPath: hit }}
          aria-label={cfg.label}
          aria-pressed={open}
          onMouseEnter={() => canHover() && setOpen(true)}
          onMouseLeave={() => canHover() && setOpen(false)}
          onClick={() => !canHover() && setOpen((o) => !o)}
          onFocus={(e) => e.currentTarget.matches(":focus-visible") && setOpen(true)}
          onBlur={() => canHover() && setOpen(false)}
        />
      </div>
      <Note open={open} note={cfg.note} />
    </>
  );
}

// The notepad: a tiny compose form that opens the visitor's email app with their message ready to send.
function NotepadForm() {
  const wrap = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ k: 0.3, h: 200 });
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const k = el.clientWidth / 320;
      if (k > 0) setDims({ k, h: el.clientHeight / k });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = msg.trim() || "Hi Madhav,\n\n";
    track("notepad_email_started");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Hello from your portfolio 👋")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="pad-wrap" ref={wrap}>
      <form className="pad-form" onSubmit={send} style={{ ["--k" as string]: dims.k, height: dims.h } as CSSProperties}>
        <label htmlFor="pad-msg">Write me a note…</label>
        <textarea id="pad-msg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Hi Madhav, I'd love to chat about…" rows={4} />
        <div className="pad-foot">
          <span>{site.email}</span>
          <button type="submit">
            Send email
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

// Stand-ins for your project UI (replace by setting `screenshot` in lib/current.ts).
function MonitorUI({ title }: { title: string }) {
  return (
    <div className="pui" aria-hidden>
      <aside>
        <i /><i /><i /><i />
      </aside>
      <main>
        <header>
          <b>{title}</b>
          <span>Live</span>
        </header>
        <div className="pui-row">
          <div><em /><strong>2.4k</strong></div>
          <div><em /><strong>86%</strong></div>
          <div><em /><strong>12</strong></div>
          <svg viewBox="0 0 120 40" preserveAspectRatio="none">
            <path d="M0 32 L18 24 L36 28 L58 14 L78 20 L100 6 L120 10" fill="none" stroke="#6a7cc4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0 32 L18 24 L36 28 L58 14 L78 20 L100 6 L120 10 L120 40 L0 40Z" fill="rgba(106,124,196,.14)" />
          </svg>
        </div>
      </main>
    </div>
  );
}

function PhoneUI() {
  // Drawn at a normal 360px width and scaled to the screen, so text stays crisp and never hits a minimum font size.
  const wrap = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ k: 0.3, h: 640 });
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const k = el.clientWidth / 360;
      if (k > 0) setDims({ k, h: el.clientHeight / k });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rows = [
    { n: "Swiggy", c: "Food", a: "−₹482", col: "#CB7B43" },
    { n: "Uber", c: "Travel", a: "−₹218", col: "#4A3F99" },
    { n: "Salary", c: "Income", a: "+₹64,000", col: "#2E8B57" },
  ];
  return (
    <div className="fui-wrap" ref={wrap} aria-hidden>
    <div className="fui" style={{ ["--k" as string]: dims.k, height: dims.h } as CSSProperties}>
      <div className="fui-top">
        <span>October</span>
        <em>Finance</em>
      </div>
      <div className="fui-hero">
        <small>Spent this month</small>
        <strong>₹18,420</strong>
        <div className="fui-track"><b /></div>
        <small>61% of ₹30,000 budget</small>
      </div>
      <div className="fui-cats">
        <span style={{ background: "#CB7B43" }} /><span style={{ background: "#4A3F99" }} /><span style={{ background: "#E0A030" }} /><span style={{ background: "#A5667E" }} />
      </div>
      <ul className="fui-list">
        {rows.map((r) => (
          <li key={r.n}>
            <i style={{ background: r.col }} />
            <div><b>{r.n}</b><small>{r.c}</small></div>
            <em style={{ color: r.a.startsWith("+") ? "#2E8B57" : "#1F1B16" }}>{r.a}</em>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
