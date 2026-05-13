"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "@/lib/auth-types";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signInWithEmail: (identifier: string, password: string) => Promise<AuthUser>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function readError(response: Response) {
  const body = await response.json().catch(() => null);
  return body?.error ?? "인증 요청을 처리하지 못했습니다.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/auth/session", { cache: "no-store" });
    const body = await response.json();
    setUser(body.user ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh().catch(() => {
      setUser(null);
      setLoading(false);
    });
  }, [refresh]);

  const signInWithEmail = useCallback(async (identifier: string, password: string) => {
    setError(null);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    if (!response.ok) {
      const message = await readError(response);
      setError(message);
      throw new Error(message);
    }

    const body = await response.json();
    setUser(body.user);
    return body.user as AuthUser;
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string, name: string) => {
    setError(null);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const message = await readError(response);
      setError(message);
      throw new Error(message);
    }

    const body = await response.json();
    setUser(body.user);
    return body.user as AuthUser;
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      refresh,
    }),
    [error, loading, refresh, signInWithEmail, signOut, signUpWithEmail, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
