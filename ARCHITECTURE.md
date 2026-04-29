# ARCHITECTURE - my-first-web

Last updated: 2026-04-29

## 1. Project Goal

`my-first-web` is a personal learning blog built with Next.js App Router. The app currently records Ch1-Ch6 learning posts and is being prepared for Ch8-Ch12 Supabase CRUD, authentication, and RLS work.

The design goal is to avoid "AI slop": instead of a generic blog, the project keeps a clear red neon visual identity, a predictable page map, and explicit component/data rules for future AI-assisted coding.

## 2. Page Map

| Page | URL | App Router file | Status | Purpose |
| --- | --- | --- | --- | --- |
| Home | `/` | `app/page.tsx` | Implemented | Shows site identity, profile summary, featured post cards, and final checklist. |
| Post List | `/posts` | `app/posts/page.tsx` | Implemented | Fetches temporary JSONPlaceholder posts and passes them to `PostsClient`. |
| Post Detail | `/posts/[id]` | `app/posts/[id]/page.tsx` | Implemented | Shows local learning post detail from `lib/posts.ts`. |
| New Post | `/posts/new` | `app/posts/new/page.tsx` | Implemented demo | Client form demo using local state, alert, and redirect to `/posts`. |
| Login | `/login` | `app/login/page.tsx` | Planned | Email/password login after Supabase Auth is added. |
| Signup | `/signup` | `app/signup/page.tsx` | Planned | Account creation after Supabase Auth is added. |
| My Page | `/mypage` | `app/mypage/page.tsx` | Planned | User profile and owned post management after auth is added. |
| Edit Post | `/posts/[id]/edit` | `app/posts/[id]/edit/page.tsx` | Planned | Owner-only edit form after Supabase CRUD is added. |

## 3. User Flows

### Read A Post

Home `/` -> Post list `/posts` -> click a post card -> Post detail `/posts/[id]` -> return to `/posts`.

### Write A Post

Home `/` or `/posts` -> New post `/posts/new` -> if not logged in after Ch9, redirect to `/login` -> submit form -> create `posts` row -> redirect to `/posts/[id]`.

### Check My Page

Header -> `/mypage` -> if not logged in, redirect to `/login` -> load `profiles` row and user's posts -> edit or delete owned posts.

### Edit My Post

`/mypage` -> choose owned post -> `/posts/[id]/edit` -> update title/content -> save -> return to `/posts/[id]`.

## 4. Wireframes

Detailed AI wireframe drafts are kept in `WIREFRAMES.md`.

Required Ch7 wireframes:

- Home page: post card list plus search-oriented entry point.
- New post page: title input, content textarea, submit button, live preview area.

## 5. Component Hierarchy

```text
app/layout.tsx
├─ Header navigation
├─ main route slot
└─ Footer

app/page.tsx
├─ Hero/profile section
├─ Post card list
└─ ChecklistPanel

app/posts/page.tsx
├─ Route intro panel
├─ PostsClient
│  ├─ SearchBar
│  └─ Post result cards
└─ ChecklistPanel

app/posts/[id]/page.tsx
├─ Post hero
├─ Post sections
├─ Section checklists
└─ Quick route links

app/posts/new/page.tsx
├─ Post form
│  ├─ Title input
│  ├─ Content textarea
│  └─ Submit/back buttons
└─ Live preview and concept notes
```

### shadcn/ui Components

Installed in `components/ui/`:

- `button.tsx` for primary actions and dialog controls.
- `card.tsx` for post cards, dashboard panels, and future profile panels.
- `input.tsx` for search, title, email, and profile forms.
- `dialog.tsx` for future delete confirmation or auth prompts.

Project-specific components stay in `components/`.

## 6. Design Tokens

Design tokens are defined in `app/globals.css`.

| Token | Role | Current direction |
| --- | --- | --- |
| `--background` | App background | Deep red-black base. |
| `--foreground` | Main text | Warm near-white. |
| `--card` | shadcn card surface | Dark red panel surface. |
| `--primary` | Main action | Neon rose/red. |
| `--secondary` | Quiet surface | Muted dark red. |
| `--accent` | Highlight | Rose-magenta accent. |
| `--border` | Panel outline | Soft red outline. |
| `--ring` | Focus state | Bright red focus ring. |
| `--radius` | shadcn corner radius | `0.5rem`. |

Existing visual identity helpers:

- `neon-panel`
- `neon-outline`
- `neon-pill`
- `glow-text`
- `signal-bar`

## 7. Data Model

Supabase will be introduced after Ch7. The app should be designed around UUID-compatible tables.

### `profiles`

| Column | Type | Rule |
| --- | --- | --- |
| `id` | `uuid` | Primary key, references `auth.users.id`. |
| `username` | `text` | Unique public handle. |
| `display_name` | `text` | Name shown in UI. |
| `avatar_url` | `text` | Optional profile image URL. |
| `bio` | `text` | Optional short bio. |
| `created_at` | `timestamptz` | Defaults to `now()`. |
| `updated_at` | `timestamptz` | Updated when profile changes. |

### `posts`

| Column | Type | Rule |
| --- | --- | --- |
| `id` | `uuid` | Primary key, defaults to generated UUID. |
| `user_id` | `uuid` | Foreign key to `profiles.id`. |
| `title` | `text` | Required. |
| `slug` | `text` | Unique readable URL candidate. |
| `content` | `text` | Required post body. |
| `excerpt` | `text` | Optional summary for cards. |
| `published` | `boolean` | Defaults to `false`. |
| `created_at` | `timestamptz` | Defaults to `now()`. |
| `updated_at` | `timestamptz` | Updated when post changes. |

Relationship: one `profiles` row has many `posts` rows through `posts.user_id`.

## 8. RLS Plan

- Public users can read posts where `published = true`.
- Authenticated users can create posts with `user_id = auth.uid()`.
- Users can update and delete only posts where `user_id = auth.uid()`.
- Users can read their own draft posts from `/mypage`.

## 9. AI Design Verification Checklist

- [x] Page map uses App Router URLs, not Pages Router paths.
- [x] Wireframes include at least two screens.
- [x] shadcn/ui is initialized and components exist under `components/ui/`.
- [x] Design tokens are customized in `app/globals.css`.
- [x] Component hierarchy matches current route structure.
- [x] Data model uses UUIDs and a clear `profiles` 1:N `posts` relationship.
- [x] `context.md` and `todo.md` can be referenced at the start of a new Copilot session.
