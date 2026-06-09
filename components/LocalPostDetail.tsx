"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import CommentSection from "@/components/CommentSection";
import LikeButton from "@/components/LikeButton";
import PostMedia from "@/components/PostMedia";
import { useAuth } from "@/lib/auth-context";
import { deleteLocalPost, findLocalPost } from "@/lib/local-posts";
import { formatPostDate, type DbPost } from "@/lib/posts-crud";

type LocalPostDetailProps = {
  id: string;
};

export default function LocalPostDetail({ id }: LocalPostDetailProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<DbPost | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPost(findLocalPost(id));
    setReady(true);
  }, [id]);

  if (!ready) {
    return (
      <section className="neon-panel mx-auto max-w-3xl rounded-xl p-8 text-center">
        <p className="text-rose-50">글을 불러오는 중입니다.</p>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="neon-panel mx-auto max-w-3xl rounded-xl p-8 text-center">
        <h1 className="glow-text text-3xl font-black text-white">페이지를 찾을 수 없습니다</h1>
        <p className="mt-4 text-neutral-300">주소가 잘못되었거나 삭제된 페이지입니다.</p>
        <Link
          href="/posts"
          className="mt-6 inline-flex rounded-lg border border-red-500/35 bg-[#180006]/60 px-5 py-3 text-sm font-semibold text-[#ffccd5] transition hover:-translate-y-0.5"
        >
          목록으로 돌아가기
        </Link>
      </section>
    );
  }

  const canDelete = Boolean(user && user.id === post.user_id);

  function handleDelete() {
    const currentPost = post;

    if (!canDelete || !currentPost) {
      return;
    }

    if (!window.confirm("이 글을 삭제하시겠습니까?")) {
      return;
    }

    const deleted = deleteLocalPost(currentPost.id);

    if (!deleted) {
      window.alert("글 삭제 중 문제가 발생했습니다.");
      return;
    }

    window.alert("글이 삭제되었습니다.");
    router.push("/posts");
    router.refresh();
  }

  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <section className="neon-panel relative overflow-hidden rounded-xl px-6 py-7 md:px-8 md:py-8">
        <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#ff00cc] to-[#ff1744]" />
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mono-font text-sm font-semibold tracking-wider text-[#ffccd5]">개인 기록</p>
            <h1 className="glow-text mt-4 text-3xl font-black text-white md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-sm text-rose-100/70">{formatPostDate(post.created_at)}</p>
          </div>
          {canDelete ? (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              삭제하기
            </button>
          ) : null}
        </div>
      </section>

      {post.media_url ? (
        <section className="neon-panel rounded-xl p-4 md:p-5">
          <PostMedia url={post.media_url} type={post.media_type} title={post.title} />
        </section>
      ) : null}

      <section className="neon-panel rounded-xl p-6 md:p-8">
        <div className="whitespace-pre-wrap text-[1rem] leading-8 text-rose-50/78">
          {post.content}
        </div>
      </section>

      <LikeButton postId={post.id} initialLikes={[]} />
      <CommentSection postId={post.id} initialComments={[]} />

      <Link
        href="/posts"
        className="inline-flex rounded-lg border border-red-500/35 bg-[#180006]/60 px-5 py-3 text-sm font-semibold text-[#ffccd5] transition hover:-translate-y-0.5"
      >
        목록으로 돌아가기
      </Link>
    </article>
  );
}
