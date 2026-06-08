"use client";

import { type FormEvent, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { createComment, type BlogComment } from "@/lib/comments";
import { formatPostDate } from "@/lib/posts-crud";
import { useAuth } from "@/lib/auth-context";

type CommentSectionProps = {
  postId: string;
  initialComments: BlogComment[];
};

function shortName(email: string) {
  return email.split("@")[0] || "방문자";
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const nextContent = content.trim();
    if (!nextContent) {
      setMessage("댓글을 입력해주세요.");
      return;
    }

    if (!user) {
      setMessage("로그인하면 댓글을 남길 수 있습니다.");
      return;
    }

    setSaving(true);
    const { data, error } = await createComment(
      postId,
      user.id,
      user.name || shortName(user.email),
      nextContent,
      user.accessToken,
    );
    setSaving(false);

    if (error) {
      setMessage("댓글 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (data?.[0]) {
      setComments((current) => [...current, data[0]]);
    }
    setContent("");
  }

  return (
    <section className="neon-panel rounded-[30px] p-6 md:p-8">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-5 w-5 text-rose-200" aria-hidden="true" />
        <h2 className="display-font text-2xl font-semibold text-white">댓글</h2>
      </div>

      <div className="mt-5 space-y-3">
        {comments.length === 0 ? (
          <p className="rounded-lg border border-rose-200/14 bg-black/20 px-4 py-4 text-sm text-rose-50/70">
            아직 댓글이 없습니다.
          </p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="neon-outline rounded-2xl bg-black/18 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-rose-100/58">
                <span className="font-semibold text-rose-100/80">{comment.author_name}</span>
                <span>{formatPostDate(comment.created_at)}</span>
              </div>
              <p className="mt-3 whitespace-pre-wrap leading-7 text-rose-50/78">
                {comment.content}
              </p>
            </article>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={user ? "댓글을 입력해주세요." : "로그인하면 댓글을 남길 수 있습니다."}
          className="min-h-28 w-full rounded-lg border border-rose-200/15 bg-black/25 px-4 py-3 text-base leading-7 text-white outline-none transition placeholder:text-rose-100/35 focus:border-rose-300/45"
        />
        {message ? (
          <p className="rounded-lg border border-rose-200/20 bg-rose-950/35 px-4 py-3 text-sm text-rose-50">
            {message}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_28px_rgba(251,113,133,0.35)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {saving ? "저장 중" : "댓글 남기기"}
        </button>
      </form>
    </section>
  );
}
