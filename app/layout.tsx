import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "RED CHI BLOG",
    template: "%s | RED CHI BLOG",
  },
  description: "전영준의 Chapter 5 라우팅 과제를 붉은 네온 분위기의 블로그로 정리한 프로젝트",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const links = [
    { href: "/", label: "홈" },
    { href: "/posts", label: "블로그" },
    { href: "/posts/new", label: "새 글 쓰기" },
  ];

  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className="overflow-x-hidden bg-transparent text-white antialiased">
        <div className="site-shell flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 border-b border-rose-300/10 bg-[#090207]/72 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.42em] text-rose-200/65">
                  Red Chi Signal
                </p>
                <h1 className="display-font glow-text mt-2 text-2xl font-semibold text-white">
                  전영준의 네온 블로그
                </h1>
              </div>

              <nav className="flex flex-wrap items-center gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="neon-pill rounded-full px-4 py-2 text-sm font-semibold text-rose-50 transition duration-300 hover:-translate-y-0.5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="signal-bar h-px w-full" />
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 md:py-10">
            {children}
          </main>

          <footer className="border-t border-rose-300/10 bg-[#080205]/70">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-rose-100/70 md:flex-row md:items-center md:justify-between">
              <p>© 2026 RED CHI BLOG · 전영준 · 공공인재빅데이터융합학</p>
              <p className="mono-font text-xs text-rose-200/60">
                my-first-nbilnuuyh-junyj9900-6038s-projects.vercel.app
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
