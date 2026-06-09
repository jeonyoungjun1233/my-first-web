"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PenLine } from "lucide-react";
import { readLocalPosts } from "@/lib/local-posts";
import { formatPostDate, type DbPost } from "@/lib/posts-crud";

type ProfilePostSummaryProps = {
  userId: string;
  initialPosts: DbPost[];
  variant: "count" | "recent";
};

export default function ProfilePostSummary({
  userId,
  initialPosts,
  variant,
}: ProfilePostSummaryProps) {
  const [localPosts, setLocalPosts] = useState<DbPost[]>([]);

  useEffect(() => {
    setLocalPosts(readLocalPosts());
  }, []);

  const myPosts = useMemo(() => {
    const serverPostIds = new Set(initialPosts.map((post) => post.id));
    const ownedLocalPosts = localPosts.filter(
      (post) => post.user_id === userId && !serverPostIds.has(post.id),
    );

    return [...ownedLocalPosts, ...initialPosts]
      .filter((post) => post.user_id === userId)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
  }, [initialPosts, localPosts, userId]);

  const recentPosts = myPosts.slice(0, 4);

  if (variant === "count") {
    return (
      <div className="neon-outline rounded-2xl bg-black/20 p-5">
        <PenLine className="h-6 w-6 text-rose-200" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-rose-200/70">작성한 글 수</p>
        <p className="mt-2 text-xl font-semibold text-white">{myPosts.length}개</p>
      </div>
    );
  }

  return (
      <aside className="neon-panel rounded-[28px] p-5">
        <h3 className="display-font text-2xl font-semibold text-white">최근 작성한 글</h3>
        <div className="mt-4 space-y-3">
          {recentPosts.length === 0 ? (
            <p className="neon-outline rounded-2xl px-3 py-3 text-sm text-rose-50/78">
              아직 작성한 글이 없습니다.
            </p>
          ) : (
            recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="neon-outline block rounded-2xl px-3 py-3 text-sm text-rose-50/88 transition hover:-translate-y-0.5 hover:border-rose-200/40"
              >
                <span className="block font-semibold text-white">{post.title}</span>
                <span className="mt-2 block text-xs text-rose-100/58">
                  {formatPostDate(post.created_at)}
                </span>
              </Link>
            ))
          )}
        </div>
      </aside>
  );
}
