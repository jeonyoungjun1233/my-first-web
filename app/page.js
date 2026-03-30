const profileItems = [
  { label: "이름", value: "전영준" },
  { label: "학과", value: "공공인재빅데이터융합학" },
  { label: "취미", value: "런닝" },
  { label: "관심 분야", value: "공공데이터와 데이터 기반 문제 해결" },
];

const techBadges = ["Next.js 14.2.21", "React 18.3.1", "Tailwind CSS 3.4.17"];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <section className="mx-auto flex max-w-5xl flex-col gap-6 lg:flex-row">
        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl lg:w-2/5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
            Chapter 2 Assignment
          </p>
          <div className="mt-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-4xl font-bold">
            전
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight">안녕하세요, 전영준입니다.</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            공공 데이터를 이해하고, 데이터를 바탕으로 더 나은 의사결정을 만드는 방법에
            관심이 있습니다. 꾸준히 배우고 성장하는 개발자가 되는 것이 현재 목표입니다.
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-sky-300">한 마디</p>
            <p className="mt-3 leading-7 text-slate-200">
              런닝을 하듯 꾸준한 페이스로 배우고, 작은 개선을 쌓아 큰 결과를 만드는
              사람이 되고 싶습니다.
            </p>
          </div>
        </div>

        <div className="flex-1 rounded-3xl bg-white p-8 shadow-xl">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-sm font-semibold text-blue-600">블로그 소개 페이지</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Copilot 과제 제출용 최종본
              </h2>
            </div>
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              App Router
            </span>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {profileItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <dt className="text-sm font-semibold text-slate-500">{item.label}</dt>
                <dd className="mt-2 text-lg font-bold text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 rounded-2xl bg-blue-50 p-6">
            <p className="text-sm font-semibold text-blue-700">학습 목표</p>
            <p className="mt-3 leading-7 text-slate-700">
              AI 도구를 활용하더라도 결과를 직접 검증하고, 공공 분야의 데이터를 이해하는
              시각을 함께 키우는 개발자가 되고자 합니다.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-slate-600">사용 기술</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {techBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
