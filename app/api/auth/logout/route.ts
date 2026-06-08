import { NextResponse } from "next/server";
import { signOut } from "@/lib/auth";
import { AUTH_COOKIE_NAME } from "@/lib/auth-shared";

export async function POST(request: Request) {
  await signOut();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: request.url.startsWith("https://"),
    path: "/",
    maxAge: 0,
  });

  return response;
}
