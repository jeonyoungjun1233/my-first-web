import Link from "next/link";
import LoginForm from "@/components/login-form";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

function cleanNextPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/mypage";
  }

  return value;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = cleanNextPath(params.next);

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="neon-panel rounded-[34px] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.4em] text-rose-200/65">Chapter 9 Auth</p>
        <h2 className="display-font glow-text mt-3 text-3xl font-semibold text-white md:text-5xl">
          이메일/비밀번호 로그인
        </h2>
        <p className="mt-4 max-w-2xl leading-8 text-rose-50/74">
          Ch9A의 핵심 흐름인 로그인, 세션 유지, 보호 페이지 이동을 확인하는 화면입니다.
        </p>

        <div className="mt-7">
          <LoginForm nextPath={nextPath} />
        </div>
      </section>

      <aside className="space-y-6">
        <section className="neon-panel rounded-[28px] p-5">
          <p className="text-xs uppercase tracking-[0.32em] text-rose-200/60">Protected</p>
          <div className="mt-4 grid gap-3 text-sm text-rose-50/78">
            <Link href="/mypage" className="neon-outline rounded-2xl px-4 py-3 transition hover:border-rose-300/36">
              마이페이지 접근 테스트
            </Link>
            <Link href="/posts/new" className="neon-outline rounded-2xl px-4 py-3 transition hover:border-rose-300/36">
              새 글 쓰기 보호 테스트
            </Link>
          </div>
        </section>

        <section className="neon-panel rounded-[28px] p-5">
          <p className="text-xs uppercase tracking-[0.32em] text-rose-200/60">Checklist</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-rose-50/78">
            <li>1. 로그인 성공 후 보호 페이지로 이동</li>
            <li>2. 새로고침 후에도 세션 유지</li>
            <li>3. 로그아웃 후 세션 제거</li>
            <li>4. 비로그인 접근 시 로그인으로 리다이렉트</li>
          </ul>
        </section>
      </aside>
    </div>
  );
}

