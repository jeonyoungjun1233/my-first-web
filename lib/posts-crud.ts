import { createClient } from "@/lib/supabase/client";

export type DbPost = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
};

export type PostInput = {
  title: string;
  content: string;
};

const POST_COLUMNS = "id,user_id,title,content,created_at";
const DEMO_AUTHOR_ID = "junyj7";

const demoPosts: DbPost[] = [
  {
    id: "demo-created",
    user_id: DEMO_AUTHOR_ID,
    title: "오늘의 프로젝트 기록",
    content:
      "블로그 화면을 정리하며 사용자가 보기 쉬운 문구와 여백을 다시 다듬었습니다. 작은 문장 하나도 사이트의 분위기를 바꾼다는 점을 배웠습니다.",
    created_at: "2026-05-20T04:00:00.000Z",
  },
  {
    id: "demo-writing",
    user_id: DEMO_AUTHOR_ID,
    title: "글 목록을 다듬으며 배운 것",
    content:
      "게시글 목록, 상세 화면, 글 작성 화면이 자연스럽게 이어지도록 문구를 정리했습니다. 실제 개인 블로그처럼 보이도록 카테고리와 버튼 이름도 다시 고쳤습니다.",
    created_at: "2026-05-20T03:00:00.000Z",
  },
];

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getPosts() {
  if (!hasSupabaseEnv()) {
    return { data: demoPosts, error: null };
  }

  const supabase = createClient();
  return supabase.from<DbPost[]>("posts").select(POST_COLUMNS).order("created_at", {
    ascending: false,
  });
}

export async function getPost(id: string) {
  if (!hasSupabaseEnv()) {
    return { data: demoPosts.find((post) => post.id === id) ?? null, error: null };
  }

  const supabase = createClient();
  return supabase.from<DbPost>("posts").select(POST_COLUMNS).eq("id", id).single();
}

export async function createPost(input: PostInput, userId: string) {
  if (!hasSupabaseEnv()) {
    return {
      data: [
        {
          id: "demo-created",
          user_id: userId,
          title: input.title,
          content: input.content,
          created_at: new Date().toISOString(),
        },
      ],
      error: null,
    };
  }

  const supabase = createClient();
  return supabase
    .from<DbPost[]>("posts")
    .insert({ title: input.title, content: input.content, user_id: userId })
    .select(POST_COLUMNS);
}

export async function updatePost(id: string, input: PostInput) {
  if (!hasSupabaseEnv()) {
    return {
      data: [
        {
          id,
          user_id: DEMO_AUTHOR_ID,
          title: input.title,
          content: input.content,
          created_at: new Date().toISOString(),
        },
      ],
      error: null,
    };
  }

  const supabase = createClient();
  return supabase
    .from<DbPost[]>("posts")
    .update({ title: input.title, content: input.content })
    .eq("id", id)
    .select(POST_COLUMNS);
}

export async function deletePost(id: string) {
  if (!hasSupabaseEnv()) {
    return { data: null, error: null };
  }

  const supabase = createClient();
  return supabase.from<null>("posts").delete().eq("id", id);
}

export function formatPostDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
