"use client";

import { RefreshCw } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <section className="neon-panel mx-auto max-w-3xl rounded-[34px] px-6 py-10 text-center md:px-8">
      <p className="text-sm font-semibold text-rose-200/70">문제가 생겼습니다</p>
      <h1 className="display-font glow-text mt-3 text-3xl font-semibold text-white md:text-5xl">
        페이지를 다시 불러와주세요
      </h1>
      <p className="mx-auto mt-4 max-w-xl leading-8 text-rose-50/74">
        잠시 후 다시 시도하면 정상적으로 이용할 수 있습니다.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_28px_rgba(251,113,133,0.35)] transition hover:-translate-y-0.5"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        다시 시도하기
      </button>
    </section>
  );
}
