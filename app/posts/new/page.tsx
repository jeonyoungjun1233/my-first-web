import Link from "next/link";
import { redirect } from "next/navigation";
import PostForm from "@/components/PostForm";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?next=/posts/new");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="border-b border-red-500/30 pb-6">
        <p className="mono-font text-xs font-semibold tracking-[0.35em] text-[#ffccd5]">Writing</p>
        <h1 className="mono-font glow-text mt-4 text-3xl font-black tracking-widest text-[#ff1744] md:text-5xl">
          새 글 쓰기
        </h1>
        <p className="mt-4 text-sm leading-8 text-neutral-300">
          오늘 배운 내용이나 프로젝트 기록을 남겨보세요.
        </p>
      </section>

      <section className="neon-panel rounded-xl p-6 md:p-8">
        <PostForm mode="create" />
      </section>

      <Link
        href="/posts"
        className="mono-font inline-flex rounded-lg border border-red-500/35 bg-[#180006]/60 px-5 py-3 text-xs font-semibold tracking-wider text-[#ffccd5] transition hover:-translate-y-0.5 hover:border-red-400 hover:bg-red-500/10"
      >
        목록으로 돌아가기
      </Link>
    </div>
  );
}
