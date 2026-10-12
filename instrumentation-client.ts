import posthog from "posthog-js";

// PostHog analytics. Runs in the browser only, and only when a key is configured (NEXT_PUBLIC_POSTHOG_KEY).
// Requests go through /ingest on this site (see next.config.mjs) so ad-blockers don't drop them.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const enabledInDev = process.env.NEXT_PUBLIC_POSTHOG_IN_DEV === "1";

if (key && (process.env.NODE_ENV === "production" || enabledInDev)) {
  posthog.init(key, {
    api_host: "/ingest",
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST || "https://us.posthog.com",
    defaults: "2025-05-24", // includes automatic page views on route changes
    person_profiles: "identified_only", // anonymous visitors don't create billable person profiles
    capture_pageleave: true,
    // never record what is typed (the case-study password box is also a password field, which is masked anyway)
    session_recording: { maskAllInputs: true },
  });
}
