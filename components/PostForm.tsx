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

    if (!nextTitle || !nextContent) {
      setMessage("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (!user) {
      setMessage("로그인한 사용자만 게시글을 저장할 수 있습니다.");
      return;
    }

    setSaving(true);
    const result =
      mode === "create"
        ? await createPost({ title: nextTitle, content: nextContent }, user.id)
        : await updatePost(post!.id, { title: nextTitle, content: nextContent });

    setSaving(false);

    if (result.error) {
      setMessage(result.error.message);
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
        <label htmlFor="title" className="text-sm font-semibold text-rose-100/80">
          제목
        </label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="게시글 제목을 입력하세요"
          className="w-full rounded-lg border border-rose-200/15 bg-black/25 px-4 py-3 text-base text-white outline-none transition placeholder:text-rose-100/35 focus:border-rose-300/45"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-semibold text-rose-100/80">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용을 입력하세요"
          className="min-h-[260px] w-full rounded-lg border border-rose-200/15 bg-black/25 px-4 py-3 text-base leading-7 text-white outline-none transition placeholder:text-rose-100/35 focus:border-rose-300/45"
          required
        />
      </div>

      {message ? (
        <p className="rounded-lg border border-rose-200/20 bg-rose-950/35 px-4 py-3 text-sm text-rose-50">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_28px_rgba(251,113,133,0.35)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          {saving ? "저장 중" : mode === "create" ? "게시글 작성" : "수정 완료"}
        </button>
      </div>
    </form>
  );
}
