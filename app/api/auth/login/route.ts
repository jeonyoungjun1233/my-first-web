import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  getAuthUser,
  getSessionToken,
  validateLessonCredentials,
} from "@/lib/auth-shared";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const identifier = typeof body?.identifier === "string" ? body.identifier : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!identifier.trim() || !password) {
    return NextResponse.json(
      { error: "아이디 또는 이메일과 비밀번호를 모두 입력해 주세요." },
      { status: 400 },
    );
  }

  const isValid = await validateLessonCredentials(identifier, password);

  if (!isValid) {
    return NextResponse.json(
      { error: "입력한 인증 정보가 Ch9 학습 계정과 일치하지 않습니다." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ user: getAuthUser() });
  response.cookies.set(AUTH_COOKIE_NAME, await getSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

