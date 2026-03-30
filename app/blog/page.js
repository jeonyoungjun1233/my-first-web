import Link from "next/link";

const posts = [
  {
    id: 1,
    category: "Semantic HTML",
    title: "시맨틱 태그로 블로그 구조를 읽기 쉽게 만들기",
    preview:
      "오늘은 header, nav, main, article, footer를 구분해서 쓰는 이유를 정리했다. 단순히 화면을 나누는 것을 넘어서 SEO, 접근성, 그리고 코드 가독성까지 좋아진다는 점이 핵심이었다.",
    author: "전영준",
    date: "3월 30일",
    dateTime: "2026-03-30",
  },
  {
    id: 2,
    category: "Tailwind CSS",
    title: "Tailwind 클래스는 속성-값으로 읽으면 훨씬 쉬워진다",
    preview:
      "p-4는 padding, bg-white는 배경색, text-lg는 글자 크기처럼 읽는 연습을 했다. 클래스를 문장처럼 해석하니 카드 스타일이 왜 그렇게 보이는지 더 빠르게 이해할 수 있었다.",
    author: "전영준",
    date: "3월 30일",
    dateTime: "2026-03-30",
  },
  {
    id: 3,
    category: "Responsive Layout",
    title: "모바일 우선 반응형은 1열에서 시작해 2열로 확장한다",
    preview:
      "grid-cols-1을 기본으로 두고 md:grid-cols-2를 붙이면 화면 크기에 따라 카드 배치가 자연스럽게 바뀐다. 작은 화면부터 설계하는 모바일 우선 접근이 왜 중요한지도 함께 배웠다.",
    author: "전영준",
    date: "3월 30일",
    dateTime: "2026-03-30",
  },
];

export const metadata = {
  title: "전영준 카드뉴스 블로그",
  description: "Chapter 3 학습 내용을 카드뉴스 형식으로 정리한 블로그 페이지",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Card News Blog</p>
            <h1 className="mt-2 text-3xl font-bold">전영준의 학습 블로그</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
            >
              자기소개 홈
            </Link>
            <Link
              href="/blog"
              className="rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              카드뉴스
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/60 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Chapter 3 Study Note</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight">
            HTML 시맨틱, Tailwind CSS, 반응형 레이아웃을 카드뉴스처럼 한눈에 정리했습니다.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            오늘 배운 내용을 단순 메모로 끝내지 않고, 블로그 카드 형식으로 다시 정리했습니다.
            구조를 먼저 잡고, 스타일을 붙이고, 마지막으로 반응형까지 적용하는 흐름을
            그대로 담았습니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-sky-300/40 bg-sky-400/10 px-4 py-2 text-sm text-sky-200">
              Semantic Tags
            </span>
            <span className="rounded-full border border-sky-300/40 bg-sky-400/10 px-4 py-2 text-sm text-sky-200">
              Tailwind CSS
            </span>
            <span className="rounded-full border border-sky-300/40 bg-sky-400/10 px-4 py-2 text-sm text-sky-200">
              Responsive Design
            </span>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-sky-300">Latest Cards</p>
              <h3 className="mt-2 text-2xl font-bold">오늘의 학습 카드뉴스</h3>
            </div>
            <p className="text-sm text-slate-400">모바일 1열, 태블릿 이상 2열로 배치됩니다.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-sky-300/40 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-sky-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
                    {post.category}
                  </span>
                  <span className="text-sm text-slate-400">학습 카드 {post.id}</span>
                </div>

                <h4 className="mt-5 text-2xl font-bold leading-snug text-white transition group-hover:text-sky-200">
                  {post.title}
                </h4>
                <p className="mt-4 leading-8 text-slate-300">{post.preview}</p>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
                  <span>작성자: {post.author}</span>
                  <time dateTime={post.dateTime}>{post.date}</time>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>2026 전영준 학습 블로그</p>
          <p>Ch3A 학습 내용을 카드뉴스 형식으로 정리했습니다.</p>
        </div>
      </footer>
    </div>
  );
}
