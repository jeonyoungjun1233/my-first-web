import Link from "next/link";
import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="neon-panel rounded-[34px] p-6 md:p-8">
        <p className="text-xs font-semibold text-rose-200/70">Writing</p>
        <h1 className="display-font glow-text mt-4 text-3xl font-semibold text-white md:text-5xl">
          새 글 쓰기
        </h1>
        <p className="mt-4 leading-8 text-rose-50/74">
          오늘 배운 내용이나 프로젝트 기록을 남겨보세요.
        </p>
      </section>

      <section className="neon-panel rounded-[30px] p-6 md:p-8">
        <PostForm mode="create" />
      </section>

      <Link
        href="/posts"
        className="neon-pill inline-flex rounded-lg px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
      >
        목록으로 돌아가기
      </Link>
    </div>
  );
}
