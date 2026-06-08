import Link from "next/link";
import { Home, List } from "lucide-react";

export default function NotFound() {
  return (
    <section className="neon-panel mx-auto max-w-3xl rounded-[34px] px-6 py-12 text-center md:px-10">
      <p className="text-xs font-semibold text-rose-200/70">404</p>
      <h1 className="display-font glow-text mt-4 text-3xl font-semibold text-white md:text-5xl">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mx-auto mt-4 max-w-xl leading-8 text-rose-50/74">
        주소가 잘못되었거나 삭제된 페이지입니다.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_28px_rgba(251,113,133,0.35)] transition hover:-translate-y-0.5"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          홈으로 이동
        </Link>
        <Link
          href="/posts"
          className="neon-pill inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
        >
          <List className="h-4 w-4" aria-hidden="true" />
          글 목록 보기
        </Link>
      </div>
    </section>
  );
}
