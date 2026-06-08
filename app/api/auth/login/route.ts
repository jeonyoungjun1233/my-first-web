import { NextResponse } from "next/server";
import { signInWithPassword } from "@/lib/auth";
import {
  AUTH_COOKIE_NAME,
  BLOG_USERS_COOKIE_NAME,
  createSessionValue,
  getAuthUser,
  hashSecret,
  readStoredUsersValue,
  validateLessonCredentials,
} from "@/lib/auth-shared";
import type { AuthUser } from "@/lib/auth-types";

function readCookieFromHeader(header: string | null, name: string) {
  return (
    header
      ?.split(";")
      .map((value) => value.trim())
      .find((value) => value.startsWith(`${name}=`))
      ?.split("=")
      .slice(1)
      .join("=") ?? undefined
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const identifier = typeof body?.identifier === "string" ? body.identifier.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!identifier || !password) {
    return NextResponse.json(
      { error: "이메일과 비밀번호를 모두 입력해주세요." },
      { status: 400 },
    );
  }

  const authResult = identifier.includes("@")
    ? await signInWithPassword(identifier, password)
    : { user: null, accessToken: null, error: "이메일로 로그인해주세요." };
  const storedUsers = await readStoredUsersValue(
    readCookieFromHeader(request.headers.get("cookie"), BLOG_USERS_COOKIE_NAME),
  );
  const submittedHash = await hashSecret(password);
  const storedUser = storedUsers.find(
    (user) =>
      user.email.toLowerCase() === identifier && user.passwordHash === submittedHash,
  );
  const isDefaultUser = await validateLessonCredentials(identifier, password);

  const user: AuthUser | null =
    authResult.user ??
    (storedUser
      ? {
          id: storedUser.id,
          email: storedUser.email,
          name: storedUser.name,
          provider: storedUser.provider,
          verified: storedUser.verified,
        }
      : isDefaultUser
        ? getAuthUser()
        : null);

  if (!user) {
    return NextResponse.json(
      { error: authResult.error ?? "입력한 로그인 정보가 올바르지 않습니다." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ user });
  response.cookies.set(AUTH_COOKIE_NAME, await createSessionValue(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: request.url.startsWith("https://"),
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
