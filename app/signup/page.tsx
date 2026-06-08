import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="neon-panel rounded-[34px] p-6 md:p-8">
        <h2 className="display-font glow-text text-3xl font-semibold text-white md:text-5xl">
          회원가입
        </h2>
        <p className="mt-4 max-w-2xl leading-8 text-rose-50/74">
          블로그에 글을 작성하기 위한 계정을 만들어주세요.
        </p>

        <div className="mt-7">
          <SignupForm />
        </div>
      </section>

      <aside className="neon-panel rounded-[28px] p-5">
        <h3 className="display-font text-2xl font-semibold text-white">가입 안내</h3>
        <p className="mt-4 text-sm leading-7 text-rose-50/78">
          가입 후 로그인하면 게시글을 작성하고 관리할 수 있습니다.
        </p>
      </aside>
    </div>
  );
}
