import { createClient } from "@/lib/supabase/client";
import { getFriendlyErrorMessage } from "@/lib/error-message";

export type BlogComment = {
  id: string;
  post_id: string;
  user_id: string;
  author_name: string;
  content: string;
  created_at: string;
};

type QueryError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
};

type CommentResult<T> = {
  data: T | null;
  error: QueryError | null;
};

const COMMENT_COLUMNS = "id,post_id,user_id,author_name,content,created_at";

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function friendlyError(error: QueryError | null): QueryError | null {
  return error ? { ...error, message: getFriendlyErrorMessage(error.message) } : null;
}

export async function getComments(postId: string): Promise<CommentResult<BlogComment[]>> {
  if (!hasSupabaseEnv()) {
    return { data: [], error: null };
  }

  const supabase = createClient();
  const result = await supabase
    .from<BlogComment[]>("comments")
    .select(COMMENT_COLUMNS)
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  return { ...result, error: friendlyError(result.error) };
}

export async function createComment(
  postId: string,
  userId: string,
  authorName: string,
  content: string,
  accessToken?: string | null,
): Promise<CommentResult<BlogComment[]>> {
  if (!hasSupabaseEnv()) {
    return {
      data: [
        {
          id: `local-comment-${Date.now()}`,
          post_id: postId,
          user_id: userId,
          author_name: authorName,
          content,
          created_at: new Date().toISOString(),
        },
      ],
      error: null,
    };
  }

  const supabase = createClient(accessToken);
  const result = await supabase
    .from<BlogComment[]>("comments")
    .insert({ post_id: postId, user_id: userId, author_name: authorName, content })
    .select(COMMENT_COLUMNS);

  return { ...result, error: friendlyError(result.error) };
}
