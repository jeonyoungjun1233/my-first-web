"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function ProfileActions() {
  const router = useRouter();
  const { signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-black/25 px-5 py-3 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:border-rose-200/42 hover:text-white"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      로그아웃
    </button>
  );
}
