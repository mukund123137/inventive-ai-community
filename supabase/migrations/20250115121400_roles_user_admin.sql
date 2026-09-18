-- Rename the two roles: member -> user, staff -> admin.
--
-- ALTER TYPE ... RENAME VALUE rewrites the label in place, so every existing
-- profiles.role row is migrated automatically (a 'staff' account becomes
-- 'admin', a 'member' account becomes 'user') with no data change needed.
-- Guarded so the whole script is safe to run more than once.

do $$
begin
  if exists (
    select 1 from pg_enum e join pg_type t on t.oid = e.enumtypid
    where t.typname = 'user_role' and e.enumlabel = 'member'
  ) then
    alter type user_role rename value 'member' to 'user';
  end if;

  if exists (
    select 1 from pg_enum e join pg_type t on t.oid = e.enumtypid
    where t.typname = 'user_role' and e.enumlabel = 'staff'
  ) then
    alter type user_role rename value 'staff' to 'admin';
  end if;
end $$;

-- New signups default to the ordinary 'user' role.
alter table profiles alter column role set default 'user';

-- Rename the staff helper to is_admin() and point it at the 'admin' role.
-- RLS policies reference this function by OID, so the rename carries them all
-- over automatically — only the things that reference it *by name*
-- (admin_search_content) or that hardcode the old enum literal
-- (recompute_question_status, notify_answer_verified) need recreating below.
do $$
begin
  if exists (select 1 from pg_proc where proname = 'is_staff') then
    alter function is_staff() rename to is_admin;
  end if;
end $$;

create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from profiles where user_id = auth.uid() and role = 'admin'
  );
$$;

-- recompute_question_status hardcoded the old 'staff' enum literal.
create or replace function recompute_question_status(p_question_id uuid) returns void
language plpgsql security definer set search_path = public as $$
declare
  v_locked boolean;
  v_accepted_answer_id uuid;
  v_accepted_is_admin boolean;
  v_answer_count int;
  v_status question_status;
begin
  select status_locked into v_locked from questions where id = p_question_id;
  if v_locked then
    return;   -- an admin Resolve/Reopen already pinned this; never auto-recompute again
  end if;

  select a.id, (p.role = 'admin')
    into v_accepted_answer_id, v_accepted_is_admin
    from answers a
    join profiles p on p.id = a.author_id
    where a.question_id = p_question_id and a.is_accepted and a.deleted_at is null
    limit 1;

  select count(*) into v_answer_count
    from answers where question_id = p_question_id and deleted_at is null;

  if v_accepted_answer_id is not null then
    v_status := case when v_accepted_is_admin then 'verified' else 'community' end;
  elsif v_answer_count = 0 then
    v_status := 'unanswered';
  else
    v_status := 'open';
  end if;

  update questions
     set status = v_status,
         accepted_answer_id = v_accepted_answer_id
   where id = p_question_id;
end;
$$;

-- notify_answer_verified hardcoded the old 'staff' enum literal.
create or replace function notify_answer_verified() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_question_author_id uuid;
  v_answer_author_role user_role;
begin
  if new.is_accepted and (old.is_accepted is distinct from new.is_accepted) then
    select role into v_answer_author_role from profiles where id = new.author_id;
    if v_answer_author_role = 'admin' then
      select author_id into v_question_author_id from questions where id = new.question_id;
      if v_question_author_id is not null then
        -- actor_id null: rendered as "Inventive Team", matching the seed data
        insert into notifications (recipient_id, actor_id, type, question_id, answer_id)
        values (v_question_author_id, null, 'verified', new.question_id, new.id);
      end if;
    end if;
  end if;
  return new;
end;
$$;

-- accept_answer called is_staff() by name.
create or replace function accept_answer(p_question_id uuid, p_answer_id uuid)
returns void
language plpgsql security definer set search_path = public as $$
declare
  v_caller uuid := current_profile_id();
  v_question_author_id uuid;
  v_currently_accepted boolean;
  v_is_moderation boolean;
begin
  if v_caller is null then
    raise exception 'not authenticated';
  end if;

  select author_id into v_question_author_id from questions
   where id = p_question_id and deleted_at is null;
  if v_question_author_id is null then
    raise exception 'question not found';
  end if;

  if v_caller <> v_question_author_id and not is_admin() then
    raise exception 'only the question author or an admin can accept an answer';
  end if;

  v_is_moderation := (v_caller <> v_question_author_id);

  select is_accepted into v_currently_accepted from answers
   where id = p_answer_id and question_id = p_question_id and deleted_at is null;
  if v_currently_accepted is null then
    raise exception 'answer not found on this question';
  end if;

  update answers set is_accepted = false
   where question_id = p_question_id and is_accepted and id <> p_answer_id;

  update answers set is_accepted = not v_currently_accepted
   where id = p_answer_id;

  if v_is_moderation then
    insert into moderation_actions (moderator_id, question_id, answer_id, action)
    values (v_caller, p_question_id, p_answer_id,
      (case when v_currently_accepted then 'unaccept_answer' else 'accept_answer' end)::moderation_action);
  end if;
end;
$$;

-- admin_search_content called is_staff() by name.
create or replace function admin_search_content(p_query text)
returns table (
  kind        admin_content_kind,
  question_id uuid,
  answer_id   uuid,
  title       text,
  body        text,
  author_id   uuid,
  created_at  timestamptz,
  status_key  text
)
language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then
    raise exception 'admin only';
  end if;

  return query
  select 'question'::admin_content_kind, q.id, null::uuid, q.title, q.body, q.author_id, q.created_at, q.status::text
  from questions q
  where q.deleted_at is null
    and (q.title ilike '%' || p_query || '%' or q.body ilike '%' || p_query || '%')
  union all
  select 'answer'::admin_content_kind, a.question_id, a.id, q.title, a.body, a.author_id, a.created_at,
         case when a.is_accepted then 'accepted' else 'unaccepted' end
  from answers a
  join questions q on q.id = a.question_id
  where a.deleted_at is null
    and (a.body ilike '%' || p_query || '%' or q.title ilike '%' || p_query || '%')
  order by created_at desc
  limit 10;
end;
$$;
