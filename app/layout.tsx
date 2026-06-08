import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import AuthButtons from "@/components/auth-buttons";
import ThemeToggle from "@/components/ThemeToggle";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: {
    default: "전영준의 네온 블로그",
    template: "%s | 전영준의 네온 블로그",
  },
  description: "AI, 웹 개발, 대학 생활을 기록하는 전영준의 개인 블로그",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const links = [
    { href: "/", label: "홈" },
    { href: "/posts", label: "블로그 글" },
    { href: "/posts/new", label: "새 글 쓰기" },
    { href: "/mypage", label: "내 프로필" },
  ];

  return (
    <html lang="ko" className="font-sans">
      <body className="overflow-x-hidden bg-transparent text-white antialiased">
        <AuthProvider>
        <div className="site-shell flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 w-full border-b border-red-500/25 bg-[#120009]/70 shadow-[0_4px_30px_rgba(255,23,68,0.2)] backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 md:min-h-16 md:flex-row md:items-center md:justify-between">
              <Link href="/" className="group flex items-center gap-2">
                <span className="mono-font glow-text text-xl font-black tracking-widest text-[#ff1744] transition-colors group-hover:text-[#ff00cc] sm:text-2xl">
                  전영준의 네온 블로그
                </span>
                <span className="h-2 w-2 animate-ping rounded-full bg-[#ff8a00]" />
              </Link>

              <div className="flex flex-wrap items-center gap-2">
                <nav className="flex flex-wrap items-center gap-2 mono-font text-[11px] tracking-wider">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-transparent px-4 py-2 font-semibold text-neutral-300 transition-all hover:border-red-500/40 hover:bg-red-950/20 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <ThemeToggle />
                <AuthButtons />
              </div>
            </div>
            <div className="signal-bar h-px w-full" />
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:py-16">
            {children}
          </main>

          <footer className="border-t border-red-500/10 bg-[#120009]/40">
            <div className="mono-font mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-center text-[10px] text-neutral-500 md:flex-row md:items-center md:justify-between md:text-left">
              <p>© 2026 전영준의 네온 블로그 · 공공인재빅데이터융합학</p>
              <p className="text-[10px] text-neutral-500">
                my-first-lime.vercel.app
              </p>
            </div>
          </footer>
        </div>
        </AuthProvider>
      </body>
    </html>
  );
}
