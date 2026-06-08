create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists comments_post_id_created_at_idx
on public.comments (post_id, created_at);

alter table public.comments enable row level security;

drop policy if exists "comments_select_public" on public.comments;
drop policy if exists "comments_insert_own" on public.comments;
drop policy if exists "comments_update_own" on public.comments;
drop policy if exists "comments_delete_own" on public.comments;

create policy "comments_select_public"
on public.comments
for select
to anon, authenticated
using (true);

create policy "comments_insert_own"
on public.comments
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "comments_update_own"
on public.comments
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "comments_delete_own"
on public.comments
for delete
to authenticated
using (auth.uid() = user_id);

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint likes_post_user_unique unique (post_id, user_id)
);

create index if not exists likes_post_id_idx
on public.likes (post_id);

alter table public.likes enable row level security;

drop policy if exists "likes_select_public" on public.likes;
drop policy if exists "likes_insert_own" on public.likes;
drop policy if exists "likes_delete_own" on public.likes;

create policy "likes_select_public"
on public.likes
for select
to anon, authenticated
using (true);

create policy "likes_insert_own"
on public.likes
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "likes_delete_own"
on public.likes
for delete
to authenticated
using (auth.uid() = user_id);
