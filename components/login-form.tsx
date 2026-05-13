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
        <label htmlFor="identifier" className="text-sm font-semibold text-rose-100/78">
          아이디 또는 이메일
        </label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          placeholder="학습용 아이디 또는 이메일"
          className="w-full rounded-2xl border border-rose-200/15 bg-black/25 px-4 py-4 text-base text-white outline-none transition placeholder:text-rose-100/35 focus:border-rose-300/45 focus:bg-black/35"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-semibold text-rose-100/78">
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
          className="w-full rounded-2xl border border-rose-200/15 bg-black/25 px-4 py-4 text-base text-white outline-none transition placeholder:text-rose-100/35 focus:border-rose-300/45 focus:bg-black/35"
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
          className="inline-flex items-center gap-2 rounded-full bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_28px_rgba(251,113,133,0.42)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          {isPending ? "확인 중" : "로그인"}
        </button>
        <Link
          href="/signup"
          className="neon-pill inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
        >
          <KeyRound className="h-4 w-4" aria-hidden="true" />
          회원가입 흐름 보기
        </Link>
      </div>
    </form>
  );
}

