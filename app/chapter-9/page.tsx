import Link from "next/link";
import { CheckCircle2, FileText, LockKeyhole, Route, ShieldCheck } from "lucide-react";

const workflow = [
  {
    title: "인증 함수",
    body: "이메일/비밀번호 입력을 검증하고 서버 쿠키 세션을 발급합니다.",
    icon: LockKeyhole,
  },
  {
    title: "AuthContext",
    body: "전역 상태로 로그인 사용자, 로딩 상태, 로그인/로그아웃 함수를 제공합니다.",
    icon: ShieldCheck,
  },
  {
    title: "보호 라우트",
    body: "proxy.ts가 /mypage와 /posts/new 접근 전에 로그인 여부를 확인합니다. Next 16에서는 Ch9A의 middleware 역할을 proxy 파일이 맡습니다.",
    icon: Route,
  },
  {
    title: "문서 반영",
    body: "ch9A.md 원문을 저장소 docs 폴더에 넣고 구현 체크리스트를 화면에 노출합니다.",
    icon: FileText,
  },
];

const checklist = [
  "인증과 인가의 차이 설명",
  "로그인 성공 후 세션 생성",
  "새로고침 후 세션 유지",
  "로그아웃 후 보호 페이지 차단",
  "비로그인 사용자의 /posts/new 접근 차단",
  "Supabase 전환 시 필요한 파일 구조 정리",
];

export default function Chapter9Page() {
  return (
    <div className="space-y-8">
      <section className="neon-panel neon-grid rounded-[34px] px-6 py-7 md:px-8 md:py-9">
        <p className="text-xs uppercase tracking-[0.45em] text-rose-200/70">
          Chapter 9. Supabase Authentication
        </p>
        <h2 className="display-font glow-text mt-3 max-w-4xl text-3xl font-semibold text-white md:text-5xl">
          이메일/비밀번호 로그인과 보호 페이지 흐름을 Vercel 화면에 연결했습니다
        </h2>
        <p className="mt-5 max-w-3xl leading-8 text-rose-50/76">
          Ch9A의 목표는 아무나 글을 쓰지 못하게 하고, 로그인한 사용자만 마이페이지와 새 글 쓰기 화면에 들어가도록 만드는 것입니다.
          이 배포본은 Supabase로 옮기기 전 구조를 먼저 고정한 학습용 구현입니다.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-full bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_28px_rgba(251,113,133,0.42)] transition hover:-translate-y-0.5"
          >
            로그인 테스트
          </Link>
          <Link
            href="/posts/new"
            className="neon-pill rounded-full px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
          >
            보호 라우트 테스트
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {workflow.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className="neon-panel rounded-[28px] p-5">
              <Icon className="h-6 w-6 text-rose-200" aria-hidden="true" />
              <h3 className="display-font mt-4 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-rose-50/74">{item.body}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="neon-panel rounded-[30px] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.36em] text-rose-200/58">Core Principle</p>
          <h3 className="display-font mt-3 text-2xl font-semibold text-white md:text-3xl">
            인증은 누구인지 확인하고, 인가는 무엇을 할 수 있는지 결정합니다
          </h3>
          <div className="mt-5 space-y-4 leading-8 text-rose-50/76">
            <p>
              Ch9A 문서의 핵심은 인증 흐름을 먼저 글로 고정한 뒤 구현하는 것입니다. 로그인 방식은 이메일/비밀번호로 제한하고,
              로그인 후 이동 경로와 보호할 페이지를 명확히 정합니다.
            </p>
            <p>
              실제 Supabase 적용 시에는 `@supabase/ssr`의 브라우저/서버 클라이언트로 바꾸고, Email Provider와 Vercel Redirect URL을
              Supabase 대시보드에서 확인하면 됩니다.
            </p>
          </div>
        </div>

        <aside className="neon-panel rounded-[28px] p-5">
          <p className="text-xs uppercase tracking-[0.32em] text-rose-200/60">Learning Checklist</p>
          <ul className="mt-4 space-y-3">
            {checklist.map((item) => (
              <li
                key={item}
                className="neon-outline flex items-start gap-3 rounded-2xl px-3 py-3 text-sm text-rose-50/88"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-rose-200" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
