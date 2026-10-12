"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";

type Peek = { bg: string; label?: string; src?: string };

type CardData = {
  title: string;
  text: string;
  cta: string;
  href: string;
  tone: "peach" | "lilac" | "sky";
  rot: number;
  dy: number;
  peekKind: "screen" | "icon";
  // The little thumbnails that pop out on hover. Swap `bg`/`label` for a real `src` image later.
  peeks: Peek[];
};

const cards: CardData[] = [
  {
    title: "Recent work",
    text: "See how I turn messy product problems into shipped experiences.",
    cta: "Read Case Studies",
    href: "/#work",
    tone: "peach",
    rot: -3,
    dy: 0,
    peekKind: "screen",
    peeks: [
      { bg: "linear-gradient(135deg,#2b2b33,#4a4a57)", label: "▤" },
      { bg: "linear-gradient(135deg,#ffffff,#e9e6f5)", label: "▦" },
      { bg: "linear-gradient(135deg,#ffe066,#ffb938)", label: "◧" },
    ],
  },
  {
    title: "Side projects",
    text: "Things I build for fun: experiments, tools and small products.",
    cta: "What I've Built",
    href: "/#ai",
    tone: "lilac",
    rot: 1.5,
    dy: 10,
    peekKind: "icon",
    peeks: [
      { bg: "linear-gradient(135deg,#b8e6a0,#7fcf8c)", label: "☺" },
      { bg: "linear-gradient(135deg,#ffd6f0,#ffb0d8)", label: "✦" },
      { bg: "linear-gradient(135deg,#3a3a42,#16161a)", label: "◈" },
      { bg: "linear-gradient(135deg,#ffe3d1,#ffb48f)", label: "❀" },
    ],
  },
  {
    title: "About me",
    text: "My story, how I think about design, and what I do off the clock.",
    cta: "Get to Know Me",
    href: "/#about",
    tone: "sky",
    rot: -2,
    dy: 0,
    peekKind: "icon",
    peeks: [
      { bg: "linear-gradient(135deg,#d9ecff,#9ccbff)", label: "✎" },
      { bg: "linear-gradient(135deg,#fff3c4,#ffd966)", label: "☕" },
      { bg: "linear-gradient(135deg,#e5dfff,#b9acff)", label: "♪" },
    ],
  },
];

const SPREAD = 34; // px each neighbour slides away from the hovered card

// Touch screens fake a "hover" on tap — only react to a real mouse.
const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function HeroCards() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="cards" onMouseLeave={() => setActive(null)}>
      {cards.map((c, i) => {
        const isActive = active === i;
        const dimmed = active !== null && !isActive;
        const style = {
          "--rot": `${active === null ? c.rot : isActive ? 0 : c.rot * 0.5}deg`,
          "--dx": `${active === null ? 0 : (i - active) * SPREAD}px`,
          "--dy": `${isActive ? -6 : c.dy}px`,
          "--delay": `${0.3 + i * 0.06}s`,
        } as CSSProperties;

        return (
          <Link
            key={c.title}
            href={c.href}
            style={style}
            className={`card ${c.tone}${isActive ? " is-active" : ""}${dimmed ? " is-dim" : ""}`}
            onMouseEnter={() => canHover() && setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <div className={`peeks ${c.peekKind}`} aria-hidden>
              {c.peeks.map((p, k) => (
                <span
                  key={k}
                  className="peek"
                  style={
                    {
                      "--i": k,
                      "--n": c.peeks.length,
                      background: p.src ? `center/cover url(${p.src})` : p.bg,
                    } as CSSProperties
                  }
                >
                  {p.label}
                </span>
              ))}
            </div>

            <h2>{c.title}</h2>
            <p>{c.text}</p>
            <span className="card-cta">{c.cta}</span>
          </Link>
        );
      })}
    </div>
  );
}
