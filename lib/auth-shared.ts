import type { AuthUser } from "@/lib/auth-types";

export const AUTH_COOKIE_NAME = "red_chi_ch9_session";

const DEFAULT_LOGIN_ID = "junyj7";
const DEFAULT_EMAIL = "junyj77@hs.ac.kr";
const DEFAULT_DISPLAY_NAME = "전영준";
const DEFAULT_PASSWORD_HASH =
  "a6229889e69243791594a338afcbc5b9cdfef111fde00b3d50218ff36266403e";

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function getAuthUser(): AuthUser {
  return {
    id: process.env.AUTH_LOGIN_ID ?? DEFAULT_LOGIN_ID,
    email: process.env.AUTH_EMAIL ?? DEFAULT_EMAIL,
    name: process.env.AUTH_DISPLAY_NAME ?? DEFAULT_DISPLAY_NAME,
    provider: "lesson-cookie",
    verified: true,
  };
}

export async function hashSecret(value: string) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return toHex(digest);
}

export async function getSessionToken() {
  const user = getAuthUser();
  const passwordHash = process.env.AUTH_PASSWORD_HASH ?? DEFAULT_PASSWORD_HASH;
  return hashSecret(`${user.id}:${user.email}:${passwordHash}:ch9`);
}

export async function validateLessonCredentials(identifier: string, password: string) {
  const user = getAuthUser();
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const validIdentifiers = [user.id.toLowerCase(), user.email.toLowerCase()];

  if (!validIdentifiers.includes(normalizedIdentifier)) {
    return false;
  }

  const submittedHash = await hashSecret(password);
  const expectedHash = process.env.AUTH_PASSWORD_HASH ?? DEFAULT_PASSWORD_HASH;
  return submittedHash === expectedHash;
}

