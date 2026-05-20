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
    title: "작성 성공 데모 게시글",
    content:
      "Supabase 환경 변수가 없는 로컬 검증 환경에서 작성 성공 화면과 작성자 전용 수정/삭제 버튼을 확인하기 위한 데모 데이터입니다.",
    created_at: "2026-05-20T04:00:00.000Z",
  },
  {
    id: "demo-ch10",
    user_id: DEMO_AUTHOR_ID,
    title: "Ch10 Supabase CRUD",
    content:
      "posts 테이블의 id, user_id, title, content, created_at 컬럼 흐름에 맞춰 목록, 상세, 작성, 수정, 삭제 화면을 연결했습니다.",
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
