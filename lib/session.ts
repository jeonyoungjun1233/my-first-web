import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, readSessionValue } from "@/lib/auth-shared";

export async function getSessionUser() {
  const cookieStore = await cookies();
  return readSessionValue(cookieStore.get(AUTH_COOKIE_NAME)?.value);
}
