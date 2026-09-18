-- ───────────────────────── toggle_vote ─────────────────────────
-- The only way votes ever change. Runs as security definer because votes
-- has no client-facing INSERT/DELETE policy at all (see RLS migration) —
-- authorization lives here instead: you can only ever vote as yourself.

create function toggle_vote(p_target_type vote_target_type, p_target_id uuid)
returns table (voted boolean, vote_count integer)
language plpgsql security definer set search_path = public as $$
declare
  v_user_id uuid := current_profile_id();
  v_existing uuid;
  v_count integer;
begin
  if v_user_id is null then
    raise exception 'not authenticated';
  end if;

  if p_target_type = 'question' then
    if not exists (select 1 from questions where id = p_target_id and deleted_at is null) then
      raise exception 'question not found';
    end if;
  else
    if not exists (select 1 from answers where id = p_target_id and deleted_at is null) then
      raise exception 'answer not found';
    end if;
  end if;

  select id into v_existing from votes
   where user_id = v_user_id and target_type = p_target_type and target_id = p_target_id;

  if v_existing is not null then
    delete from votes where id = v_existing;
  else
    insert into votes (user_id, target_type, target_id) values (v_user_id, p_target_type, p_target_id);
  end if;

  if p_target_type = 'question' then
    select q.vote_count into v_count from questions q where q.id = p_target_id;
  else
    select a.vote_count into v_count from answers a where a.id = p_target_id;
  end if;

  return query select (v_existing is null), v_count;
end;
$$;

revoke all on function toggle_vote(vote_target_type, uuid) from public;
grant execute on function toggle_vote(vote_target_type, uuid) to authenticated;

-- ───────────────────────── accept_answer ─────────────────────────
-- Callable by the question's own author (the normal Detail-page flow) or by
-- staff (the Admin-page flow). Toggles: calling it again on an already-
-- accepted answer unaccepts it — matches acceptToggleLabel in the mock.
-- Only logs to moderation_actions when staff act on someone else's
-- question; the author accepting their own question's answer is a normal
-- user action, not a moderation event.

create function accept_answer(p_question_id uuid, p_answer_id uuid)
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

  if v_caller <> v_question_author_id and not is_staff() then
    raise exception 'only the question author or staff can accept an answer';
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

revoke all on function accept_answer(uuid, uuid) from public;
grant execute on function accept_answer(uuid, uuid) to authenticated;

-- ───────────────────────── search ─────────────────────────
-- Called only for a non-blank query. A blank query is "show everything" in
-- the mock (see filterAndSort's `if (s.search && s.view==='search')` guard)
-- — the frontend handles that case with a plain list query, not this RPC.

create function search_questions(p_query text, p_limit int default 20)
returns setof questions
language sql stable as $$
  select q.*
  from questions q
  where q.deleted_at is null
    and (
      q.search_vector @@ websearch_to_tsquery('english', p_query)
      or exists (
        select 1 from question_tags qt
        join tags t on t.id = qt.tag_id
        where qt.question_id = q.id and t.name ilike '%' || p_query || '%'
      )
    )
  order by ts_rank(q.search_vector, websearch_to_tsquery('english', p_query)) desc
  limit p_limit;
$$;

grant execute on function search_questions(text, int) to anon, authenticated;

create function get_trending_questions(p_limit int default 5)
returns setof questions
language sql stable as $$
  select *
  from questions
  where deleted_at is null
  order by (vote_count + answer_count * 3) desc
  limit p_limit;
$$;

grant execute on function get_trending_questions(int) to anon, authenticated;

-- ───────────────────────── admin content search ─────────────────────────
-- The "type a keyword/title/author" branch of the Admin unified search bar.
-- The "paste a URL" branch is a direct .eq('slug', ...) / .eq('id', ...)
-- lookup done from the frontend, not an RPC (see docs/supabase-integration-plan.md §12).

create type admin_content_kind as enum ('question', 'answer');

create function admin_search_content(p_query text)
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
  if not is_staff() then
    raise exception 'staff only';
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

revoke all on function admin_search_content(text) from public;
grant execute on function admin_search_content(text) to authenticated;
