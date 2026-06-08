"use client";

import { type FormEvent, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound, LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

type LoginFormProps = {
  nextPath: string;
};

export default function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter();
  const { signInWithEmail, error } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLocalError(null);

    startTransition(async () => {
      try {
        await signInWithEmail(identifier, password);
        router.push(nextPath);
        router.refresh();
      } catch (caught) {
        setLocalError(caught instanceof Error ? caught.message : "로그인에 실패했습니다.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="identifier" className="mono-font text-xs font-semibold uppercase tracking-wider text-neutral-300">
          이메일
        </label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          placeholder="이메일"
          className="w-full rounded-lg border border-red-500/30 bg-black/60 px-4 py-3 text-base text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] outline-none transition placeholder:text-neutral-600 focus:border-[#ff1744] focus:ring-2 focus:ring-[#ff1744]/40"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="mono-font text-xs font-semibold uppercase tracking-wider text-neutral-300">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호 입력"
          className="w-full rounded-lg border border-red-500/30 bg-black/60 px-4 py-3 text-base text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] outline-none transition placeholder:text-neutral-600 focus:border-[#ff1744] focus:ring-2 focus:ring-[#ff1744]/40"
          required
        />
      </div>

      {(localError || error) ? (
        <p className="rounded-2xl border border-red-300/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {localError ?? error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="neon-gradient-button mono-font inline-flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          {isPending ? "확인 중" : "로그인"}
        </button>
        <Link
          href="/signup"
          className="mono-font inline-flex items-center gap-2 rounded-lg border border-red-500/35 bg-[#180006]/60 px-5 py-3 text-xs font-semibold tracking-wider text-[#ffccd5] transition hover:-translate-y-0.5 hover:border-red-400 hover:bg-red-500/10"
        >
          <KeyRound className="h-4 w-4" aria-hidden="true" />
          회원가입하기
        </Link>
      </div>
    </form>
  );
}
