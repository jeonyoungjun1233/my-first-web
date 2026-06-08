"use client";

import { type FormEvent, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function SignupForm() {
  const router = useRouter();
  const { signUpWithEmail, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLocalError(null);

    startTransition(async () => {
      try {
        await signUpWithEmail(email, password, name);
        router.push("/mypage");
        router.refresh();
      } catch (caught) {
        setLocalError(
          caught instanceof Error
            ? caught.message
            : "회원가입을 완료하지 못했습니다.",
        );
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-rose-100/78">
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="이름 입력"
          className="w-full rounded-2xl border border-rose-200/15 bg-black/25 px-4 py-4 text-base text-white outline-none transition placeholder:text-rose-100/35 focus:border-rose-300/45 focus:bg-black/35"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-rose-100/78">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일"
          className="w-full rounded-2xl border border-rose-200/15 bg-black/25 px-4 py-4 text-base text-white outline-none transition placeholder:text-rose-100/35 focus:border-rose-300/45 focus:bg-black/35"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="signup-password" className="text-sm font-semibold text-rose-100/78">
          비밀번호
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
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
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          {isPending ? "가입 중" : "회원가입"}
        </button>
        <Link
          href="/login"
          className="neon-pill rounded-full px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
        >
          로그인으로 이동
        </Link>
      </div>
    </form>
  );
}
