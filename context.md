# Context - my-first-web

Last updated: 2026-04-29

## Current State

- Ch1-Ch6 blog routes are present: `/`, `/posts`, `/posts/[id]`, `/posts/new`.
- Ch7 architecture work is completed in this session.
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
- Future data/auth: Supabase with `profiles` and `posts` tables.
- Future auth: email/password login with owner-only post management.

## Resolved Issues

- shadcn/ui init failed because `tsconfig.json` did not have an import alias. Added `baseUrl` and `paths` for `@/*`.
- `app/posts/new/page.tsx` referenced undefined `title` and `content`. Changed the live preview to use `form.title` and `form.content`.
- PowerShell blocks `npm` through `npm.ps1`; use `npm.cmd` in this workspace.
- shadcn init added a circular `--font-sans: var(--font-sans)` token. Replaced it with literal font families in `@theme inline`.

## Verification

- `npx.cmd tsc --noEmit` passed.
- `npm.cmd run build` passed with Next.js 16.2.2.
- Local dev server was verified with HTTP checks at `http://127.0.0.1:3000`.
- Checked routes: `/`, `/posts`, `/posts/new`, `/posts/1`.
- No Next.js error dialog was found in the home page HTML.

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

- `/login`, `/signup`, `/mypage`, and `/posts/[id]/edit` are planned but not implemented yet.
- Supabase is not connected yet.
- Current write form is a client-side demo and does not persist to a database.
- JSONPlaceholder posts are temporary and should be replaced after Supabase CRUD is added.
