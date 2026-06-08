import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="neon-panel relative overflow-hidden rounded-xl p-6 md:p-8">
        <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#ff00cc] to-[#ff8a00]" />
        <h2 className="mono-font glow-text text-3xl font-black tracking-widest text-[#ff1744] md:text-5xl">
          회원가입
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-neutral-300">
          블로그에 글을 작성하기 위한 계정을 만들어주세요.
        </p>

        <div className="mt-7">
          <SignupForm />
        </div>
      </section>

      <aside className="neon-panel rounded-xl p-6">
        <h3 className="text-lg font-black text-white">가입 안내</h3>
        <p className="mt-4 text-sm leading-7 text-neutral-300">
          가입 후 로그인하면 게시글을 작성하고 관리할 수 있습니다.
        </p>
      </aside>
    </div>
  );
}
