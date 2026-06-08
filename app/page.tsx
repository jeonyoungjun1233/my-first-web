import Link from "next/link";
import { posts, profile } from "../lib/posts";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M21.1 7.2a2.96 2.96 0 0 0-2.08-2.08C17.22 4.6 12 4.6 12 4.6s-5.22 0-7.02.52A2.96 2.96 0 0 0 2.9 7.2C2.38 9 2.38 12 2.38 12s0 3 .52 4.8a2.96 2.96 0 0 0 2.08 2.08c1.8.52 7.02.52 7.02.52s5.22 0 7.02-.52a2.96 2.96 0 0 0 2.08-2.08c.52-1.8.52-4.8.52-4.8s0-3-.52-4.8ZM10.2 15.7V8.3l6.15 3.7-6.15 3.7Z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-6 text-center lg:col-span-5 lg:text-left">
            <p className="mono-font inline-block rounded border border-[#ff2d75]/40 bg-[#ff1744]/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-[#ffccd5]">
              {profile.tagline}
            </p>
            <div>
              <h2 className="glow-text text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                전영준의 <span className="text-[#ff1744]">네온</span>
                <br />
                블로그
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-8 text-neutral-300 md:text-base lg:mx-0">
                AI를 활용해 더 좋은 개발자가 되기 위한 기록을 남깁니다.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
              <Link
                href="/posts"
                className="neon-gradient-button mono-font rounded-lg px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                블로그 글 보러가기
              </Link>
              <Link
                href="/posts/new"
                className="mono-font rounded-lg border border-red-500/35 bg-[#180006]/60 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[#ffccd5] transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400 hover:bg-red-500/10"
              >
                새 글 쓰기
              </Link>
              <a
                href="https://www.instagram.com/deading.ai777/?hl=ko"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="group flex items-center justify-center gap-3 rounded-lg border border-white/15 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 px-5 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(236,72,153,0.38)] transition hover:-translate-y-0.5 hover:shadow-[0_0_38px_rgba(244,114,182,0.45)]"
              >
                <InstagramIcon className="h-5 w-5" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.youtube.com/@%EC%A0%84%EC%98%81%EC%A4%80-c1h"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="group flex items-center justify-center gap-3 rounded-lg bg-red-500 px-5 py-4 text-sm font-bold text-white shadow-[0_0_28px_rgba(239,68,68,0.32)] transition hover:-translate-y-0.5"
              >
                <YouTubeIcon className="h-5 w-5" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <aside className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            <div className="neon-panel neon-card-hover relative flex h-64 flex-col justify-between overflow-hidden rounded-xl p-6">
              <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#ff00cc] to-[#ff1744]" />
              <div>
              <div className="flex items-center gap-3">
                <div className="mono-font flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ff1744] bg-red-950/30 text-xl font-black text-[#ff1744] shadow-[0_0_15px_rgba(255,23,68,0.4)]">
                  J
                </div>
                <div>
              <p className="mono-font text-[10px] uppercase tracking-[0.32em] text-rose-200/60">Profile</p>
              <h3 className="text-sm font-bold tracking-wide text-white">
                {profile.name}
              </h3>
                </div>
              </div>
              <p className="mt-2 text-sm leading-7 text-rose-100/70">
                {profile.department}
              </p>
              <p className="mt-4 text-sm leading-7 text-rose-50/78">
                {profile.introduction}
              </p>
              </div>
            </div>

            <div className="neon-panel neon-card-hover relative h-64 overflow-hidden rounded-xl p-6">
              <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-[#ff1744] to-[#ff8a00]" />
              <p className="mono-font text-xs text-neutral-400">블로그 기록</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded border border-red-500/20 bg-red-950/20 p-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                <p className="mono-font text-[10px] text-neutral-400">글 수</p>
                <p className="mono-font mt-2 text-2xl font-black text-white glow-text">
                  {posts.length}
                </p>
              </div>
              <div className="rounded border border-red-500/20 bg-red-950/20 p-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                <p className="mono-font text-[10px] text-neutral-400">기록</p>
                <p className="mono-font mt-2 text-2xl font-black text-[#ff8a00]">
                  {posts.length}
                </p>
              </div>
              <div className="col-span-2 rounded border border-red-500/20 bg-red-950/20 p-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                <p className="mono-font text-[10px] text-neutral-400">프로젝트</p>
                <p className="mono-font mt-2 text-2xl font-black text-white">4</p>
              </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="neon-panel neon-card-hover group relative flex min-h-72 flex-col justify-between overflow-hidden rounded-xl p-6"
          >
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff1744] to-transparent" />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full border border-[#ff2d75]/40 bg-[#ff1744]/20 px-2.5 py-0.5 text-xs font-bold text-[#ffccd5]">
                {post.category}
              </span>
              <span className="mono-font text-xs font-semibold text-neutral-400">{post.date}</span>
            </div>

            <h3 className="mt-5 text-xl font-extrabold leading-snug text-white transition group-hover:text-[#ff1744] md:text-2xl">
              {post.title}
            </h3>
            <p className="mt-4 leading-7 text-neutral-300">{post.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-red-500/10 pt-4 text-sm text-rose-100/58">
              <span>{post.readTime}</span>
              <span>·</span>
              <span>읽기</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
