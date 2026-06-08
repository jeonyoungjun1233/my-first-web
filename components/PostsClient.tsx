"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { formatPostDate, type DbPost } from "@/lib/posts-crud";
import SearchBar from "./SearchBar";
import { useMemo, useState } from "react";

type PostsClientProps = {
  initialPosts: DbPost[];
};

export default function PostsClient({ initialPosts }: PostsClientProps) {
  const [query, setQuery] = useState("");
  const filteredPosts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return initialPosts;
    }

    return initialPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(value) ||
        post.content.toLowerCase().includes(value),
    );
  }, [initialPosts, query]);

  return (
    <section>
      <SearchBar query={query} onSearch={setQuery} />

      {filteredPosts.length === 0 ? (
        <div className="neon-panel rounded-[28px] p-8 text-center">
          <FileText className="mx-auto h-10 w-10 text-rose-200/70" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-white">아직 보여줄 글이 없습니다</h2>
          <p className="mt-3 text-rose-50/70">검색어를 바꾸거나 첫 기록을 남겨보세요.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredPosts.map((post) => (
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
              <p className="mt-5 text-xs text-rose-100/55">개인 기록</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
