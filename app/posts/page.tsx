import Link from "next/link";
import ChecklistPanel from "../../components/checklist-panel";
import { finalChecklist, posts } from "../../lib/posts";

export default function PostsPage() {
  return (
    <div className="space-y-8">
      <section className="neon-panel rounded-[34px] px-6 py-7 md:px-8 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-rose-200/65">
              Chapter 5 Posts
            </p>
            <h2 className="display-font glow-text mt-3 text-3xl font-semibold text-white md:text-5xl">
              목록, 상세, 작성 흐름을 3개의 포스트로 정리한 실습 블로그
            </h2>
            <p className="mt-4 leading-8 text-rose-50/74">
              ch5A.md와 ch5B.md의 설명, 체크포인트, 최종 검증 요소를 각각의 카드 안에 녹였다.
              각 카드는 상세 페이지로 연결되며, 클릭하면 동적 라우트 주소로 이동한다.
            </p>
          </div>

          <Link
            href="/posts/new"
            className="neon-pill rounded-full px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
          >
            새 글 쓰기 테스트
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {posts.map((post) => {
            const checklistItems = post.sections.flatMap((section) => section.checklist ?? []);

            return (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="group neon-panel scan-lines block rounded-[30px] p-6 transition duration-300 hover:-translate-y-1 hover:border-rose-300/40"
              >
                <div
                  className="rounded-2xl px-4 py-3 text-xs uppercase tracking-[0.3em] text-rose-100/88"
                  style={{ backgroundImage: post.accent }}
                >
                  Step 0{post.id} · {post.category}
                </div>

                <h3 className="display-font mt-5 text-2xl font-semibold text-white transition group-hover:text-rose-100 md:text-3xl">
                  {post.title}
                </h3>
                <p className="mt-4 leading-8 text-rose-50/72">{post.summary}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {checklistItems.slice(0, 3).map((item) => (
                    <span
                      key={item.id}
                      className="rounded-full border border-rose-200/12 bg-black/20 px-3 py-1 text-xs text-rose-100/68"
                    >
                      ✓ {item.text}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-rose-200/10 pt-4 text-sm text-rose-100/56">
                  <span>{post.readTime}</span>
                  <span>{post.route}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="space-y-6">
          <ChecklistPanel title="최종 검증 체크리스트" items={finalChecklist} compact />

          <section className="neon-panel rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.32em] text-rose-200/60">Flow Test</p>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-rose-50/78">
              <li>1. /posts에서 카드 3개를 확인한다.</li>
              <li>2. 카드를 눌러 /posts/1 상세 페이지로 이동한다.</li>
              <li>3. 목록으로 돌아가기를 눌러 /posts로 돌아온다.</li>
              <li>4. 새 글 쓰기에서 저장 버튼을 눌러 /posts로 이동한다.</li>
            </ol>
          </section>
        </div>
      </section>
    </div>
  );
}
