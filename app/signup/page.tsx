import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="neon-panel rounded-[34px] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.4em] text-rose-200/65">Chapter 9 Auth</p>
        <h2 className="display-font glow-text mt-3 text-3xl font-semibold text-white md:text-5xl">
          회원가입과 이메일 확인 흐름
        </h2>
        <p className="mt-4 max-w-2xl leading-8 text-rose-50/74">
          이름, 이메일, 비밀번호를 입력하고 Ch9의 이메일 인증 흐름을 점검합니다.
        </p>

        <div className="mt-7">
          <SignupForm />
        </div>
      </section>

      <aside className="neon-panel rounded-[28px] p-5">
        <p className="text-xs uppercase tracking-[0.32em] text-rose-200/60">Supabase Memo</p>
        <div className="mt-4 space-y-3 text-sm leading-7 text-rose-50/78">
          <p>실제 Supabase 전환 시 Email Provider를 켜고 Redirect URL을 Vercel 주소로 등록합니다.</p>
          <p>이후 `@supabase/ssr` 기반 클라이언트와 미들웨어로 교체하면 Ch9A 문서 구조와 맞아집니다.</p>
        </div>
      </aside>
    </div>
  );
}

