"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { createPost, updatePost, type DbPost } from "@/lib/posts-crud";
import { useAuth } from "@/lib/auth-context";

type PostFormProps = {
  mode: "create" | "edit";
  post?: DbPost;
};

export default function PostForm({ mode, post }: PostFormProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const nextTitle = title.trim();
    const nextContent = content.trim();

    if (!nextTitle) {
      setMessage("제목을 입력해주세요.");
      return;
    }

    if (!nextContent) {
      setMessage("내용을 입력해주세요.");
      return;
    }

    if (!user) {
      setMessage("로그인한 회원만 글을 저장할 수 있습니다.");
      return;
    }

    setSaving(true);
    const result =
      mode === "create"
        ? await createPost({ title: nextTitle, content: nextContent }, user.id, user.accessToken)
        : await updatePost(post!.id, { title: nextTitle, content: nextContent }, user.accessToken);

    setSaving(false);

    if (result.error) {
      setMessage("글 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const savedPost = Array.isArray(result.data) ? result.data[0] : null;
    router.push(savedPost ? `/posts/${savedPost.id}` : "/posts");
    router.refresh();
  }

  const disabled = saving || loading;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="title" className="mono-font text-xs font-semibold tracking-wider text-neutral-300">
          제목
        </label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full rounded-lg border border-red-500/30 bg-black/60 px-4 py-3 text-base text-white outline-none transition placeholder:text-neutral-700 focus:border-[#ff1744] focus:ring-2 focus:ring-[#ff1744]/40"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="mono-font text-xs font-semibold tracking-wider text-neutral-300">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="오늘 남기고 싶은 기록을 적어보세요"
          className="min-h-[300px] w-full rounded-lg border border-red-500/30 bg-black/60 px-4 py-3 text-base leading-7 text-white outline-none transition placeholder:text-neutral-700 focus:border-[#ff1744] focus:ring-2 focus:ring-[#ff1744]/40"
          required
        />
      </div>

      {message ? (
        <p className="rounded-lg border border-red-300/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={disabled}
          className="neon-gradient-button mono-font inline-flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          {saving ? "저장 중" : mode === "create" ? "저장하기" : "수정하기"}
        </button>
      </div>
    </form>
  );
}
