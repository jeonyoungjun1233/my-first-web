# Copilot Instructions - my-first-web

## Tech Stack

- Next.js 16.2.2, App Router only
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- shadcn/ui v4, generated in `components/ui/`
- Supabase planned for Ch8-Ch12 data, auth, and RLS work
- Current temporary data sources: `lib/posts.ts` and JSONPlaceholder in `app/posts/page.tsx`

## Project Goal

This project is a personal learning blog. Readers should be able to browse posts, search the list, open a post detail page, and eventually sign in to write and manage their own posts.

Avoid AI slop. Do not generate a generic blog layout without reading `ARCHITECTURE.md`, `context.md`, and `todo.md`. The intended direction is a red neon personal blog with clear reading flow, shadcn/ui primitives, and Supabase-ready data modeling.

## Coding Conventions

- Use the App Router under `app/`. Do not create a `pages/` directory.
- Server Components are the default. Add `"use client"` only for state, effects, browser APIs, event handlers, or `useRouter`.
- Use `next/link` for internal navigation.
- If navigation is needed in a Client Component, use `next/navigation`.
- Use `async/await` instead of long `.then()` chains.
- Use `className`, never `class`.
- Keep route files focused. Move reusable UI into `components/`.
- Keep secrets out of the repo. Future Supabase keys must use `.env.local`.

## Design Tokens

Design tokens live in `app/globals.css`.

- Main concept: red neon blog, dark background, high-contrast text.
- Primary token: `--primary` for main call-to-action buttons and active states.
- Background token: `--background` for base app surfaces.
- Card token: `--card` for shadcn/ui card surfaces.
- Border token: `--border` for quiet panel outlines.
- Ring token: `--ring` for focus states.
- Radius token: `--radius: 0.5rem`.
- Existing custom utility classes such as `neon-panel`, `neon-pill`, and `glow-text` may stay when they support the current visual identity.

## Component Rules

- Prefer shadcn/ui components from `@/components/ui/` for common controls.
- Available shadcn/ui primitives: `Button`, `Card`, `Input`, `Dialog`.
- Use custom components in `components/` for project-specific behavior:
  - `PostsClient.tsx` for post list filtering and deletion demo state.
  - `SearchBar.tsx` for the post search input.
  - `checklist-panel.tsx` for learning checklist display.
- Do not invent imports from `@/components/ui/` before checking that the file exists.
- If a form is interactive, keep it as a Client Component and keep validation simple.

## Data And Auth Plan

- Ch8 will replace temporary post data with Supabase.
- Planned tables: `profiles` and `posts`.
- `profiles.id` references `auth.users.id`.
- `posts.user_id` references `profiles.id`.
- RLS should allow public reads for published posts and owner-only writes for draft/post management.

## Known AI Mistakes

- Do not use `next/router`.
- Do not use `getServerSideProps`.
- Do not add `"use client"` to static pages.
- Do not hard-code Supabase keys.
- Do not create a data model with integer user IDs. Use UUIDs for Supabase compatibility.
- Do not overwrite the red neon design tokens with a generic gray theme.
- Do not assume package versions. Check `package.json` or `npm list` first.
