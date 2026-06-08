import Link from "next/link";
import { notFound } from "next/navigation";
import CommentSection from "@/components/CommentSection";
import LikeButton from "@/components/LikeButton";
import PostActions from "@/components/PostActions";
import { getComments } from "@/lib/comments";
import { getLikes } from "@/lib/likes";
import { formatPostDate, getPost } from "@/lib/posts-crud";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const { data: post, error } = await getPost(id);

  if (!post && error?.code === "PGRST116") {
    notFound();
  }

  if (error) {
    return (
      <section className="neon-panel mx-auto max-w-3xl rounded-[34px] px-6 py-10 md:px-8">
        <h1 className="display-font glow-text text-3xl font-semibold text-white md:text-5xl">
          게시글을 불러오지 못했습니다
        </h1>
        <p className="mt-4 leading-8 text-rose-50/72">{error.message}</p>
        <Link
          href="/posts"
          className="neon-pill mt-8 inline-flex rounded-lg px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
        >
          목록으로 돌아가기
        </Link>
      </section>
    );
  }

  if (!post) {
    notFound();
  }

  const [{ data: comments }, { data: likes }] = await Promise.all([
    getComments(post.id),
    getLikes(post.id),
  ]);

  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <section className="neon-panel rounded-[34px] px-6 py-7 md:px-8 md:py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-rose-200/70">개인 기록</p>
            <h1 className="display-font glow-text mt-4 text-3xl font-semibold text-white md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-rose-100/58">
              <span>{formatPostDate(post.created_at)}</span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <PostActions postId={post.id} authorId={post.user_id} />
            <LikeButton postId={post.id} initialLikes={likes ?? []} />
          </div>
        </div>
      </section>

      <section className="neon-panel rounded-[30px] p-6 md:p-8">
        <div className="whitespace-pre-wrap text-[1rem] leading-8 text-rose-50/78">
          {post.content}
        </div>
      </section>

      <CommentSection postId={post.id} initialComments={comments ?? []} />

      <Link
        href="/posts"
        className="neon-pill inline-flex rounded-lg px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
      >
        목록으로 돌아가기
      </Link>
    </article>
  );
}
