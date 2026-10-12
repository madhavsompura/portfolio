"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/#about" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "journal", label: "Journal", href: "/#journal" },
  { id: "ai", label: "AI Stuff", href: "/#ai" },
];

type LinkItem = (typeof links)[number];

// The nav links with a highlight that slides under the hovered / active link.
function NavPill({
  as: Tag = "nav",
  className,
  active,
  onHome,
  onNavigate,
  ...rest
}: {
  as?: "nav";
  className: string;
  active: string;
  onHome: (e: React.MouseEvent) => void;
  onNavigate: () => void;
} & React.HTMLAttributes<HTMLElement>) {
  const [hover, setHover] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const target = hover ?? active;

  useLayoutEffect(() => {
    const place = () => {
      const ind = indRef.current;
      const el = linkRefs.current[target];
      if (!ind) return;
      if (!el) {
        ind.style.opacity = "0";
        return;
      }
      ind.style.opacity = "1";
      ind.style.width = `${el.offsetWidth}px`;
      ind.style.transform = `translateX(${el.offsetLeft}px)`;
    };
    place();
    const ro = new ResizeObserver(place);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [target]);

  return (
    <Tag ref={ref} className={className} onMouseLeave={() => setHover(null)} {...rest}>
      <span className="pill-ind" ref={indRef} aria-hidden />
      {links.map((l: LinkItem) => (
        <Link
          key={l.id}
          href={l.href}
          ref={(el) => {
            linkRefs.current[l.id] = el;
          }}
          className={target === l.id ? "on" : ""}
          aria-current={active === l.id ? "location" : undefined}
          onMouseEnter={() => setHover(l.id)}
          onFocus={() => setHover(l.id)}
          onBlur={() => setHover(null)}
          onClick={l.id === "home" ? onHome : onNavigate}
        >
          {l.label}
        </Link>
      ))}
    </Tag>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState("home");

  // Which section is in view: the last one whose top has passed ~60% of the screen height.
  useEffect(() => {
    if (!onHome) return setActive("");
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.6;
      let current = "home";
      for (const l of links.slice(1)) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= line) current = l.id;
      }
      // At the very bottom of the page the last section is always the active one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = links[links.length - 1].id;
      setActive(current);
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
    };
  }, [onHome]);

  const goHome = (e: React.MouseEvent) => {
    if (onHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Name + LinkedIn scroll away with the page */}
      <header className="nav-row">
        <Link className="brand" href="/" onClick={goHome}>
          <span className="avatar">{site.firstName[0]}</span>
          <span className="brand-name">{site.name}</span>
        </Link>

        <a className="btn dark square" href={site.linkedin} aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.63 4.74 6.05v5.9h-4v-5.23c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76v5.32h-4z" />
          </svg>
        </a>
      </header>

      {/* The pill stays pinned at the top while you scroll */}
      <NavPill className="pill" aria-label="Primary" active={active} onHome={goHome} onNavigate={() => {}} />
    </>
  );
}
