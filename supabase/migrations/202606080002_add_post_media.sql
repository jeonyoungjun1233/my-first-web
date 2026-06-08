alter table public.posts
add column if not exists media_url text,
add column if not exists media_type text
  check (media_type in ('image', 'video'));

insert into storage.buckets (id, name, public)
values ('post-media', 'post-media', true)
on conflict (id) do update set public = true;

drop policy if exists "post_media_select_public" on storage.objects;
drop policy if exists "post_media_insert_own" on storage.objects;

create policy "post_media_select_public"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'post-media');

create policy "post_media_insert_own"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'post-media'
  and auth.uid()::text = (storage.foldername(name))[1]
);
