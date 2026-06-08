import type { AuthUser } from "@/lib/auth-types";

export const AUTH_COOKIE_NAME = "neon_blog_session";
export const BLOG_USERS_COOKIE_NAME = "neon_blog_users";

const DEFAULT_LOGIN_ID = "junyj7";
const DEFAULT_EMAIL = "junyj77@hs.ac.kr";
const DEFAULT_DISPLAY_NAME = "전영준";
const DEFAULT_PASSWORD_HASH =
  "a6229889e69243791594a338afcbc5b9cdfef111fde00b3d50218ff36266403e";

export type StoredBlogUser = AuthUser & {
  passwordHash: string;
};

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
    provider: "blog-cookie",
    verified: true,
  };
}

export async function hashSecret(value: string) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return toHex(digest);
}

function toBase64Url(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(normalized + padding);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function getSignature(payload: string, purpose: string) {
  const passwordHash = process.env.AUTH_PASSWORD_HASH ?? DEFAULT_PASSWORD_HASH;
  return hashSecret(`${payload}.${passwordHash}.${purpose}`);
}

async function createSignedValue(payloadValue: unknown, purpose: string) {
  const payload = toBase64Url(JSON.stringify(payloadValue));
  const signature = await getSignature(payload, purpose);
  return `${payload}.${signature}`;
}

async function readSignedValue<T>(value: string | undefined, purpose: string) {
  if (!value || !value.includes(".")) {
    return null;
  }

  const [payload, signature] = value.split(".");
  const expectedSignature = await getSignature(payload, purpose);

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    return JSON.parse(fromBase64Url(payload)) as T;
  } catch {
    return null;
  }
}

export async function createSessionValue(user: AuthUser) {
  return createSignedValue(user, "session");
}

export async function readSessionValue(value?: string) {
  const user = await readSignedValue<AuthUser>(value, "session");

  if (!user?.id || !user.email || !user.name) {
    return null;
  }

  return user;
}

export async function createStoredUsersValue(users: StoredBlogUser[]) {
  return createSignedValue(users, "users");
}

export async function readStoredUsersValue(value?: string) {
  const users = await readSignedValue<StoredBlogUser[]>(value, "users");

  if (!Array.isArray(users)) {
    return [];
  }

  return users.filter((user) => user.id && user.email && user.name && user.passwordHash);
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
