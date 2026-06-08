"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut, ShieldCheck, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AuthButtons() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <span className="neon-pill rounded-full px-4 py-2 text-sm font-semibold text-rose-100/70">
        확인 중
      </span>
    );
  }

  if (user) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/mypage"
          className="neon-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          마이페이지
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-black/25 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:border-rose-200/42 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/login?next=${encodeURIComponent(pathname)}`}
        className="neon-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
      >
        <LogIn className="h-4 w-4" aria-hidden="true" />
        로그인
      </Link>
      <Link
        href="/signup"
        className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-black/25 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:border-rose-200/42 hover:text-white"
      >
        <UserPlus className="h-4 w-4" aria-hidden="true" />
        회원가입
      </Link>
    </div>
  );
}
