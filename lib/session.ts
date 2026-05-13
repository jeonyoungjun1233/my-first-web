import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, getAuthUser, getSessionToken } from "@/lib/auth-shared";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const expectedToken = await getSessionToken();

  if (token !== expectedToken) {
    return null;
  }

  return getAuthUser();
}

