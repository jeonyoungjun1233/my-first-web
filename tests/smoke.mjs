import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "app/posts/new/page.tsx",
  "app/posts/page.tsx",
  "app/posts/[id]/page.tsx",
  "app/login/page.tsx",
  "app/signup/page.tsx",
  "app/mypage/page.tsx",
  "app/not-found.tsx",
  "middleware.ts",
  "lib/auth.ts",
  "lib/supabase/client.ts",
  "supabase/migrations/202605230001_add_posts_rls.sql",
  "supabase/migrations/202606080001_add_comments_likes.sql",
];

const forbiddenScreenText = [
  "Ch9",
  "Ch10",
  "Ch11",
  "Ch12",
  "CRUD",
  "Supabase Memo",
  "Checklist",
  "최종 검증 보드",
  "Protected",
  "App Router",
  "params 체크포인트",
  "middleware 테스트",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const screenFiles = [
  "app/page.tsx",
  "app/layout.tsx",
  "app/login/page.tsx",
  "app/signup/page.tsx",
  "app/posts/page.tsx",
  "app/posts/new/page.tsx",
  "app/posts/[id]/page.tsx",
  "app/posts/[id]/edit/page.tsx",
  "app/mypage/page.tsx",
  "app/not-found.tsx",
  "components/PostForm.tsx",
  "components/PostsClient.tsx",
  "components/CommentSection.tsx",
  "components/LikeButton.tsx",
];

for (const file of screenFiles) {
  const content = readFileSync(join(root, file), "utf8");
  for (const word of forbiddenScreenText) {
    if (content.includes(word)) {
      throw new Error(`Forbidden screen text found in ${file}: ${word}`);
    }
  }
}

console.log("Smoke checks passed.");
