-- Business logic that has to live in triggers because it must hold no
-- matter which client/RPC touched the data (never trust the app layer to
-- remember to keep denormalized counts / notifications / derived status
-- in sync).

-- ───────────────────────── question status ─────────────────────────

create function recompute_question_status(p_question_id uuid) returns void
language plpgsql as $$
declare
  v_locked boolean;
  v_accepted_answer_id uuid;
  v_accepted_is_staff boolean;
  v_answer_count int;
  v_status question_status;
begin
  select status_locked into v_locked from questions where id = p_question_id;
  if v_locked then
    return;   -- an admin Resolve/Reopen already pinned this; never auto-recompute again
  end if;

  select a.id, (p.role = 'staff')
    into v_accepted_answer_id, v_accepted_is_staff
    from answers a
    join profiles p on p.id = a.author_id
    where a.question_id = p_question_id and a.is_accepted and a.deleted_at is null
    limit 1;

  select count(*) into v_answer_count
    from answers where question_id = p_question_id and deleted_at is null;

  if v_accepted_answer_id is not null then
    v_status := case when v_accepted_is_staff then 'verified' else 'community' end;
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

-- ───────────────────────── vote counts ─────────────────────────

create function maintain_vote_counts() returns trigger
language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    if new.target_type = 'question' then
      update questions set vote_count = vote_count + 1 where id = new.target_id;
    else
      update answers set vote_count = vote_count + 1 where id = new.target_id;
    end if;
    return new;
  end if;

  if tg_op = 'DELETE' then
    if old.target_type = 'question' then
      update questions set vote_count = greatest(vote_count - 1, 0) where id = old.target_id;
    else
      update answers set vote_count = greatest(vote_count - 1, 0) where id = old.target_id;
    end if;
    return old;
  end if;

  return null;
end;
$$;

create trigger votes_maintain_counts
  after insert or delete on votes
  for each row execute function maintain_vote_counts();

-- ───────────────────────── answer counts + status recompute ─────────────────────────

create function on_answers_change() returns trigger
language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    update questions set answer_count = answer_count + 1 where id = new.question_id;
    perform recompute_question_status(new.question_id);
    return new;
  end if;

  if tg_op = 'UPDATE' then
    if (old.deleted_at is null) <> (new.deleted_at is null) then
      if new.deleted_at is not null then
        update questions set answer_count = greatest(answer_count - 1, 0) where id = new.question_id;
      else
        update questions set answer_count = answer_count + 1 where id = new.question_id;
      end if;
    end if;

    if old.is_accepted is distinct from new.is_accepted
       or (old.deleted_at is null) <> (new.deleted_at is null) then
      perform recompute_question_status(new.question_id);
    end if;

    return new;
  end if;

  return null;
end;
$$;

create trigger answers_after_change
  after insert or update on answers
  for each row execute function on_answers_change();

-- ───────────────────────── notifications ─────────────────────────
-- Matches the mock's 3 notification-generating moments exactly (see
-- src/lib/mock-data.ts NOTIFICATIONS + docs/supabase-integration-plan.md §8).
-- No self-notifications (acting on your own content never notifies you).

create function notify_new_answer() returns trigger
language plpgsql as $$
declare
  v_question_author_id uuid;
begin
  select author_id into v_question_author_id from questions where id = new.question_id;
  if v_question_author_id is not null and v_question_author_id <> new.author_id then
    insert into notifications (recipient_id, actor_id, type, question_id, answer_id)
    values (v_question_author_id, new.author_id, 'answer', new.question_id, new.id);
  end if;
  return new;
end;
$$;

create trigger answers_notify_new
  after insert on answers
  for each row execute function notify_new_answer();

create function notify_answer_verified() returns trigger
language plpgsql as $$
declare
  v_question_author_id uuid;
  v_answer_author_role user_role;
begin
  if new.is_accepted and (old.is_accepted is distinct from new.is_accepted) then
    select role into v_answer_author_role from profiles where id = new.author_id;
    if v_answer_author_role = 'staff' then
      select author_id into v_question_author_id from questions where id = new.question_id;
      if v_question_author_id is not null then
        -- actor_id null: rendered as "Inventive Team", matching the mock's seed data
        insert into notifications (recipient_id, actor_id, type, question_id, answer_id)
        values (v_question_author_id, null, 'verified', new.question_id, new.id);
      end if;
    end if;
  end if;
  return new;
end;
$$;

create trigger answers_notify_verified
  after update on answers
  for each row execute function notify_answer_verified();

create function notify_new_vote() returns trigger
language plpgsql as $$
declare
  v_author_id uuid;
  v_question_id uuid;
begin
  if new.target_type = 'question' then
    select author_id, id into v_author_id, v_question_id from questions where id = new.target_id;
  else
    select a.author_id, a.question_id into v_author_id, v_question_id from answers a where a.id = new.target_id;
  end if;

  if v_author_id is not null and v_author_id <> new.user_id then
    insert into notifications (recipient_id, actor_id, type, question_id, answer_id)
    values (
      v_author_id, new.user_id, 'upvote', v_question_id,
      case when new.target_type = 'answer' then new.target_id else null end
    );
  end if;
  return new;
end;
$$;

create trigger votes_notify_new
  after insert on votes
  for each row execute function notify_new_vote();

-- ───────────────────────── new-user signup ─────────────────────────

create function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_base_username text;
  v_username text;
  v_display_name text;
  v_suffix int := 0;
begin
  v_display_name := coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1));
  v_base_username := lower(regexp_replace(coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)), '[^a-z0-9_-]+', '-', 'g'));
  v_base_username := left(nullif(v_base_username, ''), 24);
  if v_base_username is null then
    v_base_username := 'member';
  end if;

  v_username := v_base_username;
  while exists (select 1 from profiles where lower(username) = v_username) loop
    v_suffix := v_suffix + 1;
    v_username := v_base_username || '-' || v_suffix;
  end loop;

  insert into profiles (user_id, username, display_name)
  values (new.id, v_username, v_display_name);

  insert into notification_preferences (user_id)
  select id from profiles where user_id = new.id;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
