"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Edit3, Trash2 } from "lucide-react";
import { deletePost } from "@/lib/posts-crud";
import { useAuth } from "@/lib/auth-context";

type PostActionsProps = {
  postId: string;
  authorId: string;
};

export default function PostActions({ postId, authorId }: PostActionsProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);

  if (!user || user.id !== authorId) {
    return null;
  }

  async function handleDelete() {
    if (!window.confirm("이 글을 삭제할까요?")) return;

    setDeleting(true);
    const { error } = await deletePost(postId, user?.accessToken);
    setDeleting(false);

    if (error) {
      window.alert(error.message);
      return;
    }

    router.push("/posts");
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href={`/posts/${postId}/edit`}
        className="inline-flex items-center gap-2 rounded-lg border border-rose-200/24 bg-black/25 px-4 py-2 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:border-rose-200/45"
      >
        <Edit3 className="h-4 w-4" aria-hidden="true" />
        수정하기
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="inline-flex items-center gap-2 rounded-lg bg-rose-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        {deleting ? "삭제 중" : "삭제하기"}
      </button>
    </div>
  );
}
