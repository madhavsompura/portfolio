"use client";

import { useEffect, useRef } from "react";

// A "multiplayer"-style cursor: red arrow with a "You" tag that trails the real pointer.
// Only on devices with a mouse; touch devices keep their normal behaviour.
export default function CustomCursor({ label = "You" }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let seen = false;

    document.documentElement.classList.add("has-cursor");

    const tick = () => {
      const k = reduce ? 1 : 0.28;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {
        seen = true;
        pos.x = target.x;
        pos.y = target.y;
      }
      el.style.opacity = "1";
      // Over anything clickable, the arrow turns into a pointing hand.
      const t = e.target as Element | null;
      el.classList.toggle("is-link", !!t?.closest?.('a[href], button:not([disabled]), [role="button"], [role="tab"], label[for]'));
    };
    const leave = () => (el.style.opacity = "0");
    const down = () => el.classList.add("down");
    const up = () => el.classList.remove("down");

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="fake-cursor" ref={ref} aria-hidden>
      <div className="fc-inner">
        <svg className="fc-arrow" width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M3 3 21.5 11.2 13.2 13.4 10.8 21.8Z" fill="#d94f4f" stroke="#d94f4f" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        {/* pointing hand, fingertip at the top-left hotspot */}
        <svg className="fc-hand" width="28" height="30" viewBox="0 0 28 30" fill="none">
          <path
            d="M9.5 2.2c1.5 0 2.6 1.2 2.6 2.6v7.1l.6-.1c1.2-.2 2.2.4 2.6 1.4.6-.8 1.7-1.2 2.7-.9 1 .3 1.6 1.1 1.8 2 .7-.5 1.7-.6 2.5-.2 1 .5 1.5 1.5 1.5 2.6v4.6c0 4.1-3.3 7.4-7.4 7.4h-2.6c-2.4 0-4.6-1.1-6-3L2.7 20.6c-.8-1.1-.6-2.6.4-3.5 1-.8 2.4-.8 3.3.1l.5.5V4.8c0-1.4 1.2-2.6 2.6-2.6Z"
            fill="#d94f4f"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
        <span>{label}</span>
      </div>
    </div>
  );
}
