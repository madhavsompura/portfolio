"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// A rounded card with a notch cut out of the bottom-right corner (for the arrow button).
// The outline is rebuilt as an SVG path whenever the card resizes, so curves stay crisp.
export default function NotchedThumb({ children, style, className = "" }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const shape = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const small = w < 420;
      const b = small ? 26 : 34; // button radius
      const R = b + (small ? 6 : 8); // the notch: a circle around the button, with a small gap
      const m = R; // button centre sits R in from the right and bottom edges
      const f = small ? 18 : 24; // the soft shoulders where the notch meets the edges
      const C = 30; // outer corner radius
      const cx = w - m;
      const cy = h - m;
      // shoulder on the right edge: circle of radius f, touching the edge x = w and the notch circle
      const d = Math.sqrt((R + f) ** 2 - (m - f) ** 2);
      const y1 = cy - d;
      const t1x = cx + (R * (w - f - cx)) / (R + f);
      const t1y = cy + (R * (y1 - cy)) / (R + f);
      // shoulder on the bottom edge (mirror)
      const x2 = cx - d;
      const t2x = cx + (R * (x2 - cx)) / (R + f);
      const t2y = cy + (R * (h - f - cy)) / (R + f);
      const n = (v: number) => v.toFixed(2);
      const path = [
        `M${C},0 H${w - C} A${C},${C} 0 0 1 ${w},${C}`,
        `V${n(y1)} A${f},${f} 0 0 1 ${n(t1x)},${n(t1y)}`,
        `A${R},${R} 0 0 0 ${n(t2x)},${n(t2y)}`,
        `A${f},${f} 0 0 1 ${n(x2)},${h}`,
        `H${C} A${C},${C} 0 0 1 0,${h - C}`,
        `V${C} A${C},${C} 0 0 1 ${C},0 Z`,
      ].join(" ");
      el.style.clipPath = `path('${path}')`;
      const host = el.parentElement ?? el; // the arrow button is a sibling, so share the sizes via the wrapper
      host.style.setProperty("--gm", `${m}px`);
      host.style.setProperty("--gb", `${b * 2}px`);
    };

    shape();
    const ro = new ResizeObserver(shape);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={`thumb ${className}`} style={style}>
      {children}
    </div>
  );
}
