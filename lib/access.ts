import { createHmac, timingSafeEqual } from "node:crypto";

// Password protection for case studies. The password lives in the CASE_PASSWORD environment variable
// (see .env.local). A visitor who enters it gets a signed, httpOnly cookie; the server checks that cookie
// before rendering a locked case study, so the content is never sent to anyone without it.
export const ACCESS_COOKIE = "cs_access";

const password = () => process.env.CASE_PASSWORD ?? "";

/** The cookie value: an HMAC keyed by the password, so changing the password logs everyone out. */
export function accessToken(): string {
  return createHmac("sha256", password()).update("case-study-access-v1").digest("hex");
}

// Phone keyboards add things desktop ones don't: a capital first letter and a trailing space after a word.
// So the comparison ignores surrounding spaces and letter case. (Tradeoff: slightly fewer possible passwords.)
const normalise = (v: string) => v.trim().toLowerCase();

export function passwordMatches(input: string): boolean {
  const real = normalise(password());
  const typed = normalise(input);
  if (!real || !typed) return false;
  const a = createHmac("sha256", "cmp").update(typed).digest();
  const b = createHmac("sha256", "cmp").update(real).digest();
  return timingSafeEqual(a, b);
}

export function tokenValid(value: string | undefined): boolean {
  if (!value || !password()) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(accessToken());
  return a.length === b.length && timingSafeEqual(a, b);
}
