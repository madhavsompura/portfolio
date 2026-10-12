"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// Recreations of Finwise screens, built from the app's own layout, copy and colours
// (cream surfaces, charcoal hero card, indigo accent). Drawn at a 360px phone width and scaled to fit.
// Swap any of them for a real screenshot later.

const C = {
  bg: "#FBF7EE",
  el: "#F4EFE3",
  sel: "#ECE5D6",
  text: "#1F1B16",
  t2: "#5E564B",
  t3: "#8E8578",
  primary: "#4A3F99",
  primarySoft: "#E8E4F6",
  ink: "#1C1917",
  inkSoft: "#2C2825",
  onInk: "#F7F2E7",
  onInkMuted: "#A79E90",
  success: "#2E8B57",
  danger: "#C2453A",
};

const cat = {
  Food: "#E07B39",
  Groceries: "#A5667E",
  Fuel: "#D9A02B",
  Travel: "#4A4A9C",
  Shopping: "#C2577F",
  Health: "#C4504C",
  Entertainment: "#3E8E8B",
  Pet: "#9A6B3F",
};

// The phone, scaled so a 360px-wide screen fills whatever width it is given.
export function Phone({ children, className = "", tilt = 0, thin = false }: { children: ReactNode; className?: string; tilt?: number; thin?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0.7);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => el.clientWidth && setK(el.clientWidth / 360));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className={`fw-phone${thin ? " thin" : ""} ${className}`} style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}>
      <div className="fw-screen" ref={ref}>
        <div className="fw-canvas" style={{ ["--k" as string]: k } as CSSProperties}>
          <div className="fw-status">
            <span>9:41</span>
            <i />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function Dot({ color, size = 34, children }: { color: string; size?: number; children?: ReactNode }) {
  return (
    <span className="fw-dot" style={{ width: size, height: size, background: `${color}22`, color }}>
      {children ?? <b style={{ background: color }} />}
    </span>
  );
}

function Chip({ name, outlined = false }: { name: keyof typeof cat | "Other…"; outlined?: boolean }) {
  const color = name === "Other…" ? C.t3 : cat[name];
  return (
    <span className="fw-chip" style={{ borderColor: outlined ? color : "transparent", background: outlined ? `${color}14` : C.el }}>
      <b style={{ background: color }} />
      {name}
    </span>
  );
}

function SpendingCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="fw-hero" style={{ background: C.ink, color: C.onInk }}>
      <div className="fw-hero-top">
        <span className="fw-hero-icon" style={{ background: C.inkSoft }}>₹</span>
        <div>
          <b>October spending</b>
          <small style={{ color: C.onInkMuted }}>↘ 12% less than Sep</small>
        </div>
        <span className="fw-pill" style={{ background: C.inkSoft, color: C.onInkMuted }}>₹30,000 ✎</span>
      </div>
      <div className="fw-amount">
        <strong>₹18,420</strong>
        <small style={{ color: C.onInkMuted }}>61.4% used</small>
      </div>
      {!compact && (
        <div className="fw-track" style={{ background: C.inkSoft }}>
          <b style={{ width: "61.4%", background: "#8E84E0" }} />
        </div>
      )}
    </div>
  );
}

function Suggestion({ name, amount, meta, guess, rest }: { name: string; amount: string; meta: string; guess: keyof typeof cat; rest: (keyof typeof cat)[] }) {
  return (
    <div className="fw-card">
      <div className="fw-row">
        <Dot color={cat[guess]} />
        <div className="fw-grow">
          <b>{name}</b>
          <small>{meta}</small>
        </div>
        <b>{amount}</b>
        <span className="fw-x">✕</span>
      </div>
      <div className="fw-chips">
        <small className="fw-addto">Add to</small>
        <Chip name={guess} outlined />
        {rest.map((r) => (
          <Chip key={r} name={r} />
        ))}
      </div>
    </div>
  );
}

export function HomeScreen() {
  return (
    <div className="fw-page">
      <div className="fw-greet">
        <div>
          <small>Sunday, 12 October</small>
          <h4>Good evening</h4>
        </div>
        <span className="fw-btn-soft">↻ Refresh</span>
        <span className="fw-round" style={{ background: C.primary, color: "#fff" }}>+</span>
      </div>
      <SpendingCard />
      <div className="fw-stat">
        <Dot color="#CB7B43" size={30} />
        <span className="fw-grow">
          Today <small>so far</small>
        </span>
        <b>₹752</b>
      </div>
      <div className="fw-sec">
        <h5>New payments</h5>
        <span className="fw-count" style={{ background: C.primary }}>3</span>
      </div>
      <small className="fw-hint">Tap a category to add each one to your expenses.</small>
      <Suggestion name="Swiggy" amount="₹534" meta="Today · 2:52 pm · Email" guess="Food" rest={["Groceries", "Fuel", "Travel"]} />
      <Suggestion name="Indian Oil" amount="₹1,200" meta="Today · 9:10 am · SMS" guess="Fuel" rest={["Food", "Travel", "Shopping"]} />
      <div className="fw-more">View 1 more ⌄</div>
    </div>
  );
}

export function ConfirmScreen() {
  return (
    <div className="fw-page fw-dim">
      <div className="fw-ghost">
        <SpendingCard compact />
      </div>
      <div className="fw-sheet">
        <i className="fw-handle" />
        <div className="fw-sheet-head">
          <b>Add this expense?</b>
          <span className="fw-x">✕</span>
        </div>
        <div className="fw-summary">
          <Dot color={cat.Food} />
          <div className="fw-grow">
            <b>Swiggy</b>
            <small>Today · 2:52 pm · from email</small>
          </div>
          <strong>₹534</strong>
        </div>
        <small className="fw-label">CATEGORY</small>
        <div className="fw-chips wrap">
          <Chip name="Food" outlined />
          <Chip name="Groceries" />
          <Chip name="Entertainment" />
          <Chip name="Other…" />
        </div>
        <small className="fw-label">PAID TO</small>
        <div className="fw-input">Swiggy</div>
        <div className="fw-buttons">
          <span className="fw-b2">Cancel</span>
          <span className="fw-b1" style={{ background: C.primary }}>Add expense</span>
        </div>
      </div>
    </div>
  );
}

export function DashboardScreen() {
  const bars = [22, 38, 30, 56, 41, 72, 48];
  return (
    <div className="fw-page">
      <h4 className="fw-title">Dashboard</h4>
      <div className="fw-seg">
        <span>Week</span>
        <span className="on">Month</span>
        <span>Year</span>
      </div>
      <div className="fw-period">
        <span className="fw-round sm">‹</span>
        <b>October 2026</b>
        <span className="fw-round sm faded">›</span>
      </div>
      <div className="fw-big">
        <strong>₹18,420</strong>
        <small>spent so far</small>
      </div>
      <div className="fw-pills">
        <span>📅 ₹1,535 per day</span>
        <span>🧾 46 payments</span>
      </div>
      <h5 className="fw-h5">Spending trend</h5>
      <div className="fw-card fw-bars">
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%`, background: i === 5 ? C.primary : C.primarySoft }} />
        ))}
      </div>
      <h5 className="fw-h5">Top spending</h5>
      {(
        [
          ["Food", "₹6,240", "of ₹6,000 · over", 1, true],
          ["Groceries", "₹4,180", "of ₹8,000", 0.52, false],
          ["Fuel", "₹2,900", "16%", 0.16, false],
        ] as const
      ).map(([name, v, cap, fill, over]) => (
        <div key={name} className="fw-cat">
          <div className="fw-row">
            <Dot color={cat[name]} size={36} />
            <div className="fw-grow">
              <b>{name}</b>
              <small>12 payments</small>
            </div>
            <div className="fw-right">
              <b>{v}</b>
              <small style={{ color: over ? C.danger : C.t3 }}>{cap}</small>
            </div>
          </div>
          <div className="fw-share">
            <b style={{ width: `${fill * 100}%`, background: over ? C.danger : cat[name] }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AddScreen() {
  return (
    <div className="fw-page">
      <div className="fw-addhead">
        <span style={{ color: C.primary }}>Cancel</span>
        <b>Add expense</b>
        <span style={{ color: C.primary }}>Save</span>
      </div>
      <div className="fw-amountpad">
        <span className="fw-round" style={{ background: C.el }}>−</span>
        <div>
          <small>₹</small>
          <strong>250</strong>
        </div>
        <span className="fw-round" style={{ background: C.el }}>+</span>
      </div>
      <small className="fw-label">Category</small>
      <div className="fw-chips wrap">
        <Chip name="Food" outlined />
        <Chip name="Groceries" />
        <Chip name="Fuel" />
        <Chip name="Travel" />
        <Chip name="Shopping" />
        <Chip name="Health" />
        <Chip name="Pet" />
        <Chip name="Other…" />
      </div>
      <small className="fw-label">Paid to</small>
      <div className="fw-input">Sharma Tea Stall</div>
      <small className="fw-label">Date</small>
      <div className="fw-chips">
        <span className="fw-chip on">Today</span>
        <span className="fw-chip">Yesterday</span>
        <span className="fw-chip">📅 Pick</span>
      </div>
      <small className="fw-label">Note</small>
      <div className="fw-input muted">Optional</div>
    </div>
  );
}

export function PrivacyScreen() {
  return (
    <div className="fw-page">
      <h4 className="fw-title">Settings</h4>
      <div className="fw-pills">
        <span>🔒 Stays on this phone</span>
        <span>ⓘ Version 1.0.0</span>
      </div>
      <div className="fw-card">
        <b>Monthly budget</b>
        <div className="fw-input">₹ 30,000</div>
      </div>
      <div className="fw-card">
        <b>Scan my messages</b>
        <small>Looks through your inbox once, when you tap a button, and suggests every bank or UPI debit it finds. Nothing runs in the background.</small>
        <span className="fw-b1 sm" style={{ background: C.primary }}>Scan today</span>
      </div>
      <div className="fw-card">
        <div className="fw-row">
          <div className="fw-grow">
            <b>Don’t count card bill payments</b>
            <small>Keeps CC Bill out of your totals and charts, so money isn’t counted twice. They stay in Activity.</small>
          </div>
          <span className="fw-toggle on" />
        </div>
      </div>
      <div className="fw-card">
        <div className="fw-row">
          <div className="fw-grow">
            <b>Your data stays on this device</b>
            <small>Nothing is uploaded. There are no accounts.</small>
          </div>
        </div>
      </div>
    </div>
  );
}
