"use client";

import { useEffect } from "react";

// Drives --dark (0 → 1) from how far the #ai section has scrolled into view.
// The veil below fades the page to black, and anything using --dark (nav pill, AI section text) follows.
export default function ThemeBlend() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = document.getElementById("ai");
      if (!el) return;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const t = Math.min(1, Math.max(0, (vh * 0.9 - top) / (vh * 0.6)));
      const eased = t * t * (3 - 2 * t); // smoothstep
      root.style.setProperty("--dark", eased.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      root.style.removeProperty("--dark");
    };
  }, []);

  return <div className="theme-veil" aria-hidden />;
}
