"use client";

import { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { addLike, removeLike, type BlogLike } from "@/lib/likes";
import { useAuth } from "@/lib/auth-context";

type LikeButtonProps = {
  postId: string;
  initialLikes: BlogLike[];
};

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const { user } = useAuth();
  const [count, setCount] = useState(initialLikes.length);
  const [liked, setLiked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const storageKey = useMemo(() => `blog-like-${postId}`, [postId]);

  useEffect(() => {
    const knownLike = user ? initialLikes.some((like) => like.user_id === user.id) : false;
    setLiked(knownLike || window.localStorage.getItem(storageKey) === "1");
  }, [initialLikes, storageKey, user]);

  async function handleClick() {
    setMessage(null);

    if (!user) {
      setMessage("로그인하면 좋아요를 누를 수 있습니다.");
      return;
    }

    setSaving(true);
    const result = liked
      ? await removeLike(postId, user.id, user.accessToken)
      : await addLike(postId, user.id, user.accessToken);
    setSaving(false);

    if (result.error) {
      setMessage("좋아요 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setLiked((current) => {
      const next = !current;
      window.localStorage.setItem(storageKey, next ? "1" : "0");
      return next;
    });
    setCount((current) => Math.max(0, current + (liked ? -1 : 1)));
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-lg border border-rose-200/24 bg-black/25 px-4 py-2 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:border-rose-200/45 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Heart
          className={`h-4 w-4 ${liked ? "fill-rose-300 text-rose-300" : "text-rose-200"}`}
          aria-hidden="true"
        />
        {liked ? "좋아요 취소" : "좋아요"} {count}
      </button>
      {message ? <p className="text-sm text-rose-100/70">{message}</p> : null}
    </div>
  );
}
