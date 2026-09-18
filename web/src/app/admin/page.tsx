"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { DangerOutlineButton, OutlineButton, PeachButton, GrayButton } from "@/components/ui/PeachButton";
import { SearchIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { useAcceptAnswer, useDeleteItem, useEditAnswer, useEditQuestion, useResolveReport, useSetQuestionStatus } from "@/lib/mutations";
import { useAdminItems, useAdminUrlLookup, useOpenReports, type AdminItem } from "@/lib/queries";
import { STATUS } from "@/lib/status";
import { timeAgo } from "@/lib/time";
import type { QuestionStatus } from "@/lib/supabase/database.types";

function statusView(it: AdminItem) {
  if (it.kind === "Answer") {
    return it.statusKey === "accepted"
      ? { label: "Accepted", bg: "#E8F5E9", fg: "#2E7D39" }
      : { label: "Not accepted", bg: "#F3F5F6", fg: "#636B6E" };
  }
  const st = STATUS[it.statusKey as QuestionStatus] ?? STATUS.open;
  return { label: st.label, bg: st.bg, fg: st.fg };
}

function adminUrl(it: AdminItem) {
  return `community.inventive.ai/questions/${it.questionSlug}${it.answerId ? `#answer-${it.answerId}` : ""}`;
}

/** Public detail-page path for an item — with the stable answer anchor when
 * the item is an answer, so "View" lands directly on it. */
function detailPath(it: AdminItem) {
  return `/questions/${it.questionSlug}${it.kind === "Answer" && it.answerId ? `#answer-${it.answerId}` : ""}`;
}

export default function AdminPage() {
  const router = useRouter();
  const { profile, loading } = useAuth();

  // Route guard (item 8): DB RLS/RPCs are the real security layer, but the
  // page itself also redirects so non-admins never see the shell.
  //   unauthenticated -> /login   authenticated non-admin -> /
  useEffect(() => {
    if (loading) return;
    if (!profile) router.replace("/login");
    else if (profile.role !== "admin") router.replace("/");
  }, [loading, profile, router]);

  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function showToast(msg: string) {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }

  // Open a public detail path. For an answer anchor (…#answer-<id>) we use a
  // real navigation: the App Router drops the hash fragment on cross-route
  // router.push(), so the address bar would never show the answer link. A full
  // navigation keeps the URL correct and lets the detail page scroll+highlight.
  function openDetail(path: string) {
    if (path.includes("#")) window.location.assign(path);
    else router.push(path);
  }

  const [query, setQuery] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminItem | null>(null);

  const { data: urlMatch } = useAdminUrlLookup(query);
  const { data: keywordMatches } = useAdminItems(query);
  const { data: openReports } = useOpenReports();

  const acceptAnswer = useAcceptAnswer();
  const setQuestionStatus = useSetQuestionStatus();
  const editQuestion = useEditQuestion();
  const editAnswer = useEditAnswer();
  const deleteItem = useDeleteItem();
  const resolveReport = useResolveReport();

  const isUrlSearch = /https?:|\/|inventive\.ai/i.test(query.trim());
  const matches = useMemo(() => (isUrlSearch ? urlMatch ?? [] : keywordMatches ?? []), [isUrlSearch, urlMatch, keywordMatches]);
  const selected = selectedKey ? matches.find((it) => it.key === selectedKey) ?? null : null;

  function selectItem(it: AdminItem) {
    setSelectedKey(it.key);
    setEditing(false);
  }

  function startEdit(it: AdminItem) {
    setEditTitle(it.title);
    setEditBody(it.body);
    setEditing(true);
  }

  function saveEdit() {
    if (!selected) return;
    if (selected.kind === "Question") {
      editQuestion.mutate(
        { questionId: selected.questionId, title: editTitle, body: editBody },
        { onSuccess: () => { setEditing(false); showToast("Question updated"); } }
      );
    } else if (selected.answerId) {
      editAnswer.mutate(
        { answerId: selected.answerId, questionId: selected.questionId, body: editBody },
        { onSuccess: () => { setEditing(false); showToast("Answer updated"); } }
      );
    }
  }

  function toggleStatus(it: AdminItem) {
    if (it.kind === "Answer" && it.answerId) {
      const accepted = it.statusKey === "accepted";
      acceptAnswer.mutate(
        { questionId: it.questionId, answerId: it.answerId },
        { onSuccess: () => showToast(accepted ? "Answer unaccepted" : "Answer accepted") }
      );
    } else {
      const resolved = it.statusKey === "community" || it.statusKey === "verified";
      setQuestionStatus.mutate(
        { questionId: it.questionId, resolved: !resolved },
        { onSuccess: () => showToast(resolved ? "Question reopened" : "Question resolved") }
      );
    }
  }

  if (loading || !profile || profile.role !== "admin") return null;

  return (
    <div className="mx-auto max-w-[900px] p-[26px_24px_48px]">
      <div className="mb-1.5 flex items-center gap-2.5">
        <h1 className="font-display m-0 text-[22px] font-bold">Admin Dashboard</h1>
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-lilac-dark"
          style={{ background: "linear-gradient(90deg,#F1EDFB,#FFEEE7)" }}
        >
          Staff only
        </span>
      </div>
      <p className="mb-5 text-[13px] text-muted">Find any question or answer by pasting its URL or searching its content, then manage it.</p>

      <div className="relative mb-2">
        <SearchIcon style={{ fontSize: 17, color: "#7C8588", position: "absolute", left: 14, top: 15 }} />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedKey(null);
            setEditing(false);
          }}
          data-behavior="unified: paste a Question/Answer URL OR type keywords/title"
          placeholder="Search by URL or content…"
          className="w-full rounded-[10px] border border-border-strong bg-white p-[13px_14px_13px_42px] text-[14px] outline-none"
          style={{ boxShadow: "0 2px 8px rgba(16,24,40,.06)" }}
        />
      </div>
      <div className="mb-4.5 text-[11.5px] text-muted-2">
        Paste a link like community.inventive.ai/questions/q9 — or type a keyword, author, or title.
      </div>

      {selected && (
        <div className="mb-5 overflow-hidden rounded-xl border border-border bg-surface shadow-card">
          {!editing ? (
            <>
              <div className="p-[18px_20px]">
                <div className="mb-2.5 flex flex-wrap items-center gap-2">
                  <KindChip kind={selected.kind} />
                  <StatusPill it={selected} />
                  <span onClick={() => setSelectedKey(null)} data-behavior="back to results" className="ml-auto cursor-pointer text-[12px] text-lilac">
                    ← Back to results
                  </span>
                </div>
                {selected.kind === "Answer" && (
                  <div className="mb-0.5 text-[11px] font-semibold tracking-[.04em] text-muted-2 uppercase">Answer to question</div>
                )}
                <div className="text-[17px] leading-[1.35] font-semibold text-ink">{selected.title}</div>
                {selected.kind === "Answer" && <p className="mt-2 text-[13px] leading-[1.55] text-[#4B5563]">{selected.body}</p>}
                <div className="mt-3.5 flex flex-wrap items-center gap-3.5 text-[12px] text-muted">
                  <span>
                    By <b className="font-semibold text-ink">{selected.authorName}</b>
                  </span>
                  <span>{selected.date}</span>
                  <span className="text-[11.5px] text-muted-2">{adminUrl(selected)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-border-3 bg-[#FAFBFC] p-[13px_20px]">
                <OutlineButton onClick={() => openDetail(detailPath(selected))} data-behavior="-> public detail page (answer anchor when an answer)">
                  View
                </OutlineButton>
                <OutlineButton onClick={() => startEdit(selected)} data-behavior="-> inline editor (title/body)">
                  Edit
                </OutlineButton>
                <ToggleButton item={selected} onClick={() => toggleStatus(selected)} />
                <DangerOutlineButton className="ml-auto" onClick={() => setDeleteTarget(selected)} data-behavior="opens delete confirmation">
                  Delete
                </DangerOutlineButton>
              </div>
            </>
          ) : (
            <>
              <div className="p-[18px_20px]">
                <div className="mb-3.5 flex items-center gap-2">
                  <KindChip kind={selected.kind} />
                  <span className="text-[13px] font-semibold text-ink">Editing this {selected.kind.toLowerCase()}</span>
                </div>
                {selected.kind === "Answer" && (
                  <>
                    <div className="mb-1.5 text-[11px] font-semibold tracking-[.04em] text-muted-2 uppercase">Answer to</div>
                    <div className="mb-4 rounded-lg border border-border-3 bg-surface-alt p-[9px_12px] text-[13px] text-[#4B5563]">{selected.title}</div>
                  </>
                )}
                {selected.kind === "Question" && (
                  <>
                    <label className="mb-1.5 block text-[12px] font-semibold text-ink">Question title</label>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      data-behavior="edits title"
                      className="mb-4 w-full rounded-lg border border-[#D8DCDE] bg-white p-[10px_12px] text-[14px] outline-none"
                    />
                  </>
                )}
                <label className="mb-1.5 block text-[12px] font-semibold text-ink">{selected.kind === "Answer" ? "Answer" : "Details"}</label>
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  data-behavior="edits body"
                  className="min-h-[130px] w-full resize-y rounded-lg border border-[#D8DCDE] bg-white p-3 text-[13.5px] leading-[1.6] outline-none"
                />
              </div>
              <div className="flex justify-end gap-2.5 border-t border-border-3 bg-[#FAFBFC] p-[13px_20px]">
                <GrayButton onClick={() => setEditing(false)} data-behavior="discard changes">
                  Cancel
                </GrayButton>
                <PeachButton onClick={saveEdit} data-behavior="save -> Supabase update">
                  Save changes
                </PeachButton>
              </div>
            </>
          )}
        </div>
      )}

      {!selected && query.trim() && matches.length > 0 && (
        <>
          <div className="mb-2.5 text-[12px] font-semibold text-muted">{matches.length} matches</div>
          <div className="flex flex-col gap-2.5">
            {matches.map((it) => (
              <div
                key={it.key}
                onClick={() => selectItem(it)}
                data-behavior="select content -> actions"
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-surface p-[13px_16px] hover:shadow-card-hover"
              >
                <KindChip kind={it.kind} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-semibold text-ink">{it.kind === "Answer" ? `Re: ${it.title}` : it.title}</div>
                  <div className="mt-0.5 text-[11px] text-muted-2">
                    {it.kind === "Answer" ? `Answer by ${it.authorName} · ${it.date}` : `by ${it.authorName} · ${it.date}`}
                  </div>
                </div>
                <StatusPill it={it} />
              </div>
            ))}
          </div>
        </>
      )}

      {!selected && query.trim() && matches.length === 0 && (
        <div className="rounded-xl border border-dashed border-border-strong bg-surface p-10 text-center text-[13px] text-muted">
          No content matches &ldquo;{query}&rdquo;. Try a different URL or keyword.
        </div>
      )}

      {!selected && !query.trim() && (
        <div className="rounded-xl border border-dashed border-[#D8DCDE] bg-surface p-11 text-center">
          <SearchIcon style={{ fontSize: 34, color: "#C4C9CC", margin: "0 auto 10px", display: "block" }} />
          <div className="mb-1 text-[14px] font-semibold text-ink">Search for content to manage</div>
          <div className="text-[12.5px] text-muted">Paste a question or answer URL, or start typing to find content.</div>
        </div>
      )}

      <div className="mt-8.5 border-t border-border-2 pt-5.5">
        <div className="mb-3.5 flex items-center gap-2">
          <h2 className="font-display m-0 text-[16px] font-bold">Reported content</h2>
          <span className="ml-auto text-[12px] text-muted">{openReports?.length ?? 0} open reports</span>
        </div>
        <div className="flex flex-col gap-3">
          {(openReports ?? []).map((r) => {
            const kind = r.question ? "Question" : "Answer";
            const content = r.question?.body ?? r.answer?.body ?? "";
            const authorName = r.question?.author?.display_name ?? r.answer?.author?.display_name ?? "?";
            const slug = r.question?.slug ?? r.answer?.question?.slug ?? null;
            const viewPath = slug ? `/questions/${slug}${r.answer ? `#answer-${r.answer.id}` : ""}` : null;
            const resolveArgs = { reportId: r.id, questionId: r.question_id, answerId: r.answer_id };
            return (
              <div key={r.id} className="rounded-xl border border-border bg-surface p-[16px_18px]">
                <div className="mb-2.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-neutral-bg px-2.5 py-0.5 text-[11px] font-semibold text-[#4A5154]">{kind}</span>
                  <span className="rounded-full bg-magenta-bg px-2.5 py-0.5 text-[11px] font-semibold text-magenta-dark">{r.reason}</span>
                  <span className="ml-auto text-[11px] text-muted-2">
                    Reported by {r.reporter?.display_name} · {timeAgo(r.created_at)}
                  </span>
                </div>
                <div className="mb-3 rounded-lg border border-border-3 bg-surface-alt p-[10px_12px] text-[13px] leading-[1.5] text-body">
                  &ldquo;{content}&rdquo;
                  <div className="mt-1.5 text-[11px] text-muted-2">by {authorName}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={!viewPath}
                    onClick={() => viewPath && openDetail(viewPath)}
                    data-behavior="view reported content (answer anchor when an answer)"
                    className="cursor-pointer rounded-md border border-[#D8DCDE] bg-white px-3.5 py-1.75 text-[12px] font-semibold text-ink hover:bg-[#F3F5F6] disabled:opacity-50"
                  >
                    View content
                  </button>
                  <button
                    type="button"
                    onClick={() => resolveReport.mutate({ ...resolveArgs, status: "kept" }, { onSuccess: () => showToast("Report kept") })}
                    data-behavior="keep content"
                    className="cursor-pointer rounded-md border border-success-border bg-success-bg px-3.5 py-1.75 text-[12px] font-semibold text-success-fg"
                  >
                    Keep
                  </button>
                  <button
                    type="button"
                    onClick={() => resolveReport.mutate({ ...resolveArgs, status: "removed" }, { onSuccess: () => showToast(kind === "Answer" ? "Answer removed" : "Question removed") })}
                    data-behavior="remove content (soft-delete)"
                    className="cursor-pointer rounded-md border border-magenta-dark bg-magenta-dark px-3.5 py-1.75 text-[12px] font-semibold text-white"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() => resolveReport.mutate({ ...resolveArgs, status: "dismissed" }, { onSuccess: () => showToast("Report dismissed") })}
                    data-behavior="dismiss report"
                    className="cursor-pointer rounded-md border border-border bg-white px-3.5 py-1.75 text-[12px] font-semibold text-[#4A5154]"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            );
          })}
          {(openReports?.length ?? 0) === 0 && (
            <div className="rounded-lg border border-dashed border-success-border bg-[#F4FBF5] p-10 text-center text-[13px] font-semibold text-success-fg">
              Queue clear — nothing to moderate.
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmModal
        open={!!deleteTarget}
        kind={deleteTarget?.kind.toLowerCase() ?? "item"}
        title={deleteTarget ? (deleteTarget.kind === "Answer" ? deleteTarget.body : deleteTarget.title) : ""}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            const kind = deleteTarget.kind;
            deleteItem.mutate(
              { kind, id: kind === "Answer" ? deleteTarget.answerId! : deleteTarget.questionId, questionId: deleteTarget.questionId },
              { onSuccess: () => { setSelectedKey(null); showToast(kind === "Answer" ? "Answer deleted" : "Question deleted"); } }
            );
          }
          setDeleteTarget(null);
        }}
      />

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-ink px-4 py-2.5 text-[13px] font-semibold text-white shadow-modal">
          {toast}
        </div>
      )}
    </div>
  );
}

function KindChip({ kind }: { kind: "Question" | "Answer" }) {
  const style = kind === "Question" ? { background: "#F1EDFB", color: "#4A3D6E" } : { background: "#EAF4FB", color: "#1E6A93" };
  return (
    <span className="flex-none rounded-md px-2.5 py-0.5 text-[11px] font-bold" style={style}>
      {kind}
    </span>
  );
}

function StatusPill({ it }: { it: AdminItem }) {
  const view = statusView(it);
  return (
    <span className="flex-none rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: view.bg, color: view.fg }}>
      {view.label}
    </span>
  );
}

function ToggleButton({ item, onClick }: { item: AdminItem; onClick: () => void }) {
  const isAnswer = item.kind === "Answer";
  const resolved = isAnswer ? item.statusKey === "accepted" : item.statusKey === "community" || item.statusKey === "verified";
  const label = isAnswer ? (resolved ? "Unaccept" : "Accept answer") : resolved ? "Reopen" : "Resolve";
  const behavior = isAnswer ? (resolved ? "unaccept answer" : "accept answer -> resolves question") : resolved ? "reopen question" : "resolve question";
  const activeClasses = !resolved ? "border-success-border bg-success-bg text-success-fg" : "border-[#D8DCDE] bg-white text-ink";
  return (
    <button
      type="button"
      onClick={onClick}
      data-behavior={behavior}
      className={`cursor-pointer rounded-md border px-3.5 py-2 text-[12.5px] font-semibold ${activeClasses}`}
    >
      {label}
    </button>
  );
}
