import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, createSessionValue } from "@/lib/auth-shared";
import type { AuthUser } from "@/lib/auth-types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "이름, 이메일, 비밀번호를 모두 입력해 주세요." },
      { status: 400 },
    );
  }

  if (!email.includes("@")) {
    return NextResponse.json(
      { error: "올바른 이메일 주소를 입력해 주세요." },
      { status: 400 },
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "비밀번호는 6자 이상으로 입력해 주세요." },
      { status: 400 },
    );
  }

  const user: AuthUser = {
    id: email.split("@")[0],
    email,
    name,
    provider: "lesson-cookie",
    verified: true,
  };

  const response = NextResponse.json({ user });
  response.cookies.set(AUTH_COOKIE_NAME, await createSessionValue(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

