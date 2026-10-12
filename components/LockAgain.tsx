"use client";

import { useRouter } from "next/navigation";

// Forgets the password in this browser and goes back to the work list.
export default function LockAgain() {
  const router = useRouter();
  const lock = async () => {
    try {
      await fetch("/api/unlock", { method: "DELETE" });
      sessionStorage.removeItem("cs-unlocked");
    } catch {}
    router.push("/#work");
    router.refresh();
  };
  return (
    <button type="button" className="lock-again" onClick={lock}>
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="5" y="10.5" width="14" height="9.5" rx="2.4" />
        <path d="M8.2 10.5V8.2a3.8 3.8 0 0 1 7.6 0v2.3" />
      </svg>
      Lock again
    </button>
  );
}
