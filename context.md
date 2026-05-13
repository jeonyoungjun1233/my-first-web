# Context - my-first-web

Last updated: 2026-05-13

## Current State

- Ch1-Ch6 blog routes are present: `/`, `/posts`, `/posts/[id]`, `/posts/new`.
- Ch7 architecture work is completed in this session.
- Ch9A authentication work is now visible at `/chapter-9`.
- Auth routes are present: `/login`, `/signup`, `/mypage`.
- Protected routes are enforced by `middleware.ts`: `/mypage`, `/posts/new`.
- The original Ch9A source document is tracked at `docs/ch9A.md`.
- shadcn/ui has been initialized with `components.json`.
- shadcn/ui components added: `Button`, `Card`, `Input`, `Dialog`.
- The global design tokens in `app/globals.css` were customized for the red neon blog theme.
- The project now has `ARCHITECTURE.md`, `WIREFRAMES.md`, `context.md`, and `todo.md`.
- Two SVG wireframe image files were added under `wireframes/` for stricter Ch7 submission evidence.
- `.github/copilot-instructions.md` was updated with App Router, shadcn/ui, design token, and Supabase planning rules.

## Deployment And Repository

- GitHub repository: `https://github.com/jeonyoungjun1233/my-first-web`
- Vercel URL for Classroom: `https://my-first-lime.vercel.app`

## Technical Decisions

- Framework: Next.js 16.2.2 with App Router.
- React: 19.2.4.
- Styling: Tailwind CSS 4 plus shadcn/ui tokens in `app/globals.css`.
- UI system: shadcn/ui components are stored as source in `components/ui/`.
- Import alias: `@/*` points to the project root.
- Current data: local `lib/posts.ts` plus temporary JSONPlaceholder fetch.
- Current auth: Ch9 learning auth using server route handlers, AuthContext, and an HttpOnly cookie.
- Future data/auth: Supabase with `profiles` and `posts` tables.
- Future auth: replace the learning auth with Supabase Auth email/password and `@supabase/ssr`.

## Resolved Issues

- shadcn/ui init failed because `tsconfig.json` did not have an import alias. Added `baseUrl` and `paths` for `@/*`.
- `app/posts/new/page.tsx` referenced undefined `title` and `content`. Changed the live preview to use `form.title` and `form.content`.
- PowerShell blocks `npm` through `npm.ps1`; use `npm.cmd` in this workspace.
- shadcn init added a circular `--font-sans: var(--font-sans)` token. Replaced it with literal font families in `@theme inline`.
- `next/font/google` can fail in restricted local builds because it fetches Google Fonts. The layout now uses local CSS font stacks instead.
- JSONPlaceholder can fail in restricted local builds. `/posts` now falls back to local learning posts when the external fetch is unavailable.

## Verification

- 2026-05-13: `npm.cmd run build` passed with Next.js 16.2.2.
- 2026-05-13 local HTTP smoke test passed at `http://127.0.0.1:3000`.
- 2026-05-13 Vercel smoke test passed at `https://my-first-lime.vercel.app`.
- Checked routes: `/`, `/chapter-9`, `/login`, `/mypage`, `/posts/new`.
- Checked auth flow: unauthenticated redirect, login, session restore, protected page access, logout.

## Notes For Next Session

Use this prompt at the start of a new Copilot Chat session:

```text
#file:context.md #file:todo.md #file:ARCHITECTURE.md

이전 작업을 이어서 진행하려고 해.
context.md에서 현재 상태를 파악하고,
todo.md에서 다음 할 일을 찾아서 진행해줘.
ARCHITECTURE.md의 설계를 따라줘.
```

## Known Constraints

- Supabase is not connected yet.
- The current Ch9 auth is for classroom flow verification and does not send real email verification messages.
- Current write form is a client-side demo and does not persist to a database.
- JSONPlaceholder posts are temporary and should be replaced after Supabase CRUD is added.
- `/posts/[id]/edit` is still planned but not implemented yet.
