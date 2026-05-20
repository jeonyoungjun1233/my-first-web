import Link from "next/link";
import { notFound } from "next/navigation";
import PostForm from "@/components/PostForm";
import { getPost } from "@/lib/posts-crud";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const { data: post, error } = await getPost(id);

  if (!post && error?.code === "PGRST116") {
    notFound();
  }

  if (error) {
    return (
      <section className="neon-panel mx-auto max-w-3xl rounded-[34px] px-6 py-10 md:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-rose-200/60">Update Error</p>
        <h1 className="display-font glow-text mt-4 text-3xl font-semibold text-white md:text-5xl">
          수정할 게시글을 불러오지 못했습니다
        </h1>
        <p className="mt-4 leading-8 text-rose-50/72">{error.message}</p>
      </section>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="neon-panel rounded-[34px] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.4em] text-rose-200/60">Update</p>
        <h1 className="display-font glow-text mt-4 text-3xl font-semibold text-white md:text-5xl">
          게시글 수정
        </h1>
        <p className="mt-4 leading-8 text-rose-50/74">
          update는 반드시 id 조건을 붙여 한 게시글만 수정합니다.
        </p>
      </section>

      <section className="neon-panel rounded-[30px] p-6 md:p-8">
        <PostForm mode="edit" post={post} />
      </section>

      <Link
        href={`/posts/${post.id}`}
        className="neon-pill inline-flex rounded-lg px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
      >
        상세로 돌아가기
      </Link>
    </div>
  );
}
