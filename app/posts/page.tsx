import Link from "next/link";
import ChecklistPanel from "../../components/checklist-panel";
import PostsClient from "../../components/PostsClient";
import { finalChecklist } from "../../lib/posts";

export default async function PostsPage() {
  // 서버에서 JSONPlaceholder를 가져옵니다 (더미 데이터)
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  const apiPosts = await res.json();

  return (
    <div className="space-y-8">
      <section className="neon-panel rounded-[34px] px-6 py-7 md:px-8 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-rose-200/65">Chapter 6 Posts</p>
            <h2 className="display-font glow-text mt-3 text-3xl font-semibold text-white md:text-5xl">
              서버에서 데이터를 가져와 클라이언트에서 검색/삭제를 실습합니다
            </h2>
            <p className="mt-4 leading-8 text-rose-50/74">
              JSONPlaceholder에서 더미 게시글을 가져와 `PostsClient`로 전달합니다.
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
        <div>
          <PostsClient initialPosts={apiPosts} />
        </div>

        <div className="space-y-6">
          <ChecklistPanel title="최종 검증 체크리스트" items={finalChecklist} compact />

          <section className="neon-panel rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.32em] text-rose-200/60">Flow Test</p>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-rose-50/78">
              <li>1. /posts에서 JSONPlaceholder의 게시글 목록을 확인한다.</li>
              <li>2. 검색어를 입력하면 클라이언트에서 필터링된다.</li>
              <li>3. 삭제 버튼을 누르면 confirm 후 목록에서 제거된다.</li>
              <li>4. 새 글 쓰기에서 제목 검증을 확인한다.</li>
            </ol>
          </section>
        </div>
      </section>
    </div>
  );
}
