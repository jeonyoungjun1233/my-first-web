import type { DbPost } from "@/lib/posts-crud";

export const LOCAL_POSTS_KEY = "blog-local-posts";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function readLocalPosts(): DbPost[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const value = window.localStorage.getItem(LOCAL_POSTS_KEY);
    return value ? (JSON.parse(value) as DbPost[]) : [];
  } catch {
    return [];
  }
}

export function saveLocalPost(post: DbPost) {
  if (!canUseStorage()) {
    return false;
  }

  try {
    const posts = readLocalPosts().filter((item) => item.id !== post.id);
    window.localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify([post, ...posts]));
    return true;
  } catch {
    // Large video previews can exceed local storage. The post can still be viewed
    // from Supabase when the remote save succeeds.
    return false;
  }
}

export function findLocalPost(id: string) {
  return readLocalPosts().find((post) => post.id === id) ?? null;
}
