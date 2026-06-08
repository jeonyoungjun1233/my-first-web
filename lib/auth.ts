import type { AuthUser } from "@/lib/auth-types";

type SupabaseAuthResponse = {
  access_token?: string;
  user?: {
    id: string;
    email?: string;
    user_metadata?: {
      name?: string;
      full_name?: string;
    };
  };
  error?: string;
  error_description?: string;
  msg?: string;
};

function getSupabaseAuthConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    anonKey,
  };
}

function toAuthUser(response: SupabaseAuthResponse, fallbackName: string): AuthUser | null {
  const user = response.user;

  if (!user?.id || !user.email) {
    return null;
  }

  const accessToken = response.access_token ?? null;

  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.name ?? user.user_metadata?.full_name ?? fallbackName,
    provider: "supabase",
    verified: true,
    accessToken,
  };
}

async function requestSupabaseAuth(path: string, body: unknown) {
  const config = getSupabaseAuthConfig();

  if (!config) {
    return { data: null, error: "인증 서비스 설정이 없습니다." };
  }

  const response = await fetch(`${config.url}/auth/v1/${path}`, {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as SupabaseAuthResponse | null;

  if (!response.ok || !data) {
    return {
      data: null,
      error: data?.error_description ?? data?.msg ?? data?.error ?? "요청을 완료하지 못했습니다.",
    };
  }

  return { data, error: null };
}

export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await requestSupabaseAuth("token?grant_type=password", {
    email,
    password,
  });

  if (error || !data) {
    return { user: null, accessToken: null, error };
  }

  return {
    user: toAuthUser(data, email.split("@")[0]),
    accessToken: data.access_token ?? null,
    error: null,
  };
}

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await requestSupabaseAuth("signup", {
    email,
    password,
    data: { name },
  });

  if (error || !data) {
    return { user: null, accessToken: null, error };
  }

  return {
    user: toAuthUser(data, name),
    accessToken: data.access_token ?? null,
    error: null,
  };
}

export async function signOut(accessToken?: string | null) {
  const config = getSupabaseAuthConfig();

  if (!config || !accessToken) {
    return { error: null };
  }

  const response = await fetch(`${config.url}/auth/v1/logout`, {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return { error: "로그아웃을 완료하지 못했습니다." };
  }

  return { error: null };
}
