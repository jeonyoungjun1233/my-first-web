# Ch11 RLS Assignment Submission

1. GitHub repository URL
   - `https://github.com/jeonyoungjun1233/my-first-web`
2. Vercel deployment URL
   - `https://my-first-web-red-chi.vercel.app`
3. Supabase migration file path
   - `supabase/migrations/202605230001_add_posts_rls.sql`
4. Supabase RLS/Policies screenshot
   - Add screenshot: `screenshots/ch11/01-posts-rls-policies.png`
5. User A own post update/delete success screenshot
   - Add screenshot: `screenshots/ch11/02-user-a-own-post-success.png`
6. User B update/delete failure screenshot for User A post
   - Add screenshot: `screenshots/ch11/03-user-b-rls-failure.png`
7. `npm run build` success result
   - `npm.cmd run build` passed on 2026-05-23.
   - Captured in `build-output.txt`.
8. Sensitive key grep result
   - Command to capture:
     `rg -n "service_role|SUPABASE_SERVICE_ROLE|sb_secret|eyJ|postgres(ql)?://|NEXT_PUBLIC_SUPABASE_ANON_KEY|NEXT_PUBLIC_SUPABASE_URL" -g "!node_modules" -g "!.next" -g "!package-lock.json" .`

## RLS Summary

- Client UI checks are only for user experience.
- Real authorization is enforced by Supabase RLS in the database.
- `USING` controls access to existing rows for SELECT/UPDATE/DELETE.
- `WITH CHECK` validates newly inserted or updated rows.
- `auth.uid()` reads the current Supabase Auth user id from the request JWT.
