import posthog from "posthog-js";

// Send a custom event to PostHog. Safe to call anywhere in the browser; does nothing if analytics is off.
export function track(event: string, props?: Record<string, string | number | boolean | null>) {
  if (typeof window === "undefined") return;
  try {
    if (posthog.__loaded) posthog.capture(event, props);
  } catch {}
}
