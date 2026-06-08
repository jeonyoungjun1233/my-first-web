import { createClient } from "@/lib/supabase/client";
import { getFriendlyErrorMessage } from "@/lib/error-message";
import { posts as staticPosts } from "@/lib/posts";

export type DbPost = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  media_url?: string | null;
  media_type?: "image" | "video" | null;
};

export type PostInput = {
  title: string;
  content: string;
  media_url?: string | null;
  media_type?: "image" | "video" | null;
};

type QueryError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
};

type PostResult<T> = {
  data: T | null;
  error: QueryError | null;
};

const POST_COLUMNS = "id,user_id,title,content,created_at,media_url,media_type";
const POST_COLUMNS_FALLBACK = "id,user_id,title,content,created_at";
const DEMO_AUTHOR_ID = "junyj7";

const demoPosts: DbPost[] = [
  {
    id: "demo-created",
    user_id: DEMO_AUTHOR_ID,
    title: "오늘의 프로젝트 기록",
    content:
      "블로그 화면을 정리하며 읽기 쉬운 문구와 여백을 다시 다듬었습니다. 작은 문장 하나도 사이트의 분위기를 바꾼다는 점을 배웠습니다.",
    created_at: "2026-05-20T04:00:00.000Z",
    media_url: null,
    media_type: null,
  },
  {
    id: "demo-writing",
    user_id: DEMO_AUTHOR_ID,
    title: "글 목록을 다듬으며 배운 것",
    content:
      "게시글 목록, 상세 화면, 글 작성 화면이 자연스럽게 이어지도록 구성했습니다. 실제 개인 블로그처럼 보이도록 카테고리와 버튼 이름도 다시 고쳤습니다.",
    created_at: "2026-05-20T03:00:00.000Z",
    media_url: null,
    media_type: null,
  },
];

const staticDbPosts: DbPost[] = staticPosts.map((post) => ({
  id: String(post.id),
  user_id: DEMO_AUTHOR_ID,
  title: post.title,
  content: post.sections
    .flatMap((section) => [section.title, ...section.body])
    .join("\n\n"),
  created_at: `${post.date}T00:00:00.000Z`,
  media_url: null,
  media_type: null,
}));

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function friendlyError(error: QueryError | null): QueryError | null {
  return error ? { ...error, message: getFriendlyErrorMessage(error.message) } : null;
}

function isMissingMediaColumn(error: QueryError | null) {
  return Boolean(
    error &&
      (error.code === "42703" ||
        error.message.includes("media_url") ||
        error.message.includes("media_type")),
  );
}

function withEmptyMedia<T extends DbPost | DbPost[] | null>(value: T): T {
  if (!value) return value;

  if (Array.isArray(value)) {
    return value.map((post) => ({
      ...post,
      media_url: post.media_url ?? null,
      media_type: post.media_type ?? null,
    })) as T;
  }

  return {
    ...value,
    media_url: value.media_url ?? null,
    media_type: value.media_type ?? null,
  };
}

export async function getPosts(): Promise<PostResult<DbPost[]>> {
  if (!hasSupabaseEnv()) {
    return { data: [...demoPosts, ...staticDbPosts], error: null };
  }

  const supabase = createClient();
  const result = await supabase.from<DbPost[]>("posts").select(POST_COLUMNS).order("created_at", {
    ascending: false,
  });

  if (isMissingMediaColumn(result.error)) {
    const fallback = await supabase
      .from<DbPost[]>("posts")
      .select(POST_COLUMNS_FALLBACK)
      .order("created_at", { ascending: false });
    return { data: withEmptyMedia(fallback.data), error: friendlyError(fallback.error) };
  }

  return { ...result, error: friendlyError(result.error) };
}

export async function getPost(id: string): Promise<PostResult<DbPost>> {
  if (!hasSupabaseEnv()) {
    return {
      data: [...demoPosts, ...staticDbPosts].find((post) => post.id === id) ?? null,
      error: null,
    };
  }

  const supabase = createClient();
  const result = await supabase.from<DbPost>("posts").select(POST_COLUMNS).eq("id", id).single();

  if (isMissingMediaColumn(result.error)) {
    const fallback = await supabase
      .from<DbPost>("posts")
      .select(POST_COLUMNS_FALLBACK)
      .eq("id", id)
      .single();
    return { data: withEmptyMedia(fallback.data), error: friendlyError(fallback.error) };
  }

  return { ...result, error: friendlyError(result.error) };
}

export async function createPost(
  input: PostInput,
  userId: string,
  accessToken?: string | null,
): Promise<PostResult<DbPost>> {
  if (!hasSupabaseEnv()) {
    return {
      data: {
        id: `local-${Date.now()}`,
        user_id: userId,
        title: input.title,
        content: input.content,
        created_at: new Date().toISOString(),
        media_url: input.media_url ?? null,
        media_type: input.media_type ?? null,
      },
      error: null,
    };
  }

  const supabase = createClient(accessToken);
  const result = await supabase
    .from<DbPost>("posts")
    .insert({
      title: input.title,
      content: input.content,
      user_id: userId,
      media_url: input.media_url ?? null,
      media_type: input.media_type ?? null,
    })
    .select(POST_COLUMNS)
    .single();

  if (isMissingMediaColumn(result.error)) {
    const fallback = await supabase
      .from<DbPost>("posts")
      .insert({
        title: input.title,
        content: input.content,
        user_id: userId,
      })
      .select(POST_COLUMNS_FALLBACK)
      .single();
    return { data: withEmptyMedia(fallback.data), error: friendlyError(fallback.error) };
  }

  return { ...result, error: friendlyError(result.error) };
}

export async function updatePost(
  id: string,
  input: PostInput,
  accessToken?: string | null,
) {
  if (!hasSupabaseEnv()) {
    return {
      data: [
        {
          id,
          user_id: DEMO_AUTHOR_ID,
          title: input.title,
          content: input.content,
          created_at: new Date().toISOString(),
          media_url: input.media_url ?? null,
          media_type: input.media_type ?? null,
        },
      ],
      error: null,
    };
  }

  const supabase = createClient(accessToken);
  const result = await supabase
    .from<DbPost[]>("posts")
    .update({
      title: input.title,
      content: input.content,
      media_url: input.media_url ?? null,
      media_type: input.media_type ?? null,
    })
    .eq("id", id)
    .select(POST_COLUMNS);

  if (isMissingMediaColumn(result.error)) {
    const fallback = await supabase
      .from<DbPost[]>("posts")
      .update({ title: input.title, content: input.content })
      .eq("id", id)
      .select(POST_COLUMNS_FALLBACK);
    return { data: withEmptyMedia(fallback.data), error: friendlyError(fallback.error) };
  }

  return { ...result, error: friendlyError(result.error) };
}

export async function deletePost(id: string, accessToken?: string | null): Promise<PostResult<null>> {
  if (!hasSupabaseEnv()) {
    return { data: null, error: null };
  }

  const supabase = createClient(accessToken);
  const result = await supabase.from<null>("posts").delete().eq("id", id);
  return { ...result, error: friendlyError(result.error) };
}

export function formatPostDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
