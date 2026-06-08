import { NextResponse } from "next/server";
import { signUp } from "@/lib/auth";
import {
  AUTH_COOKIE_NAME,
  BLOG_USERS_COOKIE_NAME,
  createSessionValue,
  createStoredUsersValue,
  hashSecret,
  readStoredUsersValue,
} from "@/lib/auth-shared";
import type { AuthUser } from "@/lib/auth-types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "이름, 이메일, 비밀번호를 모두 입력해주세요." },
      { status: 400 },
    );
  }

  if (!email.includes("@")) {
    return NextResponse.json(
      { error: "올바른 이메일 주소를 입력해주세요." },
      { status: 400 },
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "비밀번호는 6자 이상으로 입력해주세요." },
      { status: 400 },
    );
  }

  const authResult = await signUp(email, password, name);
  const user: AuthUser =
    authResult.user ?? {
      id: email,
      email,
      name,
      provider: "blog-cookie",
      verified: true,
    };

  const requestCookies = request.headers.get("cookie") ?? "";
  const storedCookie = requestCookies
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${BLOG_USERS_COOKIE_NAME}=`))
    ?.split("=")
    .slice(1)
    .join("=");
  const storedUsers = await readStoredUsersValue(storedCookie);
  const passwordHash = await hashSecret(password);
  const nextUsers = [
    ...storedUsers.filter((storedUser) => storedUser.email.toLowerCase() !== email),
    { ...user, passwordHash },
  ].slice(-10);

  const response = NextResponse.json({ user });
  const secureCookie = request.url.startsWith("https://");
  response.cookies.set(AUTH_COOKIE_NAME, await createSessionValue(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  response.cookies.set(BLOG_USERS_COOKIE_NAME, await createStoredUsersValue(nextUsers), {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
