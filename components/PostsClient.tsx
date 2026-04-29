"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function PostsClient({ initialPosts }: { initialPosts: any[] }) {
  const [posts, setPosts] = useState<any[]>(initialPosts ?? []);
  const [filtered, setFiltered] = useState<any[]>(initialPosts ?? []);

  function handleSearch(q: string) {
    const value = q.trim().toLowerCase();
    if (!value) {
      setFiltered(posts);
      return;
    }
    setFiltered(
      posts.filter(
        (p) => p.title?.toLowerCase().includes(value) || p.body?.toLowerCase().includes(value)
      )
    );
  }

  function handleDelete(id: number) {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    setFiltered(updated);
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="group neon-panel scan-lines block rounded-[30px] p-6 transition duration-300 hover:-translate-y-1 hover:border-rose-300/40"
          >
            <Link href={`/posts/${post.id}`} className="group/block">
              <h3 className="display-font mt-2 text-lg font-semibold text-white">{post.title}</h3>
              <p className="mt-3 text-sm text-rose-50/72">{post.body?.slice(0, 120)}...</p>
            </Link>

            <div className="mt-4 flex items-center justify-between gap-3 text-sm text-rose-100/56">
              <span>id: {post.id}</span>
              <button
                onClick={() => handleDelete(post.id)}
                className="rounded-full bg-rose-400 px-3 py-1 text-xs font-semibold text-white"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
