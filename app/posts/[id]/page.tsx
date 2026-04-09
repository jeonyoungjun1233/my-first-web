import Link from "next/link";
import ChecklistPanel from "../../../components/checklist-panel";
import { posts } from "../../../lib/posts";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({
  params,
}: PostDetailPageProps) {
  const { id } = await params;
  const post = posts.find((candidate) => candidate.id === Number(id));

  if (!post) {
    return (
      <section className="neon-panel mx-auto max-w-3xl rounded-[34px] px-6 py-10 text-center md:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-rose-200/60">
          Missing Signal
        </p>
        <h1 className="display-font glow-text mt-4 text-3xl font-semibold text-white md:text-5xl">
          찾을 수 없습니다
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-8 text-rose-50/72">
          요청한 게시글 번호에 해당하는 학습 기록이 아직 준비되지 않았다. /posts로 돌아가서
          다른 카드부터 확인하면 된다.
        </p>
        <Link
          href="/posts"
          className="neon-pill mt-8 inline-flex rounded-full px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
        >
          ← 목록으로 돌아가기
        </Link>
      </section>
    );
  }

  const checklistItems = post.sections.flatMap((section) => section.checklist ?? []);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
      <article className="space-y-6">
        <section className="neon-panel rounded-[34px] px-6 py-7 md:px-8 md:py-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="neon-pill rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-rose-100">
              {post.category}
            </span>
            <span className="mono-font text-xs text-rose-200/58">{post.route}</span>
          </div>

          <h1 className="display-font glow-text mt-5 text-3xl font-semibold text-white md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl leading-8 text-rose-50/74">{post.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-rose-100/56">
            <span>전영준</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </section>

        {post.sections.map((section, index) => (
          <section key={section.id} className="neon-panel scan-lines rounded-[30px] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.36em] text-rose-200/58">
              Section 0{index + 1}
            </p>
            <h2 className="display-font mt-3 text-2xl font-semibold text-white md:text-3xl">
              {section.title}
            </h2>

            <div className="mt-5 space-y-4 text-[0.98rem] leading-8 text-rose-50/76">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {section.checklist ? (
              <div className="mt-6">
                <ChecklistPanel title="이 섹션에서 완료한 체크" items={section.checklist} compact />
              </div>
            ) : null}
          </section>
        ))}

        <Link
          href="/posts"
          className="neon-pill inline-flex rounded-full px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
        >
          ← 목록으로
        </Link>
      </article>

      <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
        <ChecklistPanel title="포스트 전체 점검" items={checklistItems} />

        <section className="neon-panel rounded-[28px] p-5">
          <p className="text-xs uppercase tracking-[0.32em] text-rose-200/60">Quick Route</p>
          <div className="mt-4 grid gap-3 text-sm text-rose-50/78">
            <Link href="/" className="neon-outline rounded-2xl px-4 py-3 transition hover:border-rose-300/36">
              홈으로 이동
            </Link>
            <Link href="/posts" className="neon-outline rounded-2xl px-4 py-3 transition hover:border-rose-300/36">
              블로그 목록으로 이동
            </Link>
            <Link href="/posts/new" className="neon-outline rounded-2xl px-4 py-3 transition hover:border-rose-300/36">
              새 글 쓰기 테스트
            </Link>
          </div>
        </section>
      </aside>
    </div>
  );
}
