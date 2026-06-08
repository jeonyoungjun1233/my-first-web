"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Save, X } from "lucide-react";
import { saveLocalPost } from "@/lib/local-posts";
import { uploadPostMedia, type UploadedMedia } from "@/lib/media-upload";
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
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(post?.media_url ?? null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(post?.media_type ?? null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (mediaPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(mediaPreview);
      }
    };
  }, [mediaPreview]);

  function handleMediaChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setMessage(null);

    if (!file) {
      return;
    }

    const nextMediaType = file.type.startsWith("image/")
      ? "image"
      : file.type.startsWith("video/")
        ? "video"
        : null;

    if (!nextMediaType) {
      setMessage("이미지 또는 동영상 파일만 업로드할 수 있습니다.");
      event.target.value = "";
      return;
    }

    if (mediaPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(mediaPreview);
    }

    setMediaFile(file);
    setMediaType(nextMediaType);
    setMediaPreview(URL.createObjectURL(file));
  }

  function clearMedia() {
    if (mediaPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(mediaPreview);
    }

    setMediaFile(null);
    setMediaPreview(null);
    setMediaType(null);
  }

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
    let uploadedMedia: UploadedMedia | null =
      mediaPreview && !mediaPreview.startsWith("blob:") && mediaType
        ? { media_url: mediaPreview, media_type: mediaType }
        : null;

    if (mediaFile) {
      try {
        uploadedMedia = await uploadPostMedia(mediaFile, user.id, user.accessToken);
      } catch (error) {
        setMessage(
          error instanceof Error
            ? `${error.message} 파일 없이 글을 저장합니다.`
            : "파일 업로드 중 문제가 발생했습니다. 파일 없이 글을 저장합니다.",
        );
        uploadedMedia = null;
      }
    }

    const input = {
      title: nextTitle,
      content: nextContent,
      media_url: uploadedMedia?.media_url ?? null,
      media_type: uploadedMedia?.media_type ?? null,
    };
    const result =
      mode === "create"
        ? await createPost(input, user.id, user.accessToken)
        : await updatePost(post!.id, input, user.accessToken);

    setSaving(false);

    if (result.error) {
      setMessage("글 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const savedPost = Array.isArray(result.data) ? result.data[0] : result.data;
    if (savedPost?.id.startsWith("local-")) {
      const savedLocally = saveLocalPost(savedPost);
      router.push(savedLocally ? `/posts/${savedPost.id}` : "/posts");
      router.refresh();
      return;
    }

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

      <div className="space-y-2">
        <label htmlFor="media" className="mono-font text-xs font-semibold tracking-wider text-neutral-300">
          대표 이미지 또는 동영상
        </label>
        <label
          htmlFor="media"
          className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-red-500/35 bg-black/35 px-4 py-5 text-center text-sm text-neutral-300 transition hover:border-[#ff1744] hover:bg-red-500/10"
        >
          <ImagePlus className="size-5 shrink-0 text-[#ff8a00]" aria-hidden="true" />
          <span className="mt-2">이미지 또는 동영상 파일을 선택하세요</span>
          <span className="mt-1 text-xs text-neutral-500">파일이 없어도 글 작성은 가능합니다.</span>
        </label>
        <input
          id="media"
          name="media"
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaChange}
          className="sr-only"
        />
      </div>

      {mediaPreview && mediaType ? (
        <div className="neon-outline overflow-hidden rounded-xl p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-rose-50">미리보기</p>
            <button
              type="button"
              onClick={clearMedia}
              className="inline-flex items-center gap-2 rounded-lg border border-red-500/35 bg-black/35 px-3 py-2 text-xs font-semibold text-rose-50 transition hover:border-red-400"
            >
              <X className="size-4 shrink-0" aria-hidden="true" />
              제거
            </button>
          </div>
          {mediaType === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaPreview}
              alt="선택한 대표 이미지"
              className="max-h-[360px] w-full rounded-lg object-cover"
            />
          ) : (
            <video src={mediaPreview} controls className="max-h-[420px] w-full rounded-lg" />
          )}
        </div>
      ) : null}

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
