import Link from "next/link";
import { PenLine } from "lucide-react";
import PostsClient from "@/components/PostsClient";
import { getPosts } from "@/lib/posts-crud";

export default async function PostsPage() {
  const { data: posts, error } = await getPosts();

  return (
    <div className="space-y-8">
      <section className="border-b border-red-500/30 pb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mono-font text-xs font-semibold tracking-[0.35em] text-[#ffccd5]">
              Blog
            </p>
            <h1 className="mono-font glow-text mt-3 bg-gradient-to-r from-[#ff00cc] to-[#ff1744] bg-clip-text text-3xl font-black tracking-widest text-transparent md:text-5xl">
              게시글 목록
            </h1>
            <p className="mt-3 text-sm leading-8 text-neutral-400">
              AI, 웹 개발, 대학 생활에 대한 기록을 최신순으로 모았습니다.
            </p>
          </div>

          <Link
            href="/posts/new"
            className="neon-gradient-button inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
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
      ) : (
        <PostsClient initialPosts={posts ?? []} />
      )}
    </div>
  );
}
