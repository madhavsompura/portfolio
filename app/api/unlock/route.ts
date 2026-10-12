import { NextResponse } from "next/server";
import { ACCESS_COOKIE, accessToken, passwordMatches } from "@/lib/access";

export async function POST(req: Request) {
  let input = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    input = typeof body.password === "string" ? body.password : "";
  } catch {}

  if (!passwordMatches(input)) {
    await new Promise((r) => setTimeout(r, 700)); // slows down password guessing
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, accessToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // no maxAge: a session cookie, so closing the browser locks the case studies again
  });
  return res;
}

// "Lock again": forget the password in this browser.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return res;
}
