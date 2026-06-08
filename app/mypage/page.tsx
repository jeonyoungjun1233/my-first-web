import Link from "next/link";
import { redirect } from "next/navigation";
import { MailCheck, PenLine, ShieldCheck } from "lucide-react";
import { getSessionUser } from "@/lib/session";

const memberFeatures = [
  "새 글을 작성할 수 있습니다.",
  "내가 쓴 글을 수정할 수 있습니다.",
  "필요 없는 글을 삭제할 수 있습니다.",
  "로그아웃 후에는 글 관리 화면이 잠깁니다.",
];

export default async function MyPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?next=/mypage");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section className="neon-panel rounded-[34px] p-6 md:p-8">
        <p className="text-xs font-semibold text-rose-200/70">My Page</p>
        <h2 className="display-font glow-text mt-3 text-3xl font-semibold text-white md:text-5xl">
          내 블로그 관리
        </h2>
        <p className="mt-4 max-w-2xl leading-8 text-rose-50/74">
          로그인한 회원만 볼 수 있는 공간입니다. 새 글을 쓰고 내 기록을 관리할 수 있습니다.
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
        </div>
      </section>

      <aside className="neon-panel rounded-[28px] p-5">
        <h3 className="display-font text-2xl font-semibold text-white">회원 전용 기능</h3>
        <ul className="mt-4 space-y-3">
          {memberFeatures.map((feature) => (
            <li
              key={feature}
              className="neon-outline rounded-2xl px-3 py-3 text-sm text-rose-50/88"
            >
              {feature}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
