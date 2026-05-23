-- Ch11 Row Level Security policies for the blog.
-- Scenario:
-- 1. Anyone can read posts.
-- 2. Only signed-in users can create posts as themselves.
-- 3. Only the author can update a post.
-- 4. Only the author can delete a post.

alter table public.posts enable row level security;

drop policy if exists "posts_select_public" on public.posts;
drop policy if exists "posts_insert_own" on public.posts;
drop policy if exists "posts_update_own" on public.posts;
drop policy if exists "posts_delete_own" on public.posts;

create policy "posts_select_public"
on public.posts
for select
to anon, authenticated
using (true);

create policy "posts_insert_own"
on public.posts
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "posts_update_own"
on public.posts
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "posts_delete_own"
on public.posts
for delete
to authenticated
using (auth.uid() = user_id);

-- Optional Ch11 companion policy for profiles.
-- This block is safe to run before profiles exists; it only applies policies
-- when public.profiles is already present in the Supabase project.
do $$
begin
  if to_regclass('public.profiles') is not null then
    execute 'alter table public.profiles enable row level security';

    execute 'drop policy if exists "profiles_select_public" on public.profiles';
    execute 'drop policy if exists "profiles_update_own" on public.profiles';

    execute 'create policy "profiles_select_public"
      on public.profiles
      for select
      to anon, authenticated
      using (true)';

    execute 'create policy "profiles_update_own"
      on public.profiles
      for update
      to authenticated
      using (auth.uid() = id)
      with check (auth.uid() = id)';
  end if;
end $$;
