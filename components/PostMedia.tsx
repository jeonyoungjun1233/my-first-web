type PostMediaProps = {
  url?: string | null;
  type?: "image" | "video" | null;
  title?: string;
  variant?: "card" | "detail";
};

export default function PostMedia({ url, type, title, variant = "detail" }: PostMediaProps) {
  if (!url || !type) {
    return null;
  }

  if (type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={title ? `${title} 대표 이미지` : "게시글 대표 이미지"}
        className={
          variant === "card"
            ? "h-40 w-full rounded-lg object-cover"
            : "max-h-[520px] w-full rounded-xl object-cover"
        }
      />
    );
  }

  return (
    <video
      src={url}
      controls
      className={
        variant === "card"
          ? "h-40 w-full rounded-lg object-cover"
          : "max-h-[560px] w-full rounded-xl"
      }
    />
  );
}
