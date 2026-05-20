import Link from "next/link";
import { FileText, PenLine } from "lucide-react";
import { formatPostDate, getPosts } from "@/lib/posts-crud";

export default async function PostsPage() {
  const { data: posts, error } = await getPosts();

  return (
    <div className="space-y-8">
      <section className="neon-panel rounded-[34px] px-6 py-7 md:px-8 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-rose-200/65">
              Chapter 10 CRUD
            </p>
            <h1 className="display-font glow-text mt-3 text-3xl font-semibold text-white md:text-5xl">
              게시글 목록
            </h1>
            <p className="mt-4 leading-8 text-rose-50/74">
              Supabase posts 테이블을 최신순으로 조회합니다.
            </p>
          </div>

          <Link
            href="/posts/new"
            className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_28px_rgba(251,113,133,0.35)] transition hover:-translate-y-0.5"
          >
            <PenLine className="h-4 w-4" aria-hidden="true" />
            새 글 쓰기
          </Link>
        </div>
      </section>

      {error ? (
        <section className="neon-panel rounded-[28px] p-6">
          <h2 className="text-lg font-semibold text-white">게시글을 불러오지 못했습니다</h2>
          <p className="mt-3 leading-7 text-rose-50/74">{error.message}</p>
        </section>
      ) : null}

      {!error && (!posts || posts.length === 0) ? (
        <section className="neon-panel rounded-[28px] p-8 text-center">
          <FileText className="mx-auto h-10 w-10 text-rose-200/70" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-white">아직 게시글이 없습니다</h2>
          <p className="mt-3 text-rose-50/70">첫 게시글을 작성해서 CRUD 흐름을 시작하세요.</p>
        </section>
      ) : null}

      <section className="grid gap-5 md:grid-cols-2">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="group neon-panel scan-lines block rounded-[30px] p-6 transition duration-300 hover:-translate-y-1 hover:border-rose-300/40"
          >
            <p className="text-xs uppercase tracking-[0.32em] text-rose-200/55">
              {formatPostDate(post.created_at)}
            </p>
            <h2 className="display-font mt-3 text-2xl font-semibold text-white">
              {post.title}
            </h2>
            <p className="mt-4 line-clamp-3 leading-7 text-rose-50/72">{post.content}</p>
            <p className="mt-5 text-xs text-rose-100/55">작성자 ID: {post.user_id}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
