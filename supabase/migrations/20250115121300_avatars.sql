-- Avatar photo support (Edit Profile → "Change photo").
--
-- Until now a profile's picture was purely an initials-on-a-color-swatch
-- (avatar_tone). This adds an optional uploaded image on top: a nullable
-- avatar_url column plus a public Storage bucket to hold the files. The UI
-- falls back to the initials/tone avatar whenever avatar_url is null.

alter table profiles add column if not exists avatar_url text;

-- Public bucket: avatar images are world-readable (they show on every
-- question/answer card), writes are gated by the policies below.
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- storage.objects already has RLS enabled by Supabase; add avatar policies.
-- Files are stored under a top-level folder named by the owner's profile id
-- (e.g. "<profile_id>/<timestamp>.jpg"), so a user can only write within
-- their own folder — current_profile_id() maps the JWT to profiles.id.

create policy "Avatar images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users manage their own avatar (insert)"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = current_profile_id()::text);

create policy "Users manage their own avatar (update)"
  on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = current_profile_id()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = current_profile_id()::text);

create policy "Users manage their own avatar (delete)"
  on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = current_profile_id()::text);
