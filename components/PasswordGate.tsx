"use client";

import { useEffect, useRef, useState } from "react";

// The password form. `onUnlocked` runs after the server accepts the password (and has set the cookie).
export default function PasswordGate({ title, onUnlocked, autoFocus = true }: { title: string; onUnlocked: () => void; autoFocus?: boolean }) {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "wrong" | "error">("idle");
  const input = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (autoFocus) input.current?.focus();
  }, [autoFocus]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || state === "busy") return;
    setState("busy");
    try {
      const res = await fetch("/api/unlock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: value.trim() }) });
      if (res.ok) {
        try {
          sessionStorage.setItem("cs-unlocked", "1");
        } catch {}
        onUnlocked();
      } else {
        setState(res.status === 401 ? "wrong" : "error");
        // replay the shake without re-creating the form (that would drop focus while typing)
        const f = form.current;
        if (f) {
          f.classList.remove("shake");
          void f.offsetWidth;
          f.classList.add("shake");
        }
        input.current?.select();
      }
    } catch {
      setState("error");
    }
  };

  return (
    <form ref={form} className="pw-form" onSubmit={submit}>
      <div className="pw-lock" aria-hidden>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
          <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
        </svg>
      </div>
      <h2>This case study is password protected</h2>
      <p>
        Enter the password to read <strong>{title}</strong>. If you don’t have it, say hi and I’ll send it over.
      </p>
      <label className="pw-field">
        <span className="sr-only">Password</span>
        <input
          ref={input}
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (state !== "busy") setState("idle");
          }}
          placeholder="Password"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          aria-invalid={state === "wrong"}
          aria-describedby="pw-msg"
        />
        <button type="submit" disabled={!value || state === "busy"}>
          {state === "busy" ? "Checking…" : "Open"}
        </button>
      </label>
      <p id="pw-msg" className="pw-msg" role="status">
        {state === "wrong" ? "That password isn’t right. Try again." : state === "error" ? "Something went wrong. Please try again." : " "}
      </p>
    </form>
  );
}
