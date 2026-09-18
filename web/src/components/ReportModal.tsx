"use client";

import { useState } from "react";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { DangerButton, GrayButton } from "@/components/ui/PeachButton";
import { useSubmitReport } from "@/lib/mutations";
import { REPORT_REASONS } from "@/lib/status";
import type { ReportReason } from "@/lib/supabase/database.types";

export function ReportModal({
  open,
  kind,
  questionId,
  answerId,
  onClose,
}: {
  open: boolean;
  kind: "Question" | "Answer";
  questionId?: string;
  answerId?: string;
  onClose: () => void;
}) {
  const submitReport = useSubmitReport();
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [detail, setDetail] = useState("");
  const [done, setDone] = useState(false);

  if (!open) return null;

  function close() {
    onClose();
    setTimeout(() => {
      setDone(false);
      setReason(null);
      setDetail("");
    }, 200);
  }

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(16,24,40,.5)] p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] overflow-hidden rounded-xl bg-white shadow-modal"
      >
        <div className="flex items-center border-b border-border-3 p-[18px_20px]">
          <div className="font-display text-[16px] font-bold">Report this {kind.toLowerCase()}</div>
          <CloseIcon onClick={close} data-behavior="close modal" style={{ fontSize: 18, color: "#9CA3AF", marginLeft: "auto", cursor: "pointer" }} />
        </div>
        <div className="p-[18px_20px]">
          {done ? (
            <div className="py-5 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-success-bg">
                <CheckIcon style={{ fontSize: 24, color: "var(--color-success-fg)" }} />
              </div>
              <div className="mb-1 text-[15px] font-semibold">Report submitted</div>
              <p className="m-0 text-[13px] text-muted">
                Our moderators will review it shortly. Thanks for helping keep the community useful.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-3 text-[12px] text-muted">Why are you reporting this? Reports are anonymous to other members.</div>
              <div className="mb-3.5 flex flex-col gap-0.5">
                {REPORT_REASONS.map((r) => (
                  <label
                    key={r}
                    onClick={() => setReason(r)}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border p-[10px_12px] text-[13px] hover:bg-surface-alt"
                  >
                    <span className="flex h-[15px] w-[15px] flex-none items-center justify-center rounded-full border-[1.5px] border-[#C4C9CC]">
                      {reason === r && <span className="h-2 w-2 rounded-full bg-lilac" />}
                    </span>
                    {r}
                  </label>
                ))}
              </div>
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Add any detail (optional)"
                className="mb-3.5 min-h-[70px] w-full resize-y rounded-lg border border-border bg-surface-alt p-2.5 text-[13px] outline-none"
              />
              <div className="flex justify-end gap-2.5">
                <GrayButton onClick={close}>Cancel</GrayButton>
                <DangerButton
                  onClick={() => {
                    if (!reason) return;
                    submitReport.mutate(
                      { questionId, answerId, reason, detail },
                      { onSuccess: () => setDone(true) }
                    );
                  }}
                  data-behavior="POST report -> moderation queue"
                >
                  Submit Report
                </DangerButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
