import Link from "next/link";
import { FileText, LockKeyhole, PenLine, ShieldCheck } from "lucide-react";

const workflow = [
  {
    title: "로그인",
    body: "이메일과 비밀번호로 블로그 관리 화면에 들어갈 수 있습니다.",
    icon: LockKeyhole,
  },
  {
    title: "내 공간",
    body: "로그인한 회원은 마이페이지에서 자신의 계정 정보를 확인할 수 있습니다.",
    icon: ShieldCheck,
  },
  {
    title: "글 작성",
    body: "오늘 배운 내용이나 프로젝트 진행 과정을 새 글로 남길 수 있습니다.",
    icon: PenLine,
  },
  {
    title: "글 관리",
    body: "작성한 글은 상세 화면에서 수정하거나 삭제할 수 있습니다.",
    icon: FileText,
  },
];

export default function Chapter9Page() {
  return (
    <div className="space-y-8">
      <section className="neon-panel neon-grid rounded-[34px] px-6 py-7 md:px-8 md:py-9">
        <p className="text-xs font-semibold text-rose-200/70">Member Guide</p>
        <h2 className="display-font glow-text mt-3 max-w-4xl text-3xl font-semibold text-white md:text-5xl">
          블로그 회원 기능 안내
        </h2>
        <p className="mt-5 max-w-3xl leading-8 text-rose-50/76">
          로그인하면 새 글을 작성하고, 내가 남긴 기록을 수정하거나 삭제할 수 있습니다.
          읽는 사람에게는 깔끔한 글 화면을, 작성자에게는 필요한 관리 기능을 제공합니다.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-full bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_28px_rgba(251,113,133,0.42)] transition hover:-translate-y-0.5"
          >
            로그인
          </Link>
          <Link
            href="/posts/new"
            className="neon-pill rounded-full px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
          >
            새 글 쓰기
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {workflow.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className="neon-panel rounded-[28px] p-5">
              <Icon className="h-6 w-6 text-rose-200" aria-hidden="true" />
              <h3 className="display-font mt-4 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-rose-50/74">{item.body}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
