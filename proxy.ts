import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, getSessionToken } from "@/lib/auth-shared";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const expectedToken = await getSessionToken();

  if (token === expectedToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/mypage/:path*", "/posts/new"],
};

