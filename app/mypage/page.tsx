import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, MailCheck, PenLine, ShieldCheck } from "lucide-react";
import ProfileActions from "@/components/ProfileActions";
import { getSessionUser } from "@/lib/session";
import { formatPostDate, getPosts } from "@/lib/posts-crud";

export const dynamic = "force-dynamic";

export default async function MyPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?next=/mypage");
  }

  const { data: posts } = await getPosts();
  const myPosts = (posts ?? []).filter((post) => post.user_id === user.id);
  const recentPosts = myPosts.slice(0, 4);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section className="neon-panel rounded-[34px] p-6 md:p-8">
        <p className="text-xs font-semibold text-rose-200/70">Profile</p>
        <h2 className="display-font glow-text mt-3 text-3xl font-semibold text-white md:text-5xl">
          내 프로필
        </h2>
        <p className="mt-4 max-w-2xl leading-8 text-rose-50/74">
          내가 작성한 글과 계정 정보를 확인할 수 있습니다.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <div className="neon-outline rounded-2xl bg-black/20 p-5">
            <ShieldCheck className="h-6 w-6 text-rose-200" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-rose-200/70">이름</p>
            <p className="mt-2 text-xl font-semibold text-white">{user.name}</p>
          </div>
          <div className="neon-outline rounded-2xl bg-black/20 p-5">
            <MailCheck className="h-6 w-6 text-rose-200" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-rose-200/70">이메일</p>
            <p className="mt-2 break-all text-xl font-semibold text-white">{user.email}</p>
          </div>
          <div className="neon-outline rounded-2xl bg-black/20 p-5">
            <PenLine className="h-6 w-6 text-rose-200" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-rose-200/70">작성한 글 수</p>
            <p className="mt-2 text-xl font-semibold text-white">{myPosts.length}개</p>
          </div>
          <div className="neon-outline rounded-2xl bg-black/20 p-5">
            <CalendarDays className="h-6 w-6 text-rose-200" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-rose-200/70">가입일</p>
            <p className="mt-2 text-xl font-semibold text-white">계정 정보 확인 완료</p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/posts/new"
            className="inline-flex items-center gap-2 rounded-full bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_28px_rgba(251,113,133,0.42)] transition hover:-translate-y-0.5"
          >
            <PenLine className="h-4 w-4" aria-hidden="true" />
            새 글 쓰기
          </Link>
          <Link
            href="/posts"
            className="neon-pill rounded-full px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
          >
            게시글 목록 보기
          </Link>
          <ProfileActions />
        </div>
      </section>

      <aside className="neon-panel rounded-[28px] p-5">
        <h3 className="display-font text-2xl font-semibold text-white">최근 작성한 글</h3>
        <div className="mt-4 space-y-3">
          {recentPosts.length === 0 ? (
            <p className="neon-outline rounded-2xl px-3 py-3 text-sm text-rose-50/78">
              아직 작성한 글이 없습니다.
            </p>
          ) : (
            recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="neon-outline block rounded-2xl px-3 py-3 text-sm text-rose-50/88 transition hover:-translate-y-0.5 hover:border-rose-200/40"
              >
                <span className="block font-semibold text-white">{post.title}</span>
                <span className="mt-2 block text-xs text-rose-100/58">
                  {formatPostDate(post.created_at)}
                </span>
              </Link>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
