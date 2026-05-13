import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, MailCheck, ShieldCheck } from "lucide-react";
import { getSessionUser } from "@/lib/session";

const checks = [
  "이메일/비밀번호 인증 흐름 확인",
  "HttpOnly 쿠키로 세션 유지",
  "middleware.ts에서 보호 라우트 차단",
  "로그아웃 후 쿠키 제거",
];

export default async function MyPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?next=/mypage");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section className="neon-panel rounded-[34px] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.4em] text-rose-200/65">My Page</p>
        <h2 className="display-font glow-text mt-3 text-3xl font-semibold text-white md:text-5xl">
          인증된 사용자 공간
        </h2>
        <p className="mt-4 max-w-2xl leading-8 text-rose-50/74">
          로그인한 사용자만 접근할 수 있는 보호 페이지입니다. Ch9A의 세션 유지와 보호 라우트 검증용으로 사용합니다.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <div className="neon-outline rounded-2xl bg-black/20 p-5">
            <ShieldCheck className="h-6 w-6 text-rose-200" aria-hidden="true" />
            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-rose-200/55">User</p>
            <p className="mt-2 text-xl font-semibold text-white">{user.name}</p>
          </div>
          <div className="neon-outline rounded-2xl bg-black/20 p-5">
            <MailCheck className="h-6 w-6 text-rose-200" aria-hidden="true" />
            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-rose-200/55">Email</p>
            <p className="mt-2 break-all text-xl font-semibold text-white">{user.email}</p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/posts/new"
            className="rounded-full bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_28px_rgba(251,113,133,0.42)] transition hover:-translate-y-0.5"
          >
            보호된 새 글 쓰기 열기
          </Link>
          <Link
            href="/chapter-9"
            className="neon-pill rounded-full px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
          >
            Ch9 체크리스트 보기
          </Link>
        </div>
      </section>

      <aside className="neon-panel rounded-[28px] p-5">
        <p className="text-xs uppercase tracking-[0.32em] text-rose-200/60">Auth Checklist</p>
        <ul className="mt-4 space-y-3">
          {checks.map((check) => (
            <li
              key={check}
              className="neon-outline flex items-start gap-3 rounded-2xl px-3 py-3 text-sm text-rose-50/88"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-rose-200" aria-hidden="true" />
              <span>{check}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

