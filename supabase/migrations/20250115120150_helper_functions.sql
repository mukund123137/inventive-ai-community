-- Generic helpers used by later migrations' triggers and RLS policies.
-- Split out early (before categories/questions/etc.) purely so those later
-- migrations can reference them without forward-declaration problems.

create function set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- Maps the current JWT (auth.uid(), i.e. auth.users.id) to this app's
-- notion of identity (profiles.id). Every RLS policy and RPC that needs
-- "who is the current user, as a profile" goes through this — never
-- auth.uid() directly against author_id/user_id columns on content tables,
-- since those store profiles.id, not auth.users.id (see 0002's comment on
-- why profiles.id is decoupled from auth.users.id).
create function current_profile_id() returns uuid
language sql stable security definer set search_path = public as $$
  select id from profiles where user_id = auth.uid();
$$;

comment on function current_profile_id() is
  'NULL for anonymous/unauthenticated requests and for the (impossible via RLS anyway) case of a session with no matching profile.';

create function is_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from profiles where user_id = auth.uid() and role = 'staff'
  );
$$;
