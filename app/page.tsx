import Link from "next/link";
import ChecklistPanel from "../components/checklist-panel";
import { finalChecklist, posts, profile } from "../lib/posts";

export default function HomePage() {
  const totalChecked = posts.reduce(
    (total, post) =>
      total +
      post.sections.reduce(
        (sectionTotal, section) =>
          sectionTotal + (section.checklist?.filter((item) => item.checked).length ?? 0),
        0,
      ),
    0,
  );

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="neon-panel neon-grid relative overflow-hidden rounded-[34px] px-6 py-7 md:px-8 md:py-9">
        <div className="float-slow absolute -left-10 top-10 h-28 w-28 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="orbit absolute right-8 top-8 h-24 w-24 rounded-full border border-rose-300/30" />
        <div className="orbit-delayed absolute bottom-6 right-24 h-16 w-16 rounded-full border border-red-200/20" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_340px] lg:items-start">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.45em] text-rose-200/70">
              Next.js 16 Routing Project
            </p>
            <div>
              <h2 className="display-font glow-text text-4xl font-semibold tracking-tight text-white md:text-6xl">
                {profile.siteName}
              </h2>
              <p className="mt-4 max-w-2xl rounded-2xl border border-rose-200/10 bg-black/20 px-4 py-4 text-base leading-8 text-rose-50/88 md:text-lg">
                <span className="font-semibold text-rose-200">1. 나의 최종목표 :</span> AI를 활용한
                최대 개발자로 전세계의 내 이름을 알리는것이다
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-rose-50/78 md:text-lg">
                {profile.tagline}. ch5A.md와 ch5B.md의 핵심 내용을 3개의 포스트로 나누고,
                문서에 있던 체크리스트를 하나씩 모두 완료된 상태로 정리했다.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/deading.ai777/?hl=ko"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#3f0413] shadow-[0_0_28px_rgba(255,255,255,0.22)] transition hover:-translate-y-0.5"
              >
                Instagram 바로가기
              </a>
              <a
                href="https://www.youtube.com/@%EC%A0%84%EC%98%81%EC%A4%80-c1h"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-red-500 px-5 py-3 text-sm font-bold text-white shadow-[0_0_28px_rgba(239,68,68,0.32)] transition hover:-translate-y-0.5"
              >
                YouTube 바로가기
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/posts"
                className="rounded-full bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_30px_rgba(251,113,133,0.4)] transition hover:-translate-y-0.5"
              >
                학습 포스트 보러 가기
              </Link>
              <Link
                href="/posts/new"
                className="neon-pill rounded-full px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
              >
                새 글 쓰기 테스트
              </Link>
            </div>
          </div>

          <aside className="grid gap-4">
            <div className="neon-outline rounded-[28px] bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.32em] text-rose-200/60">Profile</p>
              <h3 className="display-font mt-3 text-2xl font-semibold text-white">
                {profile.name}
              </h3>
              <p className="mt-2 text-sm leading-7 text-rose-100/70">
                {profile.department}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://www.instagram.com/deading.ai777/?hl=ko"
                  target="_blank"
                  rel="noreferrer"
                  className="neon-pill rounded-full px-3 py-2 text-xs font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@%EC%A0%84%EC%98%81%EC%A4%80-c1h"
                  target="_blank"
                  rel="noreferrer"
                  className="neon-pill rounded-full px-3 py-2 text-xs font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
                >
                  YouTube
                </a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="neon-outline rounded-2xl bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-rose-200/55">Posts</p>
                <p className="display-font mt-3 text-3xl font-semibold text-white">
                  {posts.length}
                </p>
              </div>
              <div className="neon-outline rounded-2xl bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-rose-200/55">
                  Checks
                </p>
                <p className="display-font mt-3 text-3xl font-semibold text-white">
                  {totalChecked}
                </p>
              </div>
              <div className="neon-outline rounded-2xl bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-rose-200/55">Version</p>
                <p className="display-font mt-3 text-3xl font-semibold text-white">16</p>
              </div>
            </div>
            <div className="rounded-[28px] border border-rose-300/12 bg-gradient-to-br from-rose-500/12 to-transparent p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-200/60">Deploy</p>
              <p className="mono-font mt-3 break-all text-sm text-rose-50/80">
                {profile.deploymentUrl}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="grid gap-5">
          {posts.map((post) => {
            const checkedCount = post.sections.reduce(
              (total, section) =>
                total + (section.checklist?.filter((item) => item.checked).length ?? 0),
              0,
            );

            return (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="neon-panel group rounded-[30px] p-6 transition duration-300 hover:-translate-y-1 hover:border-rose-300/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="neon-pill rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-rose-100">
                    {post.category}
                  </span>
                  <span className="mono-font text-xs text-rose-200/60">{post.route}</span>
                </div>

                <h3 className="display-font mt-5 text-2xl font-semibold text-white transition group-hover:text-rose-100 md:text-3xl">
                  {post.title}
                </h3>
                <p className="mt-4 leading-7 text-rose-50/74">{post.summary}</p>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-rose-100/58">
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{checkedCount}개 체크 완료</span>
                </div>
              </Link>
            );
          })}
        </div>

        <ChecklistPanel title="최종 검증 보드" items={finalChecklist} />
      </section>
    </div>
  );
}
