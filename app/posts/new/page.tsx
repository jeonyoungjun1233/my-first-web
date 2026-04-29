"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState, useTransition } from "react";

const conceptNotes = [
  {
    term: "onSubmit",
    meaning: "폼이 제출될 때 실행되는 이벤트 핸들러다.",
  },
  {
    term: "onClick",
    meaning: "버튼이나 요소를 클릭했을 때 동작을 연결하는 이벤트다.",
  },
  {
    term: "input",
    meaning: "한 줄 텍스트를 입력받는 폼 요소다.",
  },
  {
    term: "textarea",
    meaning: "여러 줄 텍스트를 입력받는 폼 요소다.",
  },
];

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });
  const [isPending, startTransition] = useTransition();

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target as HTMLInputElement;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }

    alert("저장되었습니다");
    startTransition(() => {
      router.push("/posts");
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section className="neon-panel rounded-[34px] p-6 md:p-8">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.38em] text-rose-200/60">
            Client Route Test
          </p>
          <h2 className="display-font glow-text mt-3 text-3xl font-semibold text-white md:text-5xl">
            새 글 쓰기
          </h2>
          <p className="mt-4 leading-8 text-rose-50/74">
            이 페이지는 <span className="mono-font">"use client"</span>와{" "}
            <span className="mono-font">useRouter</span>를 사용해 저장 후{" "}
            <span className="mono-font">/posts</span>로 이동하는 흐름을 테스트하기 위한 공간이다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-semibold text-rose-100/78">
              제목
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="예: await params가 왜 중요한가?"
              className="w-full rounded-2xl border border-rose-200/15 bg-black/25 px-4 py-4 text-base text-white outline-none transition placeholder:text-rose-100/35 focus:border-rose-300/45 focus:bg-black/35"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-semibold text-rose-100/78">
              내용
            </label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="오늘 실습에서 배운 흐름과 체크리스트를 자유롭게 정리해보세요."
              className="min-h-[220px] w-full rounded-2xl border border-rose-200/15 bg-black/25 px-4 py-4 text-base leading-7 text-white outline-none transition placeholder:text-rose-100/35 focus:border-rose-300/45 focus:bg-black/35"
              required
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-rose-400 px-5 py-3 text-sm font-bold text-[#2a040d] shadow-[0_0_28px_rgba(251,113,133,0.42)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isPending}
            >
              {isPending ? "이동 중..." : "저장하고 목록으로 이동"}
            </button>

            <Link
              href="/posts"
              className="neon-pill rounded-full px-5 py-3 text-sm font-semibold text-rose-50 transition hover:-translate-y-0.5 hover:text-white"
            >
              목록으로
            </Link>
          </div>
        </form>
      </section>

      <aside className="space-y-6">
        <section className="neon-panel rounded-[28px] p-5">
          <p className="text-xs uppercase tracking-[0.32em] text-rose-200/60">Live Preview</p>
          <div className="neon-outline mt-4 rounded-[24px] bg-black/25 p-4">
            <h3 className="display-font text-xl font-semibold text-white">
              {form.title || "제목을 입력하면 여기에 미리보기로 보입니다"}
            </h3>
            <p className="mt-3 text-sm leading-7 text-rose-50/72">
              {form.content ||
                "textarea에 입력한 내용이 이 카드에 반영됩니다. 제출하면 alert 후 /posts로 이동합니다."}
            </p>
          </div>
        </section>

        <section className="neon-panel rounded-[28px] p-5">
          <p className="text-xs uppercase tracking-[0.32em] text-rose-200/60">Hidden Notes</p>
          <div className="mt-4 space-y-3">
            {conceptNotes.map((note) => (
              <div key={note.term} className="neon-outline rounded-2xl px-4 py-4">
                <p className="mono-font text-sm font-semibold text-rose-100">{note.term}</p>
                <p className="mt-2 text-sm leading-7 text-rose-50/72">{note.meaning}</p>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
