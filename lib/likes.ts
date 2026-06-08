import { createClient } from "@/lib/supabase/client";
import { getFriendlyErrorMessage } from "@/lib/error-message";

export type BlogLike = {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
};

type QueryError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
};

type LikeResult<T> = {
  data: T | null;
  error: QueryError | null;
};

const LIKE_COLUMNS = "id,post_id,user_id,created_at";

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function friendlyError(error: QueryError | null): QueryError | null {
  return error ? { ...error, message: getFriendlyErrorMessage(error.message) } : null;
}

export async function getLikes(postId: string): Promise<LikeResult<BlogLike[]>> {
  if (!hasSupabaseEnv()) {
    return { data: [], error: null };
  }

  const supabase = createClient();
  const result = await supabase
    .from<BlogLike[]>("likes")
    .select(LIKE_COLUMNS)
    .eq("post_id", postId);

  return { ...result, error: friendlyError(result.error) };
}

export async function addLike(
  postId: string,
  userId: string,
  accessToken?: string | null,
): Promise<LikeResult<BlogLike[]>> {
  if (!hasSupabaseEnv()) {
    return {
      data: [
        {
          id: `local-like-${Date.now()}`,
          post_id: postId,
          user_id: userId,
          created_at: new Date().toISOString(),
        },
      ],
      error: null,
    };
  }

  const supabase = createClient(accessToken);
  const result = await supabase
    .from<BlogLike[]>("likes")
    .insert({ post_id: postId, user_id: userId })
    .select(LIKE_COLUMNS);

  return { ...result, error: friendlyError(result.error) };
}

export async function removeLike(
  postId: string,
  userId: string,
  accessToken?: string | null,
): Promise<LikeResult<null>> {
  if (!hasSupabaseEnv()) {
    return { data: null, error: null };
  }

  const supabase = createClient(accessToken);
  const result = await supabase
    .from<null>("likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  return { ...result, error: friendlyError(result.error) };
}
