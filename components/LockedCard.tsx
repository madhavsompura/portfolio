"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import PasswordGate from "@/components/PasswordGate";

// A project card that is password protected. Clicking it asks for the password, then opens the case study.
export default function LockedCard({ slug, title, style, children }: { slug: string; title: string; style?: CSSProperties; children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.classList.add("lock");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("lock");
    };
  }, [open]);

  const go = () => router.push(`/work/${slug}`);
  const onClick = () => {
    let known = false;
    try {
      known = sessionStorage.getItem("cs-unlocked") === "1";
    } catch {}
    if (known) go(); // already entered the password this session; the server still verifies the cookie
    else setOpen(true);
  };

  return (
    <>
      <button type="button" className="wcard locked" style={style} onClick={onClick} aria-haspopup="dialog" aria-label={`${title} (password protected)`}>
        {children}
      </button>

      {open && (
        <div className="pw-overlay" role="dialog" aria-modal="true" aria-label="Password required" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="pw-card">
            <button type="button" className="pw-close" onClick={() => setOpen(false)} aria-label="Close">
              ✕
            </button>
            <PasswordGate title={title} onUnlocked={go} />
          </div>
        </div>
      )}
    </>
  );
}
