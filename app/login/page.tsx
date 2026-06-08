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
      <section className="neon-panel relative overflow-hidden rounded-xl p-6 md:p-8">
        <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#ff00cc] to-[#ff8a00]" />
        <h2 className="mono-font glow-text text-3xl font-black tracking-widest text-[#ff1744] md:text-5xl">
          로그인
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-neutral-300">
          블로그 글을 작성하고 관리하려면 로그인해주세요.
        </p>

        <div className="mt-7">
          <LoginForm nextPath={nextPath} />
        </div>
      </section>

      <aside className="neon-panel rounded-xl p-6">
        <h3 className="text-lg font-black text-white">회원 전용 기능</h3>
        <p className="mt-4 text-sm leading-7 text-neutral-300">
          로그인하면 새 글 작성, 내 글 수정, 삭제 기능을 사용할 수 있습니다.
        </p>
      </aside>
    </div>
  );
}
