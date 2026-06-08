"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { readLocalPosts } from "@/lib/local-posts";
import { formatPostDate, type DbPost } from "@/lib/posts-crud";
import PostMedia from "@/components/PostMedia";
import SearchBar from "./SearchBar";
import { useEffect, useMemo, useState } from "react";

type PostsClientProps = {
  initialPosts: DbPost[];
};

export default function PostsClient({ initialPosts }: PostsClientProps) {
  const [query, setQuery] = useState("");
  const [localPosts, setLocalPosts] = useState<DbPost[]>([]);
  const allPosts = useMemo(() => {
    const initialIds = new Set(initialPosts.map((post) => post.id));
    return [...localPosts.filter((post) => !initialIds.has(post.id)), ...initialPosts];
  }, [initialPosts, localPosts]);

  useEffect(() => {
    setLocalPosts(readLocalPosts());
  }, []);

  const filteredPosts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return allPosts;
    }

    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(value) ||
        post.content.toLowerCase().includes(value),
    );
  }, [allPosts, query]);

  return (
    <section>
      <SearchBar query={query} onSearch={setQuery} />

      {filteredPosts.length === 0 ? (
        <div className="neon-panel rounded-xl p-8 text-center">
          <FileText className="mx-auto h-10 w-10 text-rose-200/70" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-white">아직 보여줄 글이 없습니다</h2>
          <p className="mt-3 text-rose-50/70">검색어를 바꾸거나 첫 기록을 남겨보세요.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="group neon-panel neon-card-hover scan-lines relative flex min-h-80 flex-col justify-between overflow-hidden rounded-xl p-6"
            >
              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff1744] to-transparent" />
              <div>
                <div className="flex items-center justify-between gap-3 text-[11px]">
                  <span className="rounded-full border border-[#ff2d75]/40 bg-[#ff1744]/20 px-2.5 py-0.5 font-bold text-[#ffccd5]">
                    개인 기록
                  </span>
                  <span className="mono-font font-semibold text-neutral-400">
                    {formatPostDate(post.created_at)}
                  </span>
                </div>
                {post.media_url ? (
                  <div className="mt-4">
                    <PostMedia
                      url={post.media_url}
                      type={post.media_type}
                      title={post.title}
                      variant="card"
                    />
                  </div>
                ) : null}
                <h2 className="mt-5 line-clamp-2 text-lg font-extrabold leading-snug text-white transition group-hover:text-[#ff1744]">
                  {post.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-sm leading-7 text-neutral-300">
                  {post.content}
                </p>
              </div>
              <div className="mt-6 flex justify-end border-t border-red-500/10 pt-4">
                <span className="mono-font text-xs font-bold tracking-wide text-[#ff1744] transition group-hover:text-[#ff8a00]">
                  읽기 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
